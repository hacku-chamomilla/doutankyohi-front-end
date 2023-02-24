import React from "react";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

type Props = {
  player: string;
  vote: number;
};

export const BanishPerson = ({ player, vote }: Props) => {
  return (
    <>
      <VSpacer size={4} />
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3m4STtV" alt="deco12" boxSize="50px" />
            <Text fontSize={40}>追放者:{player}</Text>
          </HStack>
          <VSpacer size={12} />
          <Text fontSize={24}>投票数:{vote}</Text>
          <VSpacer size={40} />
          <Button colorScheme="red" minW={48} minH={12}>
            次へ進む
          </Button>
        </VStack>
      </Center>
    </>
  );
};
