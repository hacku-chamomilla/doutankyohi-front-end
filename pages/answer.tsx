import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Button, Card, CardBody, Center, Text, VStack } from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { VSpacer } from "@/components/common/Spacer";
const hintList = [
  { text: "hint - 1", isDelete: true },
  { text: "hint - 2", isDelete: true },
  { text: "かいぎしつ", isDelete: false },
];

const Answer: NextPage = () => {
  const router = useRouter();
  const [answer, setAnswer] = useState("");

  return (
    <>
      <VSpacer size={4} />

      <Center>
        <VStack align="hint">
          <VSpacer size={4} />
          <Text fontSize={24}>ヒントをもとに解答しよう！！</Text>
          <VSpacer size={4} />
          {hintList.map((hint, i) => {
            return (
              <>
                <Card key={i}>
                  <CardBody>
                    {hint.isDelete && <Text color={"red"}>{"同担拒否"}</Text>}
                    {!hint.isDelete && <Text color={"blue"}>{hint.text}</Text>}
                  </CardBody>
                </Card>
              </>
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
          <Button fontSize={12} textColor={"white"} colorScheme={"blue"}>
            決定
          </Button>
          <VSpacer size={4} />
        </VStack>
      </Center>
    </>
  );
};

export default Answer;
