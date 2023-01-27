import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, input, legend, li, ol, p, select, table, td, textarea, th, ul {margin:0;padding:0}
  body, button, input, select, table, textarea {font-size:12px;line-height:16px;color:#202020;font-family:-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", helvetica, "Apple SD Gothic Neo", sans-serif}
  h1, h2, h3, h4, h5, h6 {font-size:inherit;line-height:inherit}
  textarea {-webkit-backface-visibility:hidden;backface-visibility:hidden;background-color:transparent;border:0;word-break:keep-all;word-wrap:break-word}
  button, input {-webkit-border-radius:0;border-radius:0;border:0}
  button {background-color:transparent}
  fieldset, img {border:0}
  img {vertical-align:top}
  ol, ul {list-style:none}
  address, em {font-style:normal}
  a {color:inherit;text-decoration:none}
  a:hover {text-decoration:none}
  iframe {overflow:hidden;margin:0;border:0;padding:0;vertical-align:top}
  mark {background-color:transparent}
  i {font-style:normal}
  div{box-sizing: border-box}
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }
`;

export default GlobalStyles;
