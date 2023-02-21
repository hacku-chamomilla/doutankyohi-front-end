import React from "react";

import { Avatar, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";

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
      <Text fontSize={24}>被ったヒントを見つけましょう</Text>
      <VSpacer size={20} />
      <VStack spacing={4} align="stretch">
        {hintList.map((hint) => {
          return (
            <>
              <Card>
                <CardBody>
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
