import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { RecoilOwner, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";
import { AutoHttpRequest } from "@/hooks/useHttpRequest";

import { BASE_URL, IS_AUTO_REQUEST } from "../../data/data";

type Props = {
  name: string;
  wolf: string;
  result: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const VoteResult = ({ name, wolf, result, setStep }: Props) => {
  const router = useRouter();
  const owner = useRecoilValue(RecoilOwner);
  const room = useRecoilValue(RecoilRoom);

  const handleClick = () => {
    axios
      .get(BASE_URL + "point", {
        params: {
          roomId: room.id,
        },
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
      <Center>
        <VStack>
          <HStack>
            <Image src="https://bit.ly/3ECjZz4" alt="deco13" boxSize="50px" />
            <Text fontSize={36}>投票結果</Text>
            <Image src="https://bit.ly/3ECjZz4" alt="deco13" boxSize="50px" />
          </HStack>
          <VSpacer size={8} />
          {result === 1 && (
            <>
              <Text fontSize={20}>{name}が追放された</Text>
              <VSpacer size={20} />
              <Text fontSize={20}>しかし人狼は存在しなかった</Text>
            </>
          )}
          {result === 2 && (
            <>
              <Text fontSize={20}>誰も追放されなかった</Text>
              <VSpacer size={20} />
              <Text fontSize={20}>人狼は存在しなかった</Text>
            </>
          )}
          {result === 3 && (
            <>
              <Text fontSize={20}>{name}が追放された</Text>
              <VSpacer size={20} />
              <Text fontSize={20}>人狼は {wolf} だった！</Text>
            </>
          )}
          {result === 4 && (
            <>
              <Text fontSize={20}>誰も追放されなかった</Text>
              <VSpacer size={20} />
              <Text fontSize={20}>人狼は {wolf} だった！</Text>
            </>
          )}
          <VSpacer size={12} />
          {owner.isOwner ? (
            <Button
              colorScheme="pink"
              size="lg"
              minW={48}
              onClick={handleClick}
            >
              次へ
            </Button>
          ) : (
            !IS_AUTO_REQUEST && (
              <Button
                colorScheme="pink"
                size="lg"
                minW={48}
                onClick={() => {
                  FetchStep(setStep, router, room.id);
                }}
              >
                更新
              </Button>
            )
          )}
        </VStack>
      </Center>
    </>
  );
};
