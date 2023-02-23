import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import {
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { RecoilRoom } from "@/store/Recoil";

import { Hint } from "@/types/type";

import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  hintList: Hint[];
};

export const AnswerWait = ({ setStep, hintList }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);

  return (
    <>
      <VSpacer size={4} />
      <Center>
        <VStack align="hint">
          <HStack>
            <Text fontSize={24}>ゲッサーが入力しています</Text>
            <Button isLoading colorScheme="gray"></Button>
          </HStack>
          <VSpacer size={4} />

          <Button
            fontSize={20}
            textColor={"white"}
            colorScheme={"blue"}
            onClick={() => FetchStep(setStep, router, room.id)}
          >
            更新
          </Button>
          <VSpacer size={12} />
          {hintList.map((hint, i) => {
            return (
              <Card key={i}>
                <CardBody boxShadow={"dark-lg"}>
                  {hint.isDelete ? (
                    <Text color={"red"}>{"同担拒否"}</Text>
                  ) : (
                    <Text color={"blue"}>{hint.hint}</Text>
                  )}
                </CardBody>
              </Card>
            );
          })}

          <VSpacer size={42} />
        </VStack>
      </Center>
    </>
  );
};