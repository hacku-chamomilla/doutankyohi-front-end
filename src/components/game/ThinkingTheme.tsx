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
  setStep: Dispatch<SetStateAction<number>>;
};

export const ThinkingTheme = ({ setStep }: Props) => {
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
    <>
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3xLp0kK" alt="deco6" boxSize="30px" />
            <Text fontSize={14}>あなたは</Text>
            <Text fontSize={14} color="purple">
              ヒントホルダー
            </Text>
            <Text fontSize={14}>です</Text>
            <Image src="https://bit.ly/3XQ6KBu" alt="deco7" boxSize="30px" />
          </HStack>
          <VSpacer size={12} />
          <Text fontSize={20} fontStyle={"oblique"}>
            お題の決め方を相談してください！
          </Text>
          <VSpacer size={12} />
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
    </>
  );
};
