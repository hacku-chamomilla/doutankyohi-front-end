import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/data";

import { RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";

// TODO: export したほうが良い！？
type Props = {
  choseWolf: { id: string; name: string; vote: number };
  setWolfResult: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<number>>;
};

export const BanishPerson = ({ choseWolf, setWolfResult, setStep }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);

  const handleClick = () => {
    axios
      .post(BASE_URL + "", {
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

  return (
    <>
      <VSpacer size={4} />
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3m4STtV" alt="deco12" boxSize="50px" />
            <Text fontSize={40}>追放者:{choseWolf.name}</Text>
          </HStack>
          <VSpacer size={12} />
          <Text fontSize={24}>投票数:{choseWolf.vote}</Text>
          <VSpacer size={40} />
          <Button colorScheme="red" minW={48} minH={12} onClick={handleClick}>
            次へ進む
          </Button>
        </VStack>
      </Center>
    </>
  );
};
