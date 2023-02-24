/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { ChoiceWolfList } from "@/components/ChoiceWolfList";
import { VSpacer } from "@/components/common/Spacer";
import { Wait } from "@/components/game/Wait";

import { BASE_URL } from "@/data/data";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { Vote } from "@/types/type";

import { HandleError } from "@/hooks/useError";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  wolfList: Vote[];
};

export const ChoiceWolf = ({ setStep, wolfList }: Props) => {
  const router = useRouter();
  const player = useRecoilValue(RecoilPlayer);
  const room = useRecoilValue(RecoilRoom);
  const [value, setValue] = useState<string>("");
  const [isPost, setIsPost] = useState<boolean>(false);

  const handleClick = () => {
    axios
      .post(BASE_URL + "vote", {
        playerId: player.id,
        roomId: room.id,
        inputPlayerId: value,
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
              <Image src="https://bit.ly/3kjlHyp" alt="deco11" boxSize="40px" />
              <Text fontSize={24} color="red">
                人狼
              </Text>
              <Text fontSize={24}>は誰だ！！</Text>
              <Image src="https://bit.ly/3kjlHyp" alt="deco11" boxSize="40px" />
            </HStack>
            <Text fontSize={12}>
              ※最初の人は回答者ですが、人狼の可能性もあります※
            </Text>
            <VSpacer size={4} />
            <ChoiceWolfList wolfList={wolfList} setValue={setValue} />
            <VSpacer size={12} />
            <Button
              colorScheme="red"
              minW={48}
              minH={12}
              onClick={() => {
                handleClick();
              }}
            >
              決定
            </Button>
          </VStack>
        </Center>
      )}
    </>
  );
};
