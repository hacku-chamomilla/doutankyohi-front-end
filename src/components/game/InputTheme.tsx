import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { VSpacer } from "@/components/common/Spacer";
import { Wait } from "@/components/game/Wait";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const InputTheme = ({ setStep }: Props) => {
  const [text, setText] = useState("");
  const [isPost, setIsPost] = useState<boolean>(false);
  const player = useRecoilValue(RecoilPlayer);
  const room = useRecoilValue(RecoilRoom);
  const router = useRouter();

  const handlePost = () => {
    const url = BASE_URL + "create-theme";
    axios
      .post(url, {
        playerId: player.id,
        theme: text,
        roomId: room.id,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsPost(true);
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  return (
    <>
      {isPost ? (
        <Wait text={"他の人の入力を待っています"} setStep={setStep} />
      ) : (
        <Center>
          <VStack>
            <Text fontSize={40} fontStyle={"oblique"} color={"red"}>
              あなたはヒントを与える人です!
            </Text>
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
            <Button colorScheme="blue" minW={64} onClick={handlePost}>
              決定
            </Button>
            <VSpacer size={8} />
          </VStack>
        </Center>
      )}
    </>
  );
};
