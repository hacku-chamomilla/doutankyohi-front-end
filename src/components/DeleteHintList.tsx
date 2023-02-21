import React from "react";

import {
  Avatar,
  Card,
  CardBody,
  Checkbox,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { avatarList } from "@/data/AvatarList";

type Props = {
  hintList: {
    text: string;
    avatarIndex: number;
    isSelect: boolean;
  }[];
};

export const DeleteHintList = ({ hintList }: Props) => {
  return (
    <>
      <VStack spacing={4} align="stretch">
        {hintList.map((hint, i) => {
          return (
            <div key={i}>
              <Checkbox
                size="lg"
                colorScheme="orange"
                onChange={() => {
                  hint.isSelect = !hint.isSelect;
                }}
              >
                <Card>
                  <CardBody>
                    <HStack>
                      <Avatar size="xs" src={avatarList[hint.avatarIndex]} />
                      <Text>{hint.text}</Text>
                    </HStack>
                  </CardBody>
                </Card>
              </Checkbox>
            </div>
          );
        })}
      </VStack>
    </>
  );
};
