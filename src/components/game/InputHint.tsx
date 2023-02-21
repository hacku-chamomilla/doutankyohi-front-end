import React, { useState } from "react";

import { Button, Center, Input, Text, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { VSpacer } from "@/components/common/Spacer";

export const InputHint = () => {
  const [inputHint, setInputHint] = useState<string>("");

  return (
    <>
      <Center>
        <VStack>
          <Text fontSize="xl">あなたはヒントを与える人です！</Text>
          <VSpacer size={4} />
          <Text>ほかの人と被らないようにヒントを作成しましょう </Text>
          <VSpacer size={8} />
          <CustomTitleText title="お題" text="ポーカー" />
          <VSpacer size={8} />
          <Input
            placeholder="ヒント"
            onChange={(event) => setInputHint(event.target.value)}
          />
          <VSpacer size={8} />
          <Button
            colorScheme="blue"
            minW={48}
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log(inputHint); // TODO: 以下の TODO 実装時に削除する
              // TODO: ヒントを API で送信する実装
            }}
          >
            決定
          </Button>
          <VSpacer size={8} />
        </VStack>
      </Center>
    </>
  );
};
