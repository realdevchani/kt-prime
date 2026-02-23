// 전역에 사용되는 스타일을 적용시키기위한 파일
// 폰트, 리셋
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  /* css 스타일 리셋 */
  ${reset}

  /*
    100 Thin
    200 Extra Light
    300 Light
    400 Regular
    500 Medium
    600 Semi Bold
    700 Bold
    800 Extra Bold
    900 Black 
  */

  body {
    font-family: 'pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    box-sizing: border-box;
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  }

  * {
    font-family: 'pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  button {
    font-family: 'pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    cursor: pointer;
    border: none;
  }

`;
export default GlobalStyle;
