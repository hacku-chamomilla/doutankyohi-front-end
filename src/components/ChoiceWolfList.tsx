import React from "react";

import {
  Avatar,
  Card,
  CardBody,
  Center,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

import { avatarList } from "@/data/data";

import { Wolf } from "@/types/choice";

type Props = {
  wolfList: Wolf[];
};

export const ChoiceWolfList = ({ wolfList }: Props) => {
  return (
    <>
      <RadioGroup>
        <Stack>
          {wolfList.map((list, i) => {
            return (
              <Radio value={list.playerId} key={i}>
                <Card>
                  <CardBody minW={80} boxShadow="2xl">
                    <HStack>
                      <Avatar size="xs" src={avatarList[list.avatarIndex]} />
                      <Text>{list.playerName}:</Text>
                      <Text>{list.hint}</Text>
                    </HStack>
                  </CardBody>
                </Card>
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    </>
  );
};
