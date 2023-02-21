import React from "react";

import { Center, Text, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "../common/CustomTitleText";
import { VSpacer } from "../common/Spacer";

type Props = {
  theme: string;
  answer: string;
};

export const DiscussJudgeAns = ({ theme, answer }: Props) => {
  return (
    <>
      <Center>
        <Text fontSize={24}>回答者の答えが正解か話し合おう!</Text>
      </Center>
      <VSpacer size={12} />
      <VStack>
        <CustomTitleText title={"お題"} text={theme} />
        <VSpacer size={8} />
        <CustomTitleText title={"回答"} text={answer} />
        <VSpacer size={12} />
      </VStack>
    </>
  );
};
