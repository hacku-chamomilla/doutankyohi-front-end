import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

import { ThinkingTheme } from "./ThinkingTheme";
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
    const url2 = BASE_URL + "step";
    axios
      .post(url, {
        playerId: player.id,
        theme: text,
        roomId: room.id,
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get(url2, {
              params: { roomId: room.id },
            })
            .then((res) => {
              setStep(res.data);
            })
            .catch((err) => {
              HandleError(router, err);
            });
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
          <ThinkingTheme />
          <VSpacer size={12} />
          <CustomInput
            title={""}
            placeholder={"お題を入力"}
            text={text}
            setText={setText}
          />
          <VSpacer size={20} />
          <Button colorScheme="blue" minW={64} onClick={ThemePost}>
            更新
          </Button>
          <VSpacer size={8} />
        </VStack>
      </Center>
    </>
  );
};
