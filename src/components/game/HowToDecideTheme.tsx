import React, { useState } from "react";

import {
  Button,
  Center,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

import { VSpacer } from "../common/Spacer";

export const HowToDecideTheme = () => {
  const [value, setValue] = useState<string>("0");
  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={8} />
          <Text fontSize="xl">あなたはヒントを考える人です！</Text>
          <VSpacer size={12} />
          <Text fontSize="xl">お題の決定方法</Text>
          <VSpacer size={12} />
          <RadioGroup onChange={setValue} value={value}>
            <VStack>
              <Radio value="0" size="lg">
                自分たちで決める
              </Radio>
              <Radio value="1" size="lg">
                ランダムで決める
              </Radio>
            </VStack>
          </RadioGroup>
          <VSpacer size={12} />
          <Button
            colorScheme="blue"
            size="lg"
            minW={48}
            onClick={() => {
              console.log(`HowToTheme: value=${value}`); // TODO: 以下の TODO 実装時に削除する
              // TODO: テーマの選択方法を POST する実装を追加する
            }}
          >
            決定
          </Button>
          <VSpacer size={12} />
        </VStack>
      </Center>
    </>
  );
};
