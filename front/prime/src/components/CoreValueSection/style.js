import styled from "styled-components";

const S = {};

S.CoreValueSection = styled.section`
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

S.CoreValueTitle = styled.h2`
  font-family: 'pretendard', sans-serif;
  font-size: clamp(0.875rem, 1vw + 0.25rem, 1rem);
  font-weight: 500;
  text-align: center;
  margin-bottom: 2rem;
  color: #1187CF;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 0.8vw + 0.25rem, 0.875rem);
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.6875rem, 0.6vw + 0.25rem, 0.75rem);
    margin-bottom: 1rem;
  }
`;

S.CoreValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

S.CoreValueCard = styled.div`
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 3rem 2.5rem;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  opacity: 0;

  &:hover {
    border-color: #1187CF;
    box-shadow: 0 8px 30px rgba(17, 135, 207, 0.15);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
`;

S.CoreValueCardTitle = styled.h3`
  font-size: clamp(1.5rem, 2.5vw + 0.5rem, 2rem);
  font-weight: 700;
  color: #1187CF;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem);
    margin-bottom: 1rem;
  }
`;

S.CoreValueCardDescription = styled.p`
  font-size: clamp(1rem, 1.2vw + 0.3rem, 1.125rem);
  line-height: 1.8;
  color: #333333;
  letter-spacing: -0.01em;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: clamp(0.9375rem, 1vw + 0.3rem, 1rem);
    line-height: 1.7;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.875rem, 0.8vw + 0.3rem, 0.9375rem);
    line-height: 1.6;
  }
`;

export default S;
