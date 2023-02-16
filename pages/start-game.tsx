import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@chakra-ui/react";

const StartGame: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => {
          router.push("/");
        }}
      >
        To Home
      </Button>
    </>
  );
};

export default StartGame;
