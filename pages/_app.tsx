import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";

import { ChakraProvider, Container } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Head>
          <title>同担拒否</title>
        </Head>
        <Container maxW="container.md">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
