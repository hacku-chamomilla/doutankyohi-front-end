import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { RecoilRoom } from "@/store/Recoil";

import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  text: string;
  setStep: Dispatch<SetStateAction<number>>;
};

export const Wait = ({ text, setStep }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);
  const handleUpdate = () => {
    FetchStep(setStep, router, room.id);
  };

  return (
    <Center>
      <VStack>
        <HStack>
          <Text>{text}</Text>
          <Button isLoading colorScheme="gray"></Button>
        </HStack>
        <VSpacer size={20} />
        <Button onClick={handleUpdate}>更新</Button>
      </VStack>
    </Center>
  );
};
