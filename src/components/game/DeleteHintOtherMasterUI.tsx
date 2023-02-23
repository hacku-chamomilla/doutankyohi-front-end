import React from "react";

import { Avatar, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";

import { Hint } from "@/types/type";

type Props = {
  hintList: Hint[];
};

export const DeleteHintOtherMasterUI = ({ hintList }: Props) => {
  return (
    <>
      <Text fontSize={24}>被ったヒントを見つけましょう</Text>
      <VSpacer size={20} />
      <VStack spacing={4} align="stretch">
        {hintList.map((hint, i) => {
          return (
            <Card key={i}>
              <CardBody>
                <HStack>
                  <Avatar size="xs" src={avatarList[hint.avatarIndex]} />
                  <Text>{hint.hint}</Text>
                </HStack>
              </CardBody>
            </Card>
          );
        })}
      </VStack>
    </>
  );
};
