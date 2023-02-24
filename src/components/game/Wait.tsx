import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { IS_AUTO_REQUEST } from "@/data/data";

import { RecoilRoom } from "@/store/Recoil";

import { FetchStep } from "@/hooks/useFetchStep";
import { AutoHttpRequest } from "@/hooks/useHttpRequest";

type Props = {
  text: string;
  setStep: Dispatch<SetStateAction<number>>;
};

export const Wait = ({ text, setStep }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);

  useEffect(() => {
    if (IS_AUTO_REQUEST) {
      AutoHttpRequest(
        () => {
          FetchStep(setStep, router, room.id);
        },
        0,
        Date.now()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center>
      <VStack>
        <HStack>
          <Text>{text}</Text>
          <Button isLoading colorScheme="gray"></Button>
        </HStack>
        <VSpacer size={20} />
        {!IS_AUTO_REQUEST && (
          <Button
            onClick={() => {
              FetchStep(setStep, router, room.id);
            }}
          >
            更新
          </Button>
        )}
      </VStack>
    </Center>
  );
};
