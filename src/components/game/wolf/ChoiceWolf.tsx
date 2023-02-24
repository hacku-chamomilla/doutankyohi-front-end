import React from "react";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { Wolf } from "@/types/choice";

import { ChoiceWolfList } from "../../ChoiceWolfList";

type Props = {
  wolfList: Wolf[];
};

export const ChoiceWolf = ({ wolfList }: Props) => {
  return (
    <>
      <Center>
        <VStack>
          <HStack>
            <Text fontSize={24}>人狼は誰だ！！</Text>
          </HStack>
          <VSpacer size={12} />
          <ChoiceWolfList wolfList={wolfList} />
          <VSpacer size={12} />
          <Button colorScheme="red" minW={48} minH={12}>
            決定
          </Button>
        </VStack>
      </Center>
    </>
  );
};
