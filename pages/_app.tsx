import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";

import { ChakraProvider, Container } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Container maxW="container.md">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
