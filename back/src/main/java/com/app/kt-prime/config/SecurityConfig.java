package com.app.recychool.config;

import com.app.recychool.domain.dto.TokenDTO;
import com.app.recychool.filter.JwtAuthenticationFilter;
import com.app.recychool.handler.JwtAuthenticationEntryPoint;
import com.app.recychool.handler.OAuth2LoginSuccessHandler;
import com.app.recychool.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final AuthService authService;

    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/private/**").authenticated()
                        .anyRequest().permitAll()
                )
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2LoginSuccessHandler)
                        .failureHandler((request, response, exception) -> {
                            exception.printStackTrace();
                            System.err.println("OAuth2 로그인 실패: " + exception.getMessage());
                            response.sendRedirect(allowedOrigins + "/sign-in");
                        }))
                .logout(logout -> logout
                                .logoutUrl("/logout")
                                .logoutSuccessUrl(allowedOrigins + "/sign-in")
                                .logoutSuccessHandler((request, response, authentication) -> {
                                    HttpSession session = request.getSession(false);
                                    if(session != null) {
                                        session.invalidate();
                                    }

                                    Cookie[] cookies = request.getCookies();
                                    if(cookies != null){
                                        for(Cookie cookie : cookies){
                                            if(cookie.getName().equals("refreshToken")){
                                                TokenDTO tokenDTO = new TokenDTO();
                                                tokenDTO.setRefreshToken(cookie.getValue());
                                                authService.revokeRefreshToken(tokenDTO);
                                                authService.saveBlacklistedToken(tokenDTO);
                                            }
                                        }
                                    }

                                    ResponseCookie expiredCookie = ResponseCookie.from("refreshToken", "")
                                            .path("/")
                                            .httpOnly(true)
                                            .maxAge(0)
                                            .build();
                                    response.addHeader(HttpHeaders.SET_COOKIE, expiredCookie.toString());
                                    response.setContentType("application/json");
                                    response.getWriter().write("로그아웃 성공");
                                    response.sendRedirect(allowedOrigins);
                                })
                                .permitAll()
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(allowedOrigins);
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
