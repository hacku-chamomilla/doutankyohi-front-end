import React from "react";

import { Center, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

export const ThinkingTheme = () => {
  return (
    <>
      <Center>
        <VStack>
          <Text fontSize={40} fontStyle={"oblique"} color={"red"}>
            あなたはヒントを与える人です!
          </Text>
          <VSpacer size={12} />
          <Text fontSize={20} fontStyle={"oblique"}>
            出題するお題を話し合ってください
          </Text>
        </VStack>
      </Center>
    </>
  );
};
