import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";

import { RecoilRoom } from "@/store/Recoil";

import { Wolf } from "@/types/choice";

import { FetchStep } from "@/hooks/useFetchStep";

import { ChoiceWolfList } from "../ChoiceWolfList";

type Props = {
  wolfList: Wolf[];
};

export const ChoiceWolf = ({ wolfList }: Props) => {
  return (
    <>
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3ZbrlSt" alt="deco4" boxSize="40px" />
            <Text fontSize={24}>人狼は誰だ！！</Text>
            <Image src="https://bit.ly/3ZbrlSt" alt="deco4" boxSize="40px" />
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
