import React, { useState } from "react";

import { Button, Center, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { ThinkingTheme } from "./ThinkingTheme";
import { CustomInput } from "../common/CustomInput";

export const InputTheme = () => {
  const [text, setText] = useState("");
  return (
    <>
      <Center>
        <VStack>
          <ThinkingTheme />
          <VSpacer size={12} />
          <CustomInput
            title={""}
            placeholder={"お題を入力"}
            text={text}
            setText={setText}
          />
          <VSpacer size={20} />
          <Button colorScheme="blue" minW={64}>
            決定
          </Button>
          <VSpacer size={8} />
        </VStack>
      </Center>
    </>
  );
};
