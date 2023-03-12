import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";
import { PointList } from "@/components/wolf/PointList";

import { BASE_URL, IS_AUTO_REQUEST } from "@/data/data";

import { RecoilOwner, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";
import { AutoHttpRequest } from "@/hooks/useHttpRequest";

type Props = {
  playerList: { nickname: string; particIcon: number; point: number }[];
  setStep: Dispatch<SetStateAction<number>>;
};

export const Score = ({ playerList, setStep }: Props) => {
  const router = useRouter();
  const owner = useRecoilValue(RecoilOwner);
  const room = useRecoilValue(RecoilRoom);

  const Initialize = () => {
    axios
      .post(BASE_URL + "initialize", {
        roomId: room.id,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push("/wolf-wait");
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  // NOTE: 遷移を含むため共通化できない
  const handleNext = () => {
    axios
      .get(BASE_URL + "step", {
        params: { roomId: room.id },
      })
      .then((res) => {
        if (res.data != 11) {
          router.push("/wolf-wait");
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
          <VStack>
            <Text fontSize={24}>現在のポイント</Text>
            <PointList memberPointList={playerList} />
          </VStack>
          <VSpacer size={16} />

          {owner.isOwner ? (
            <Button
              minW={60}
              minH={12}
              colorScheme="red"
              color="white"
              onClick={Initialize}
            >
              次へ
            </Button>
          ) : IS_AUTO_REQUEST ? (
            <Button
              minW={60}
              minH={12}
              colorScheme="red"
              color="white"
              isDisabled={true}
            >
              待機中
            </Button>
          ) : (
            <Button
              minW={60}
              minH={12}
              colorScheme="red"
              color="white"
              onClick={handleNext}
            >
              更新
            </Button>
          )}
        </VStack>
      </Center>

      <VSpacer size={20} />
    </>
  );
};
