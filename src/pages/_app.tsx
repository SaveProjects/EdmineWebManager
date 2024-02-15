import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { theme } from '../../theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
      <SessionProvider session={session}>
        <MantineProvider theme={theme}>
          <Head>
            <title>Panel d'administration d'Edmine Network</title>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/edmine.webp" />
          </Head>
          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
  );
}

export default MyApp;
