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

import { Hint } from "@/types/type";

type Props = {
  hintList: Hint[];
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
                  hint.isDelete = !hint.isDelete;
                }}
              >
                <Card>
                  <CardBody>
                    <HStack>
                      <Avatar size="xs" src={avatarList[hint.avatarIndex]} />
                      <Text>{hint.hint}</Text>
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
