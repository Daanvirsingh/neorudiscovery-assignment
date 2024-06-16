import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    color: #333;
  }

  h2 {
    color: #333;
  }

  button {
    font-size: 1rem;
  }
`;

export default GlobalStyle;
