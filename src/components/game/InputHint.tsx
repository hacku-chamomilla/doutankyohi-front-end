import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Input, Text, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  theme: string;
  setStep: Dispatch<SetStateAction<number>>;
};

export const InputHint = ({ theme, setStep }: Props) => {
  const [inputHint, setInputHint] = useState<string>("");
  const player = useRecoilValue(RecoilPlayer);
  const room = useRecoilValue(RecoilRoom);
  const router = useRouter();

  const HintPost = () => {
    const url = BASE_URL + "create-hint";
    axios
      .post(url, {
        playerId: player.id,
        hint: inputHint,
        roomId: room.id,
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
          <Text fontSize="xl">あなたはヒントを与える人です！</Text>
          <VSpacer size={4} />
          <Text>ほかの人と被らないようにヒントを作成しましょう </Text>
          <VSpacer size={8} />
          <CustomTitleText title="お題" text={theme} />
          <VSpacer size={8} />
          <Input
            placeholder="ヒント"
            onChange={(event) => setInputHint(event.target.value)}
          />
          <VSpacer size={8} />
          <Button colorScheme="blue" minW={48} onClick={HintPost}>
            決定
          </Button>
          <VSpacer size={8} />
        </VStack>
      </Center>
    </>
  );
};
