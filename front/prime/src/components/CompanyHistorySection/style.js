import styled from "styled-components";

const S = {};

S.Section = styled.section`
  /* min-height: 100vh; */
  display: flex;
  /* place-items: center; */
  padding: 2rem 1rem;
  box-sizing: border-box;
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
  }
`;

S.H2 = styled.h2`
  font-size: clamp(2rem, 3vw + 1rem, 6rem);
  text-align: center;
  padding: 0 1rem;
  box-sizing: border-box;

  span {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4vw + 0.5rem, 3rem);
  }

  @media (max-width: 480px) {
    font-size: clamp(1.25rem, 3vw + 0.5rem, 2.5rem);
  }
`;

export default S;
