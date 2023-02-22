import React from "react";

import { Avatar, HStack, Text, UnorderedList } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";
type Props = {
  title: string;
  memberNameList: {
    name: string;
    avatarIndex: number;
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
            <>
              <HStack>
                <Avatar key={i} src={avatarList[memberName.avatarIndex]} />
                <Text fontSize={24}>{memberName.name}</Text>
              </HStack>
            </>
          );
        })}
      </UnorderedList>
    </>
  );
};
