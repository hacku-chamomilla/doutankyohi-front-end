import React from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { RecoilOwner } from "@/store/Recoil";

import { CustomTitleText } from "../common/CustomTitleText";
import { VSpacer } from "../common/Spacer";
type Props = {
  theme: string;
  answer: string;
  isCorrect: boolean;
};
export const Result = ({ theme, answer, isCorrect }: Props) => {
  const owner = useRecoilValue(RecoilOwner);

  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={4} />
          {theme && <CustomTitleText title="お題" text={theme} />}
          <VSpacer size={4} />
          {answer && <CustomTitleText title="解答" text={answer} />}
          <VSpacer size={12} />
          {isCorrect ? (
            <Text fontSize="3xl">正解！おめでとう！</Text>
          ) : (
            <Text fontSize="3xl">残念！公開処刑！</Text>
          )}
          <VSpacer size={12} />
          {owner ? (
            <Button colorScheme="linkedin" minW={64}>
              次へ
            </Button>
          ) : (
            <Button colorScheme="linkedin" minW={64}>
              更新
            </Button>
          )}
        </VStack>
      </Center>
    </>
  );
};
