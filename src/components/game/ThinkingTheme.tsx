import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { RecoilRoom } from "@/store/Recoil";

import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const ThinkingTheme = ({ setStep }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);
  const handleUpdate = () => {
    FetchStep(setStep, router, room.id);
  };

  return (
    <>
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3xLp0kK" alt="deco6" boxSize="50px" />
            <Text fontSize="xl">あなたはヒントホルダーです！</Text>
            <Image src="https://bit.ly/3XQ6KBu" alt="deco7" boxSize="50px" />
          </HStack>
          <VSpacer size={12} />
          <Text fontSize={20} fontStyle={"oblique"}>
            お題の決め方を相談してください！
          </Text>
          <VSpacer size={12} />
          <Button onClick={handleUpdate}>更新</Button>
        </VStack>
      </Center>
    </>
  );
};
