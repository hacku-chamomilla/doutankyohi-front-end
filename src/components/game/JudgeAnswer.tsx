import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { HSpacer, VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  theme: string;
  answer: string;
  setStep: Dispatch<SetStateAction<number>>;
};

export const JudgeAnswer = ({ theme, answer, setStep }: Props) => {
  const room = useRecoilValue(RecoilRoom);
  const router = useRouter();

  const handleJudge = (param: boolean) => {
    const url = BASE_URL + "is-correct";

    axios
      .post(url, {
        roomId: room.id,
        isCorrect: param,
      })
      .then((res) => {
        if (res.status === 200) {
          FetchStep(setStep, router, room.id);
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={4} />
          <Text fontSize="xl">回答者が入力した答えが正解か判定しよう！</Text>
          <VSpacer size={12} />
          {theme && <CustomTitleText title="お題" text={theme} />}
          <VSpacer size={4} />
          {answer && <CustomTitleText title="解答" text={answer} />}
          <VSpacer size={12} />
          <HStack>
            <Button
              colorScheme="blue"
              minW={24}
              onClick={() => {
                handleJudge(true);
              }}
            >
              正解
            </Button>
            <HSpacer size={4} />
            <Button
              colorScheme="blackAlpha"
              minW={24}
              onClick={() => {
                handleJudge(false);
              }}
            >
              不正解
            </Button>
          </HStack>
        </VStack>
      </Center>
    </>
  );
};
