import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Card, CardBody, Center, Text, VStack } from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  hintList: {
    key: string;
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
          setStep(7); //NOTE: 次のステップへ進むマジックナンバー
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
          <Text fontSize={24}>ヒントをもとに解答しよう！！</Text>
          <VSpacer size={4} />
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
            colorScheme={"blue"}
            onClick={handleAnswer}
          >
            決定
          </Button>
        </VStack>
      </Center>
    </>
  );
};
