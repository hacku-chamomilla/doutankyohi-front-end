import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  hintList: {
    avatarIndex: number;
    hint: string;
    isDelete: boolean;
  }[];
};

export const Answer = ({ setStep, hintList }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);
  const [answer, setAnswer] = useState("");

  const handleAnswer = () => {
    const url = BASE_URL + "update-answer";
    axios
      .post(url, {
        roomId: room.id,
        answer: answer,
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
      <VSpacer size={4} />
      <Center>
        <VStack align="hint">
          <HStack>
            <Image
              src="https://bit.ly/3ILhIE6"
              alt="deco4"
              boxSize="51px"
            ></Image>
            <Text fontSize={24}>ヒントをもとに解答しよう</Text>
            <Image
              src="https://bit.ly/3XZKCoe"
              alt="deco4"
              boxSize="50px"
            ></Image>
          </HStack>
          <VSpacer size={4} />
          {hintList.map((hint, i) => {
            return (
              <Card key={i}>
                <CardBody boxShadow={"2xl"}>
                  {hint.isDelete ? (
                    <Text color={"red"}>{"同担拒否"}</Text>
                  ) : (
                    <Text color={"blue"}>{hint.hint}</Text>
                  )}
                </CardBody>
              </Card>
            );
          })}

          <VSpacer size={12} />
          <CustomInput
            title={"貴方の答え"}
            placeholder={"ナイスゲッサ―"}
            text={answer}
            setText={setAnswer}
          />
          <VSpacer size={8} />
          <Button
            fontSize={12}
            textColor={"white"}
            colorScheme={"red"}
            onClick={handleAnswer}
          >
            決定
          </Button>
        </VStack>
      </Center>
    </>
  );
};
