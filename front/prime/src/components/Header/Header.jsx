import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import S from './style';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (sectionId) => {
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
    navigate('/recruiting/check');
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
                경영이념
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink onClick={() => handleMenuClick('company-history')}>
                회사연혁
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink onClick={() => handleMenuClick('core-value')}>
                핵심가치
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink onClick={() => handleMenuClick('contact')}>
                오시는길
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink onClick={handleRecruitingClick}>
                채용
              </S.NavLink>
            </S.NavItem>
          </S.NavList>
        </S.Nav>
      </S.HeaderContainer>
    </S.Header>
  );
};

export default Header;
