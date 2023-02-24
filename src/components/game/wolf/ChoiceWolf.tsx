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
            <Image src="https://bit.ly/3kjlHyp" alt="deco11" boxSize="40px" />
            <Text fontSize={24} color="red">
              人狼
            </Text>
            <Text fontSize={24}>は誰だ！！</Text>
            <Image src="https://bit.ly/3kjlHyp" alt="deco11" boxSize="40px" />
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
