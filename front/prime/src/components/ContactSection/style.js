import styled from "styled-components";

const S = {};

S.ContactSection = styled.section`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 8rem 1rem;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 4rem 0.75rem;
  }
`;

S.ContactTitle = styled.h2`
  font-family: 'pretendard', sans-serif;
  font-size: clamp(0.875rem, 1vw + 0.25rem, 1rem);
  font-weight: 500;
  text-align: center;
  margin-bottom: 3rem;
  color: #1187CF;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 0.8vw + 0.25rem, 0.875rem);
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.6875rem, 0.6vw + 0.25rem, 0.75rem);
    margin-bottom: 1.5rem;
  }
`;

S.ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

S.ContactCard = styled.div`
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  opacity: 0;

  &:hover {
    border-color: #1187CF;
    box-shadow: 0 8px 30px rgba(17, 135, 207, 0.15);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.75rem 1.25rem;
    border-radius: 12px;
  }
`;

S.ContactCardName = styled.h3`
  font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
  font-weight: 700;
  color: #1187CF;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  line-height: 1.4;
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem);
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1rem, 1.2vw + 0.5rem, 1.25rem);
    margin-bottom: 1rem;
  }
`;

S.ContactCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

S.ContactCardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 3.5rem;
  justify-content: flex-start;

  @media (max-width: 768px) {
    min-height: 3rem;
  }
`;

S.ContactCardLabel = styled.span`
  font-size: clamp(0.8125rem, 0.8vw + 0.25rem, 0.9375rem);
  font-weight: 600;
  color: #666666;
  letter-spacing: -0.01em;
  height: 1.5rem;
  display: flex;
  align-items: center;
`;

S.ContactCardValue = styled.div`
  font-size: clamp(0.9375rem, 1vw + 0.25rem, 1.0625rem);
  line-height: 1.6;
  color: #000000;
  letter-spacing: -0.01em;
  word-break: keep-all;
  flex: 1;
`;

S.ContactPhone = styled.a`
  color: #000000;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

S.MapContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    height: 180px;
  }

  @media (max-width: 768px) {
    height: 200px;
    margin-top: 1.25rem;
  }

  @media (max-width: 480px) {
    height: 180px;
    margin-top: 1rem;
    border-radius: 8px;
  }
`;

S.RecruitingSection = styled.div`
  margin-top: 5rem;
  text-align: center;
  padding-top: 3rem;

  @media (max-width: 768px) {
    margin-top: 3rem;
    padding-top: 2rem;
  }
`;

S.RecruitingTitle = styled.h2`
  font-family: 'pretendard', sans-serif;
  font-size: clamp(0.875rem, 1vw + 0.25rem, 1rem);
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
  color: #1187CF;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 0.8vw + 0.25rem, 0.875rem);
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.6875rem, 0.6vw + 0.25rem, 0.75rem);
    margin-bottom: 0.5rem;
  }
`;

S.RecruitingSubtitle = styled.h3`
  font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
  font-weight: 700;
  color: #1187CF;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
  line-height: 1.4;
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem);
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1rem, 1.2vw + 0.5rem, 1.25rem);
    margin-bottom: 1rem;
  }
`;

S.RecruitingButton = styled.button`
  width: 200px;
  height: 50px;
  padding: 0;
  border: 2px solid #000;
  font-family: 'pretendard', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  color: #000;
  z-index: 2;
  line-height: 50px;

  &:hover {
    border: none;
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    width: 0%;
    height: 0%;
    border: 2px solid;
    z-index: -1;
    transition: all 0.3s ease;
  }

  &:before {
    top: 0;
    left: 0;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: #000;
    border-left-color: #000;
  }

  &:after {
    bottom: 0;
    right: 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: #000;
    border-right-color: #000;
  }

  &:hover:before,
  &:hover:after {
    border-color: #000;
    height: 100%;
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 45px;
    font-size: 1rem;
    line-height: 45px;
  }
`;

export default S;
