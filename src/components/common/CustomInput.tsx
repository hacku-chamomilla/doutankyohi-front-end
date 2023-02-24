import React, { Dispatch, SetStateAction } from "react";

import { Input, Text } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";
type Props = {
  title: string;
  placeholder: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  validation: boolean;
};

export const CustomInput = ({
  title,
  placeholder,
  text,
  setText,
  validation,
}: Props) => {
  return (
    <>
      <Text fontSize="xl">{title}</Text>
      <VSpacer size={4} />
      <Input
        value={text}
        placeholder={placeholder}
        size="lg"
        onChange={(event) => setText(event.target.value)}
      />
      {!validation && <Text color="red">※入力してください</Text>}
    </>
  );
};
