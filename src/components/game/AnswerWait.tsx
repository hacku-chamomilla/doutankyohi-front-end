import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
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

import { IS_AUTO_REQUEST } from "@/data/data";

import { RecoilRoom } from "@/store/Recoil";

import { Hint } from "@/types/type";

import { FetchStep } from "@/hooks/useFetchStep";
import { AutoHttpRequest } from "@/hooks/useHttpRequest";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  hintList: Hint[];
};

export const AnswerWait = ({ setStep, hintList }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);

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
        <VStack align="hint">
          <HStack>
            <Text fontSize={24} color="orange">
              ゲッサー
            </Text>
            <Text fontSize={24} color="black">
              が入力しています
            </Text>
            <Button isLoading colorScheme="gray"></Button>
          </HStack>
          <VSpacer size={4} />

          {!IS_AUTO_REQUEST && (
            <Button
              fontSize={20}
              textColor={"white"}
              colorScheme={"blue"}
              onClick={() => FetchStep(setStep, router, room.id)}
            >
              更新
            </Button>
          )}
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
