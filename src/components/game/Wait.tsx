import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

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
        <VStack>
          <Image src="https://bit.ly/3kmqtLm" alt="deco9"></Image>
          <HStack>
            <Text fontSize={24}>{text}</Text>
            <Button isLoading colorScheme="gray"></Button>
          </HStack>
        </VStack>
        <VSpacer size={4} />
        <Text fontSize={16}></Text>
        {!IS_AUTO_REQUEST && (
          <Button
            onClick={() => {
              FetchStep(setStep, router, room.id);
            }}
          >
            更新
          </Button>
        )}
        <VSpacer size={12} />
        <VStack>
          <Image src="https://bit.ly/41pLNAc" alt="gif"></Image>
        </VStack>

        <VSpacer size={12} />
      </VStack>
    </Center>
  );
};
