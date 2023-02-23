import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";

import { CustomInput } from "../common/CustomInput";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const InputTheme = ({ setStep }: Props) => {
  const [text, setText] = useState("");
  const player = useRecoilValue(RecoilPlayer);
  const room = useRecoilValue(RecoilRoom);
  const router = useRouter();

  const ThemePost = () => {
    const url = BASE_URL + "create-theme";
    axios
      .post(url, {
        playerId: player.id,
        theme: text,
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
          <Text fontSize="xl">あなたはヒントホルダーです！</Text>
          <VSpacer size={12} />
          <Text fontSize={20} fontStyle={"oblique"}>
            お題は入力されたものからランダムに選ばれます
          </Text>
          <VSpacer size={12} />
          <CustomInput
            title={""}
            placeholder={"お題を入力"}
            text={text}
            setText={setText}
          />
          <VSpacer size={20} />
          <Button colorScheme="red" minW={64} minH={12} onClick={ThemePost}>
            決定
          </Button>
          <VSpacer size={8} />
        </VStack>
      </Center>
    </>
  );
};
