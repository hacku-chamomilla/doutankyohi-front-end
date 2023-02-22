import React, { useState } from "react";

import { Button, Card, CardBody, Center, Text, VStack } from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { VSpacer } from "@/components/common/Spacer";
type Props = {
  hintList: {
    key: string;
    hint: string;
    isDelete: boolean;
  }[];
};
export const Answer = ({ hintList }: Props) => {
  const [answer, setAnswer] = useState("");

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
          <Button fontSize={12} textColor={"white"} colorScheme={"blue"}>
            決定
          </Button>
        </VStack>
      </Center>
    </>
  );
};
