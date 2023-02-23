import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";

import { RecoilRoom } from "@/store/Recoil";

import { Hint } from "@/types/type";

import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  hintList: Hint[];
  setStep: Dispatch<SetStateAction<number>>;
};

export const DeleteHintOtherMasterUI = ({ hintList, setStep }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);
  return (
    <>
      <Button
        onClick={() => {
          FetchStep(setStep, router, room.id);
        }}
      >
        更新
      </Button>
      <VSpacer size={20} />
      <Text fontSize={24}>被ったヒントを見つけましょう</Text>
      <VSpacer size={20} />
      <VStack spacing={4} align="stretch">
        {hintList.map((hint, i) => {
          return (
            <Card key={i}>
              <CardBody>
                <HStack>
                  <Avatar size="xs" src={avatarList[hint.avatarIndex]} />
                  <Text>{hint.hint}</Text>
                </HStack>
              </CardBody>
            </Card>
          );
        })}
      </VStack>
    </>
  );
};
