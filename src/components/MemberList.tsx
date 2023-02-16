import React from "react";

import { ListItem, Text, UnorderedList } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

type Props = {
  title: string;
  memberName: Array<string>;
};

export const MemberList = ({ title, memberName }: Props) => {
  const nameList = memberName.map((member) => <li key={member}>{member}</li>);

  return (
    <>
      <Text fontSize="xl">{title}</Text>
      <VSpacer size={8} />
      <UnorderedList>
        <ListItem fontSize="2xl">{nameList}</ListItem>
      </UnorderedList>
    </>
  );
};
