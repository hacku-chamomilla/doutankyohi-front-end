import React, { Dispatch, SetStateAction } from "react";

import {
  Avatar,
  Card,
  CardBody,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

import { avatarList } from "@/data/data";

import { Vote } from "@/types/type";

type Props = {
  wolfList: Vote[];
  setValue: Dispatch<SetStateAction<string>>;
};

export const ChoiceWolfList = ({ wolfList, setValue }: Props) => {
  return (
    <>
      <RadioGroup>
        <Stack>
          {wolfList.map((list, i) => {
            return (
              <Radio
                value={list.playerid}
                key={i}
                onClick={() => {
                  setValue(list.playerid);
                }}
              >
                <Card>
                  <CardBody minW={80} boxShadow="2xl">
                    <HStack>
                      <Avatar size="xs" src={avatarList[list.particIcon]} />
                      <Text>{list.nickname}:</Text>
                      <Text>{list.text}</Text>
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
