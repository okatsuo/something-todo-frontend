import type { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyle from '../../styles/global'
import theme from '../../styles/theme'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../graphql/client'
import { StylesProvider } from '@material-ui/styles'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.svg" />
        <title>something-todo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <ApolloProvider client={apolloClient}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
              <GlobalStyle />
            </ThemeProvider>
          </StylesProvider>
      </ApolloProvider>
    </>
  )
}
export default MyApp
