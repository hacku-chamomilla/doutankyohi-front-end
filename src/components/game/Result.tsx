import React, { useEffect, useState } from "react";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "../common/CustomTitleText";
import { VSpacer } from "../common/Spacer";

export const Result = () => {
  const [theme, setTheme] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [isCurrent] = useState<boolean>(true);

  useEffect(() => {
    setTheme("ポーカー");
    setAnswer("ポーカー");
  }, []);

  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={4} />
          {theme && <CustomTitleText title="お題" text={theme} />}
          <VSpacer size={4} />
          {answer && <CustomTitleText title="解答" text={answer} />}
          <VSpacer size={12} />
          {isCurrent ? (
            <Text fontSize="3xl">正解！おめでとう！</Text>
          ) : (
            <Text fontSize="3xl">残念！公開処刑！</Text>
          )}
          <VSpacer size={12} />
          <Button colorScheme="linkedin" minW={64}>
            次へ
          </Button>
        </VStack>
      </Center>
    </>
  );
};
