import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import S from './style';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (sectionId) => {
    // 현재 페이지가 Home이 아니면 Home으로 이동 후 스크롤
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleRecruitingClick = () => {
    navigate('/recruiting');
  };

  return (
    <S.Header>
      <S.HeaderContainer>
        <S.LogoContainer>
          <S.Logo 
            src="/assets/images/logo.svg" 
            alt="KT Prime Logo"
            onClick={() => handleMenuClick('read')}
          />
        </S.LogoContainer>
        <S.Nav>
          <S.NavList>
            <S.NavItem>
              <S.NavLink onClick={() => handleMenuClick('read')}>
                Management
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink onClick={() => handleMenuClick('company-history')}>
                History
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink onClick={() => handleMenuClick('core-value')}>
                Value
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink onClick={() => handleMenuClick('contact')}>
                Contact
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink onClick={handleRecruitingClick}>
                Recruiting
              </S.NavLink>
            </S.NavItem>
          </S.NavList>
        </S.Nav>
      </S.HeaderContainer>
    </S.Header>
  );
};

export default Header;
