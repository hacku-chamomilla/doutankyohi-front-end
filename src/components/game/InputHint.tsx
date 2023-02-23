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

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const InputHint = ({ setStep }: Props) => {
  const [inputHint, setInputHint] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const player = useRecoilValue(RecoilPlayer);
  const room = useRecoilValue(RecoilRoom);
  const router = useRouter();

  const ThemeGet = () => {
    const url = BASE_URL + "theme";

    axios
      .get(url, {
        params: { roomId: room.id },
      })
      .then((res) => {
        if (res.status === 200) {
          setTheme(res.data);
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  const HintPost = () => {
    const url = BASE_URL + "create-hint";
    const url2 = BASE_URL + "step";
    axios
      .post(url, {
        playerId: player.id,
        hint: inputHint,
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

  ThemeGet();
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
