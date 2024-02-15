import Head from "next/head";
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react"
import { MantineProvider } from "@mantine/core";

import {theme} from '../../theme'

const App = ({ Component, pageProps: { session, ...pageProps }, }: any) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <Head>
          <title>Oxie</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
}

export default App;