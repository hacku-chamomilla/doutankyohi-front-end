import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

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
          <Text fontSize="xl">あなたはヒントホルダーです！</Text>
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
