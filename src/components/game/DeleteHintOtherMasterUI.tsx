import React from "react";

import {
  Avatar,
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
type Props = {
  hintList: {
    text: string;
    avatarIndex: number;
    isSelect: boolean;
  }[];
};

export const DeleteHintOtherMasterUI = ({ hintList }: Props) => {
  return (
    <>
      <Center>
        <HStack>
          <Image src="https://bit.ly/3ZbrlSt" alt="deco4" boxSize="40px" />
          <Text fontSize={24}>被ったヒントをみつけよう</Text>
          <Image src="https://bit.ly/3ZbrlSt" alt="deco4" boxSize="40px" />
        </HStack>
      </Center>
      <VSpacer size={20} />
      <VStack spacing={4} align="stretch">
        {hintList.map((hint, i) => {
          return (
            <>
              <Card key={i}>
                <CardBody boxShadow={"lg"}>
                  <HStack>
                    <Avatar size="xs" src={avatarList[hint.avatarIndex]} />
                    <Text>{hint.text}</Text>
                  </HStack>
                </CardBody>
              </Card>
            </>
          );
        })}
      </VStack>
    </>
  );
};
