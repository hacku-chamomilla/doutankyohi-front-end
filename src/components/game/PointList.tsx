import React from "react";

import { Avatar, Center, HStack, Text, UnorderedList } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";
type Props = {
  memberPointList: {
    nickname: string;
    particIcon: number;
    point: number;
  }[];
};

export const PointList = ({ memberPointList }: Props) => {
  return (
    <>
      <VSpacer size={8} />
      <Center>
        <UnorderedList>
          {memberPointList.map((memberName, i) => {
            return (
              <>
                <HStack>
                  <HStack key={i}>
                    <Avatar key={i} src={avatarList[memberName.particIcon]} />
                    <Text fontSize={24}>{memberName.nickname}</Text>
                  </HStack>

                  <Text fontSize={24} display="flex" justifyContent="flex-end">
                    ：{memberName.point}pt
                  </Text>
                </HStack>
              </>
            );
          })}
        </UnorderedList>
      </Center>
    </>
  );
};
