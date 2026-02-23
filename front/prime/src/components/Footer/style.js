import styled from "styled-components";

const S = {};

S.Footer = styled.footer`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
  color: #666666;
  font-size: 0.875rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    font-size: 0.8125rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
    font-size: 0.75rem;
  }
`;

export default S;
