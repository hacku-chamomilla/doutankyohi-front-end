import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { BASE_URL, IS_AUTO_REQUEST } from "@/data/data";

import { RecoilOwner, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";
import { AutoHttpRequest } from "@/hooks/useHttpRequest";

import { CustomTitleText } from "../common/CustomTitleText";
import { VSpacer } from "../common/Spacer";

type Props = {
  theme: string;
  answer: string;
  isCorrect: boolean;
  setStep: Dispatch<SetStateAction<number>>;
};

export const Result = ({ theme, answer, isCorrect, setStep }: Props) => {
  const router = useRouter();
  const owner = useRecoilValue(RecoilOwner);
  const room = useRecoilValue(RecoilRoom);
  const Initialize = () => {
    axios
      .post(BASE_URL + "initialize", {
        roomId: room.id,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push("/wait");
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  // NOTE: 遷移を含むため共通化できない
  const handleNext = () => {
    axios
      .get(BASE_URL + "step", {
        params: { roomId: room.id },
      })
      .then((res) => {
        if (res.data != 7) {
          router.push("/wait");
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

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
          <VSpacer size={4} />
          <CustomTitleText title="お題" text={theme} />
          <VSpacer size={4} />
          <CustomTitleText title="解答" text={answer} />
          <VSpacer size={12} />
          {isCorrect ? (
            <Text fontSize="3xl">正解！おめでとう！</Text>
          ) : (
            <Text fontSize="3xl">残念！公開処刑！</Text>
          )}
          <VSpacer size={12} />
          {owner.isOwner ? (
            <Button colorScheme="red" minW={64} minH={12} onClick={Initialize}>
              次へ
            </Button>
          ) : IS_AUTO_REQUEST ? (
            <Button colorScheme="red" minW={64} minH={12} isDisabled={true}>
              待機中
            </Button>
          ) : (
            <Button colorScheme="red" minW={64} minH={12} onClick={handleNext}>
              更新
            </Button>
          )}
        </VStack>
      </Center>
    </>
  );
};
