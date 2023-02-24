import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { VSpacer } from "@/components/common/Spacer";
import { Wait } from "@/components/game/Wait";

import { BASE_URL } from "@/data/data";

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
  const [inputThemeVal, setInputThemeVal] = useState<boolean>(true);

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
            <HStack>
              <Image src="https://bit.ly/3xLp0kK" alt="deco6" boxSize="50px" />
              <Text fontSize={24}>あなたは</Text>
              <Text fontSize={24} color="purple">
                ヒントホルダー
              </Text>
              <Text fontSize={24}>です</Text>
              <Image src="https://bit.ly/3XQ6KBu" alt="deco7" boxSize="50px" />
            </HStack>
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
              validation={inputThemeVal}
            />
            <VSpacer size={20} />
            <Button
              colorScheme="red"
              minW={64}
              minH={12}
              onClick={() => {
                if (text === "") {
                  setInputThemeVal(false);
                } else {
                  handlePost();
                }
              }}
            >
              決定
            </Button>
            <VSpacer size={8} />
          </VStack>
        </Center>
      )}
    </>
  );
};
