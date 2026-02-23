import styled, { createGlobalStyle } from "styled-components";
import { activate, draw, fill, revealDark, revealLight } from "keyframes/keyframes";

// 전역 스타일 (CSS 변수 및 기본 스타일)
export const GlobalStyles = createGlobalStyle`
  :root {
    --font-size: clamp(2rem, 8vmin + 1rem, 4rem);
    --line: rgba(0, 0, 0, 0.1);
    --base: 0.4;
    --accent: #000000;
    --header-height: 100vh;
    --overlay: color-mix(in lch, canvas 70%, transparent);
    color-scheme: light only;
  }

  @media (max-width: 768px) {
    :root {
      --font-size: clamp(1.5rem, 5vw + 0.5rem, 2.5rem);
    }
  }

  @media (max-width: 480px) {
    :root {
      --font-size: clamp(1.25rem, 4vw + 0.5rem, 2rem);
    }
  }

  body {
    background: #f5f5f5;
    color: #000000;
  }

  :root[data-theme='light'] {
    --base: 0.3;
    --line: rgba(0, 0, 0, 0.15);
    --overlay: color-mix(in lch, canvas 70%, transparent);
    color-scheme: light only;
  }

  html:not(:focus-within) {
    scroll-behavior: smooth;
  }

  body::before {
    --size: 60px;
    content: '';
    height: 100vh;
    width: 100vw;
    position: fixed;
    background: linear-gradient(
        90deg,
        var(--line) 1px,
        transparent 1px var(--size)
      )
      50% 50% / var(--size) var(--size),
      linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
        var(--size) var(--size);
    mask: linear-gradient(-15deg, transparent 40%, white);
    top: 0;
    transform-style: flat;
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: 768px) {
    body::before {
      --size: 40px;
    }
  }

  @media (max-width: 480px) {
    body::before {
      --size: 30px;
    }
  }

  @supports (animation-timeline: scroll()) {
    @property --active {
      inherits: true;
      initial-value: 0;
      syntax: '<number>';
    }
  }

  /* 동적으로 생성된 텍스트 스타일 */
  .content span,
  [data-split] > span {
    opacity: calc(var(--base) + (var(--active, 0)));
    transition: opacity 0.5s;
    display: inline-block;
    color: #000000;

    @supports (animation-timeline: scroll()) {
      animation: ${activate} both steps(1);
      animation-timeline: --reader;
      animation-range: contain calc(((var(--start, 0) * var(--ppc)) * 1px))
        contain calc(((var(--end, 0) * var(--ppc)) * 1px));
    }
  }

  [data-split] span span {
    opacity: inherit;
    color: inherit;
  }

  ::view-transition-group(root) {
    animation-duration: 1.25s;
  }
  ::view-transition-new(root),
  ::view-transition-old(root) {
    mix-blend-mode: normal;
  }

  ::view-transition-new(root) {
    animation: ${revealLight} 1.25s;
  }

  ::view-transition-old(root),
  .dark::view-transition-old(root) {
    animation: none;
  }
  .dark::view-transition-new(root) {
    animation: ${revealDark} 1.25s;
  }
`;

const S = {};

S.ReaderSection = styled.section`
  --thick: 0px;
  outline: var(--thick) dashed var(--accent);
  outline-offset: calc(var(--thick) * -1);
  height: calc(
    ((var(--ppc) * var(--content-length) + (var(--pad) * var(--buffer))) * 1px) + 100vh
  );

  @supports (animation-timeline: scroll()) {
    view-timeline: --reader block;
  }
`;

S.Content = styled.div`
  position: sticky;
  top: 0;
  min-height: 100vh;
  gap: 24px;
  width: 100ch;
  padding: 2rem 0;
  max-width: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  line-height: 1;

  p {
    font-size: var(--font-size);
    font-weight: 600;
    color: #ffffff;
    line-height: 1.2;
    text-align: center;
    margin: 0;
  }
`;

S.SrOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

S.SplitText = styled.div`
  font-size: var(--font-size);
  font-weight: 600;
  color: #000000;
  line-height: 1.2;
  text-align: center;
  width: 100%;

  /* 동적으로 생성된 span 요소들에 스타일 적용 */
  > span {
    --active: 0;
    opacity: calc(var(--base, 0.4) + var(--active, 0));
    transition: opacity 0.5s;
    display: inline-block;
    color: #000000;

    @supports (animation-timeline: scroll()) {
      animation: ${activate} both steps(1);
      animation-timeline: --reader;
      animation-range: contain calc(((var(--start, 0) * var(--ppc)) * 1px))
        contain calc(((var(--end, 0) * var(--ppc)) * 1px));
    }
  }

  /* 내부 span에도 스타일 적용 */
  span span {
    opacity: inherit;
    color: inherit;
    white-space: pre; /* 공백 유지 */
  }
`;

S.WordSpan = styled.span`
  opacity: calc(var(--base) + (var(--active, 0)));
  transition: opacity 0.5s;

  @supports (animation-timeline: scroll()) {
    animation: ${activate} both steps(1);
    animation-timeline: --reader;
    animation-range: contain calc(((var(--start, 0) * var(--ppc)) * 1px))
      contain calc(((var(--end, 0) * var(--ppc)) * 1px));
  }
`;

S.Section = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
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

S.ContentSection = styled.section`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 4rem 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.75rem;
  }
`;

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
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(50px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #1187CF;
    box-shadow: 0 8px 30px rgba(17, 135, 207, 0.15);
    transform: translateY(-5px);
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
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.25rem, 3vw + 0.5rem, 2.5rem);
    padding: 0 0.25rem;
  }
`;

S.SignatureSvg = styled.svg`
  width: max(100px, 25vmin);
  color: canvasText;
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  z-index: 10;
  translate: -20% -20%;
  rotate: -15deg;
  pointer-events: none;
`;

S.SignaturePath = styled.path`
  --draw: 1.025;
  --end: 1.025;
  stroke-dasharray: var(--end);
  stroke-dashoffset: var(--draw);

  @supports (animation-timeline: scroll()) {
    animation: ${draw} both linear;
    animation-timeline: --sign-off;
    animation-range: entry 20% entry 80%;
  }
`;

S.EarPath = styled.path`
  --draw: 1.025;
  --end: 1.025;
  stroke-dasharray: var(--end);
  stroke-dashoffset: var(--draw);

  @supports (animation-timeline: scroll()) {
    animation: ${draw} both linear;
    animation-timeline: --sign-off;
    animation-range: entry 30% entry 90%;
  }
`;

S.EyePath = styled.path`
  --draw: 1.025;
  --end: 1.025;
  stroke-dasharray: var(--end);
  stroke-dashoffset: var(--draw);
  fill: transparent;

  @supports (animation-timeline: scroll()) {
    animation: ${draw} both linear, ${fill} both linear;
    animation-timeline: --sign-off;
    animation-range: entry 30% entry 90%;
  }
`;

S.NosePath = styled.path`
  --draw: 1.025;
  --end: 1.025;
  stroke-dasharray: var(--end);
  stroke-dashoffset: var(--draw);
  fill: transparent;

  @supports (animation-timeline: scroll()) {
    animation: ${draw} both linear, ${fill} both linear;
    animation-timeline: --sign-off;
    animation-range: entry 40% entry 100%;
  }
`;

S.Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  opacity: 0.875;
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
    font-size: 0.85rem;
  }
`;

export default S;
