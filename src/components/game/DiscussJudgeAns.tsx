import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { RecoilRoom } from "@/store/Recoil";

import { FetchStep } from "@/hooks/useFetchStep";

import { CustomTitleText } from "../common/CustomTitleText";
import { VSpacer } from "../common/Spacer";

type Props = {
  theme: string;
  answer: string;
  setStep: Dispatch<SetStateAction<number>>;
};

export const DiscussJudgeAns = ({ theme, answer, setStep }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);

  const handleUpdate = () => {
    FetchStep(setStep, router, room.id);
  };

  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={12} />
          <Button onClick={handleUpdate}>更新</Button>
          <VSpacer size={12} />
          <HStack>
            <Image src="https://bit.ly/3xOfFsI" alt="deco8" boxSize="50px" />
            <Text fontSize={24}>ゲッサーの答えが正解か話し合おう!</Text>
            <Image src="https://bit.ly/3xOfFsI" alt="deco8" boxSize="50px" />
          </HStack>
          <VSpacer size={12} />
          <CustomTitleText title={"お題"} text={theme} />
          <VSpacer size={8} />
          <CustomTitleText title={"回答"} text={answer} />
          <VSpacer size={12} />
        </VStack>
      </Center>
    </>
  );
};
