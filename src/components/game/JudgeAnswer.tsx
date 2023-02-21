import React, { useEffect, useState } from "react";

import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { HSpacer, VSpacer } from "@/components/common/Spacer";

export const JudgeAnswer = () => {
  const [theme, setTheme] = useState<string>();
  const [answer, setAnswer] = useState<string>();

  useEffect(() => {
    setTheme("ポーカー");
    setAnswer("ポーカー");
  }, []);

  const handleJudge = (param: boolean) => {
    // eslint-disable-next-line no-console
    console.log(`正解処理：${param}`); // TODO: 以下の TODO の実装時に削除する
    // TODO: 解答処理を実装
  };

  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={4} />
          <Text fontSize="xl">回答者が入力した答えが正解か判定しよう！</Text>
          <VSpacer size={12} />
          {theme && <CustomTitleText title="お題" text={theme} />}
          <VSpacer size={4} />
          {answer && <CustomTitleText title="解答" text={answer} />}
          <VSpacer size={12} />
          <HStack>
            <Button
              colorScheme="blue"
              minW={24}
              onClick={() => {
                handleJudge(true);
              }}
            >
              正解
            </Button>
            <HSpacer size={4} />
            <Button
              colorScheme="blackAlpha"
              minW={24}
              onClick={() => {
                handleJudge(false);
              }}
            >
              不正解
            </Button>
          </HStack>
        </VStack>
      </Center>
    </>
  );
};
