import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";
import { DeleteHintList } from "@/components/game/coop/parts/DeleteHintList";

import { BASE_URL } from "@/data/data";

import { RecoilRoom } from "@/store/Recoil";

import { Hint } from "@/types/type";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  hintList: Hint[];
  setStep: Dispatch<SetStateAction<number>>;
};

export const SelectDuplicateHint = ({ hintList, setStep }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);

  const pickUpPlayerList = () => {
    const output: string[] = [];
    hintList.forEach((hint) => {
      if (hint.isDelete) {
        output.push(hint.playerId);
      }
    });
    return output;
  };

  const handleClick = () => {
    const playerList = pickUpPlayerList();
    axios
      .post(BASE_URL + "delete-hint", {
        hint: playerList,
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
          <VSpacer size={8} />
          <HStack>
            <Image src="https://bit.ly/3ZbrlSt" alt="deco4" boxSize="40px" />
            <Text fontSize="xl">被ったヒントを消してください！</Text>
            <Image src="https://bit.ly/3ZbrlSt" alt="deco4" boxSize="40px" />
          </HStack>
          <VSpacer size={8} />
          <DeleteHintList hintList={hintList} />
          <VSpacer size={8} />
          <Button colorScheme="red" minW={48} minH={12} onClick={handleClick}>
            決定
          </Button>
        </VStack>
      </Center>
    </>
  );
};
