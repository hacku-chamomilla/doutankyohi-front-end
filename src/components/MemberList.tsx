import React from "react";

import { ListItem, Text, UnorderedList } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

type Props = {
  title: string;
  memberNameList: Array<string>;
};

export const MemberList = ({ title, memberNameList }: Props) => {
  return (
    <>
      <Text fontSize="xl">{title}</Text>
      <VSpacer size={8} />
      <UnorderedList>
        {memberNameList.map((memberName, i) => {
          return (
            <ListItem key={i} fontSize="2x1">
              {memberName}
            </ListItem>
          );
        })}
      </UnorderedList>
    </>
  );
};
