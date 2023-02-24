import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL, IS_AUTO_REQUEST } from "@/data/data";

import { RecoilOwner, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";
import { AutoHttpRequest } from "@/hooks/useHttpRequest";

// TODO: export したほうが良い！？
type Props = {
  choseWolf: { id: string; nickname: string; vote: number };
  setWolfResult: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<number>>;
};

export const BanishPerson = ({ choseWolf, setWolfResult, setStep }: Props) => {
  const router = useRouter();
  const owner = useRecoilValue(RecoilOwner);
  const room = useRecoilValue(RecoilRoom);

  const handleClick = () => {
    axios
      .post(BASE_URL + "judgement-wolf", {
        playerId: choseWolf.id,
        roomId: room.id,
      })
      .then((res) => {
        setWolfResult(res.data);
        FetchStep(setStep, router, room.id);
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
      <VSpacer size={4} />
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3m4STtV" alt="deco12" boxSize="50px" />
            <Text fontSize={40}>追放者:{choseWolf.nickname}</Text>
          </HStack>
          <VSpacer size={12} />
          <Text fontSize={24}>投票数:{choseWolf.vote}</Text>
          <VSpacer size={40} />
          {owner.isOwner ? (
            <Button colorScheme="red" minW={48} minH={12} onClick={handleClick}>
              次へ進む
            </Button>
          ) : IS_AUTO_REQUEST ? (
            <Button colorScheme="red" minW={48} minH={12} isDisabled={true}>
              待機中
            </Button>
          ) : (
            <Button
              colorScheme="red"
              minW={48}
              minH={12}
              onClick={() => {
                FetchStep(setStep, router, room.id);
              }}
            >
              更新
            </Button>
          )}
        </VStack>
      </Center>
    </>
  );
};
