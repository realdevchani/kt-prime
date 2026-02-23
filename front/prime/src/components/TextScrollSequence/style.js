import styled from "styled-components";

const S = {};

S.SequenceSection = styled.section`
  position: relative;
  width: 100%;
`;

S.SequenceContent = styled.div`
  position: sticky;
  top: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 1160px;
  padding: 8rem 1rem;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 6rem 1rem;
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 4rem 0.75rem;
    gap: 12px;
  }
`;

S.EnglishTitle = styled.h2`
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

S.SequenceText = styled.div`
  font-family: 'pretendard', sans-serif;
  font-size: clamp(1.5rem, 3vw + 0.5rem, 2.5rem);
  font-weight: 400;
  color: #333333;
  line-height: 1.6;
  text-align: center;
  width: 100%;
  opacity: 1;
  transition: opacity 0.3s ease;
  box-sizing: border-box;
  word-break: keep-all;
  overflow-wrap: break-word;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: clamp(1.25rem, 2.5vw + 0.5rem, 2rem);
    line-height: 1.5;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.125rem, 2vw + 0.5rem, 1.75rem);
    line-height: 1.4;
    padding: 0 0.25rem;
  }
`;

export default S;
