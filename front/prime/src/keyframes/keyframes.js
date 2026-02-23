import { keyframes } from "styled-components";

// styled.p`
//   animation: ${fadeIn} 3s forward;
// `

export const fadeIn = keyframes`
  0%{
    opacity: 0;
    transform: translate(0, -30px);
  }
  
  100%{
    opacity: 1;
    transform: translate(0, 0);
  }
`

export const arrow = keyframes`
  0%{
    opacity: 0;
  }
  
  100%{
    opacity: 1;
  }
`

// Home 컴포넌트 애니메이션
export const activate = keyframes`
  to {
    --active: 1;
  }
`

export const scaleDown = keyframes`
  to {
    scale: 0.8 0.8;
  }
`

export const draw = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`

export const fill = keyframes`
  to {
    fill: currentColor;
  }
`

export const revealDark = keyframes`
  from {
    clip-path: polygon(-30% 0, -30% 0, -15% 100%, -10% 115%);
  }
  to {
    clip-path: polygon(-30% 0, 130% 0, 115% 100%, -10% 115%);
  }
`

export const revealLight = keyframes`
  from {
    clip-path: polygon(130% 0, 130% 0, 115% 100%, 110% 115%);
  }
  to {
    clip-path: polygon(130% 0, -30% 0, -15% 100%, 110% 115%);
  }
`