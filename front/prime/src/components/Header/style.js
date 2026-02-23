import styled from "styled-components";

const S = {};

S.Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.3s ease;
`;

S.HeaderContainer = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
  }
`;

S.LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

S.Logo = styled.img`
  height: 40px;
  width: auto;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    height: 35px;
  }

  @media (max-width: 480px) {
    height: 30px;
  }
`;

S.Nav = styled.nav`
  display: flex;
  align-items: center;
`;

S.NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

S.NavItem = styled.li`
  margin: 0;
`;

S.NavLink = styled.button`
  background: none;
  border: none;
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #333333;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #1187CF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #1187CF;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
  }
`;

export default S;
