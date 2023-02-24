import React from "react";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { PointList } from "./PointList";
import { VSpacer } from "../common/Spacer";

export const Score = () => {
  const examplePointList = [
    { nickname: "ふかむーる", particIcon: 0, point: 3 },
    { nickname: "ふかみん", particIcon: 1, point: 5 },
    { nickname: "ふかむー", particIcon: 2, point: 0 },
    { nickname: "ふかめも", particIcon: 3, point: 2 },
    { nickname: "KJ", particIcon: 4, point: 3 },
  ];
  return (
    <>
      <Center>
        <VStack>
          <VStack>
            <Text fontSize={24}>現在のポイント</Text>
            <PointList memberPointList={examplePointList} />
          </VStack>
          <VSpacer size={16} />
          <Button minW={60} minH={12} colorScheme="red" color="white">
            次へ
          </Button>
        </VStack>
      </Center>

      <VSpacer size={20} />
    </>
  );
};
