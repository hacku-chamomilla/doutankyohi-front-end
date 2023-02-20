import { ArrowBackIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Button, IconButton } from "@chakra-ui/react";

import { HSpacer, VSpacer } from "@/components/common/Spacer";

const StartGame: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <HSpacer size={2} />
      <IconButton
        colorScheme="gray"
        icon={<ArrowBackIcon />}
        isRound={true}
        aria-label={"homeBack"}
        onClick={() => {
          router.push("/");
        }}
      />
      <VSpacer size={40} />
      <HSpacer size={12} />
      <Button
        w="30%"
        colorScheme="blue"
        color={"white"}
        onClick={() => {
          router.push("/create-room");
        }}
      >
        ルーム作成
      </Button>

      <VSpacer size={12} />
      <HSpacer size={12} />
      <Button
        w="30%"
        colorScheme="blue"
        color={"white"}
        onClick={() => {
          router.push("/join-room");
        }}
      >
        ルームに参加
      </Button>
    </>
  );
};

export default StartGame;
