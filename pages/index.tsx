import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => {
          router.push("/start-game");
        }}
      >
        To Start Game Page
      </Button>
    </>
  );
};

export default Home;
