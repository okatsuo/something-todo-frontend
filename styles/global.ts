import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html,
  body {
    color: #FFFFFF;
    background: linear-gradient(to right bottom, #37383c, #323337, #2e2f33, #292a2e, #25262a);
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`
