import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilOwner, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

import { CustomTitleText } from "../common/CustomTitleText";
import { VSpacer } from "../common/Spacer";

type Props = {
  theme: string;
  answer: string;
  isCorrect: boolean;
};

export const Result = ({ theme, answer, isCorrect }: Props) => {
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

  const FetchStep = () => {
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

  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={4} />
          {theme && <CustomTitleText title="お題" text={theme} />}
          <VSpacer size={4} />
          {answer && <CustomTitleText title="解答" text={answer} />}
          <VSpacer size={12} />
          {isCorrect ? (
            <Text fontSize="3xl">正解！おめでとう！</Text>
          ) : (
            <Text fontSize="3xl">残念！公開処刑！</Text>
          )}
          <VSpacer size={12} />
          {owner ? (
            <Button colorScheme="linkedin" minW={64} onClick={Initialize}>
              次へ
            </Button>
          ) : (
            <Button colorScheme="linkedin" minW={64} onClick={FetchStep}>
              更新
            </Button>
          )}
        </VStack>
      </Center>
    </>
  );
};
