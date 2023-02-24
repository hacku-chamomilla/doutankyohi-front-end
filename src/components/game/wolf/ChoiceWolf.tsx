/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useState } from "react";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/data";

import { Vote } from "@/types/type";

import { ChoiceWolfList } from "../../ChoiceWolfList";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  wolfList: Vote[];
};

export const ChoiceWolf = ({ setStep, wolfList }: Props) => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState<string>("");

  return (
    <>
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3kjlHyp" alt="deco11" boxSize="40px" />
            <Text fontSize={24}>人狼は誰だ！！</Text>
            <Image src="https://bit.ly/3kjlHyp" alt="deco11" boxSize="40px" />
          </HStack>
          <Text fontSize={12}>
            ※最初の人は回答者ですが、人狼の可能性もあります※
          </Text>
          <VSpacer size={4} />
          <ChoiceWolfList wolfList={wolfList} setValue={setValue} />
          <VSpacer size={12} />
          <Button colorScheme="red" minW={48} minH={12}>
            決定
          </Button>
        </VStack>
      </Center>
    </>
  );
};
