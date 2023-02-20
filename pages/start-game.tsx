import { ArrowBackIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Button, Center, IconButton, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

const StartGame: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <VSpacer size={4} />
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

      <Center>
        <VStack>
          <Button
            colorScheme="blue"
            color={"white"}
            minW={64}
            onClick={() => {
              router.push("/create-room");
            }}
          >
            ルーム作成
          </Button>
          <VSpacer size={12} />
          <Button
            colorScheme="blue"
            color={"white"}
            minW={64}
            onClick={() => {
              router.push("/join-room");
            }}
          >
            ルームに参加
          </Button>{" "}
        </VStack>
      </Center>
    </>
  );
};

export default StartGame;
