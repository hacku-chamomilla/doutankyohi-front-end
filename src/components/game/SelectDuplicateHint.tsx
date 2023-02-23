import React, { useEffect, useState } from "react";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";
import { DeleteHintList } from "@/components/DeleteHintList";

type Hint = {
  text: string;
  avatarIndex: number;
  isSelect: boolean;
};

export const SelectDuplicateHint = () => {
  const [hintList, setHintList] = useState<Hint[]>();

  useEffect(() => {
    setHintList([
      { text: "フルハウス", avatarIndex: 0, isSelect: false },
      { text: "トランプ", avatarIndex: 1, isSelect: false },
      { text: "オールイン", avatarIndex: 2, isSelect: false },
      { text: "トランプ", avatarIndex: 3, isSelect: false },
      { text: "ストレート", avatarIndex: 4, isSelect: false },
    ]);
  }, []);

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log(hintList); // TODO: 以下の TODO の実装時に削除
    // TODO: 重複したヒントを POST する
  };

  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={8} />
          <Text fontSize="xl">被ったヒントを消してください！</Text>
          <VSpacer size={8} />
          {hintList && <DeleteHintList hintList={hintList} />}
          <VSpacer size={8} />
          <Button colorScheme="red" minW={48} minH={12} onClick={handleClick}>
            決定
          </Button>
        </VStack>
      </Center>
    </>
  );
};
