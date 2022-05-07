import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
export const lightTheme = {
  accent: "#0095f6",
  bgColor: "#f4f9f9",
  fontColor: "rgb(38,38,38)",
  borderColor: "rgb(219, 219, 219)",
  inputBgColor: "#fafafa",
};

export const darkTheme = {
  accent: "#67809f",
  fontColor: "#f2f1ef",
  bgColor: "#2c2c2c",
  borderColor: "#e8e8e8",
  inputBgColor: "#ecf0f1",
};

export const GlobalStyles = createGlobalStyle`
  ${reset};
  input{
    all:unset;
  }
  *{
    box-sizing: border-box;
  }
  
  body{
    background-color: ${(props) => props.theme.bgColor};
    font-size: 14px;   
    font-family: 'Open Sans', sans-serif;
    color: ${(props) => props.theme.fontColor};
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;
