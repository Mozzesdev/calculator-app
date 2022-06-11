import { createGlobalStyle } from "styled-components";

export const lightTheme = {
 body: "#000",
 fontColor: "#545454",
 fontColorSmooth: "#bababa",
 bodyInverse: "#fff"
}

export const darkTheme = {
 body: "#757575",
 fontColor: "#eaeaea",
 fontColorSmooth: "#e3e3e3",
 bodyInverse: "#1d1d1d"
}

export const GlobalStyles = createGlobalStyle`
 body{
  background-color: ${props => props.theme.body}
 }
 h1,h2,h3,h4,h5,p,a,span{
  color: ${props => props.theme.fontColor};
 }
 .container-calculator__theme{
  background-color: ${props => props.theme.bodyInverse}
 }
 .preview-calc__theme{
  color: ${props => props.theme.fontColorSmooth}
 }
 .made_colors{
  color: ${props => props.theme.fontColorSmooth};
  font-size: 14px;
 }
` 