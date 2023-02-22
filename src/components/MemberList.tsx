import React from "react";

import { Avatar, HStack, Text, UnorderedList } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";
type Props = {
  title: string;
  memberNameList: {
    nickname: string;
    particIcon: number;
  }[];
};

export const MemberList = ({ title, memberNameList }: Props) => {
  return (
    <>
      <Text fontSize="xl">{title}</Text>
      <VSpacer size={8} />
      <UnorderedList>
        {memberNameList.map((memberName, i) => {
          return (
            <HStack key={i}>
              <Avatar key={i} src={avatarList[memberName.particIcon]} />
              <Text fontSize={24}>{memberName.nickname}</Text>
            </HStack>
          );
        })}
      </UnorderedList>
    </>
  );
};
