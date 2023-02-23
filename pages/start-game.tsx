import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Button, Center, VStack } from "@chakra-ui/react";

import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const StartGame: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <VSpacer size={4} />
      <PageBackIcon pass={"/"} />
      <VSpacer size={60} />

      <Center>
        <VStack>
          <Button
            rightIcon={<SunIcon />}
            colorScheme="orange"
            color={"white"}
            minW={64}
            minH={20}
            onClick={() => {
              router.push("/create-room");
            }}
          >
            ルームを作成
          </Button>
          <VSpacer size={8} />
          <Button
            leftIcon={<MoonIcon />}
            colorScheme="purple"
            color={"white"}
            minW={64}
            minH={20}
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
