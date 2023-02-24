import React from "react";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

type Props = {
  name: string;
  wolf: string;
  banish: boolean;
  peace: boolean;
};

export const VoteResult = ({ name, wolf, banish, peace }: Props) => {
  return (
    <>
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3ECjZz4" alt="deco13" boxSize="50px" />
            <Text fontSize={36}>投票結果</Text>
            <Image src="https://bit.ly/3ECjZz4" alt="deco13" boxSize="50px" />
          </HStack>

          <VSpacer size={8} />
          {banish ? (
            <>
              <Text fontSize={20}>{name}が追放された</Text>
              <VSpacer size={20} />
              {peace ? (
                <>
                  <Text fontSize={20}>人狼は存在しなかった！</Text>
                </>
              ) : (
                <>
                  <Text fontSize={20}>人狼は{wolf}だった！</Text>
                </>
              )}
            </>
          ) : (
            <>
              <Text fontSize={20}>誰も追放されなかった</Text>
              <VSpacer size={20} />
              {peace ? (
                <>
                  <Text fontSize={20}>人狼は存在しなかった！</Text>
                </>
              ) : (
                <>
                  <Text fontSize={20}>人狼は{wolf}だった！</Text>
                </>
              )}
            </>
          )}
          <VSpacer size={12} />
          <Button colorScheme="pink" size="lg" minW={48}>
            次へ
          </Button>
        </VStack>
      </Center>
    </>
  );
};
