import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  Button,
  Center,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

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
          <HStack>
            <Image src="https://bit.ly/3xLp0kK" alt="deco6" boxSize="50px" />
            <Text fontSize="xl">あなたはヒントホルダーです！</Text>
            <Image src="https://bit.ly/3XQ6KBu" alt="deco7" boxSize="50px" />
          </HStack>
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
          <Button colorScheme="red" minW={48} minH={12} onClick={HintPost}>
            決定
          </Button>
          <VSpacer size={8} />
        </VStack>
      </Center>
    </>
  );
};
