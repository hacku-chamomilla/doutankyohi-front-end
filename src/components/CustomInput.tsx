import React, { useState } from "react";

import { Button, ButtonGroup, Input, Text } from "@chakra-ui/react";

import { HSpacer, VSpacer } from "@/components/common/Spacer";

type Props = {
  title: string;
  placeholder: string;
};

export const CustomInput = ({ title, placeholder }: Props) => {
  const [text, setText] = useState("");

  return (
    <>
      <Text fontSize="xl">{title}</Text>
      <VSpacer size={8} />
      <Input
        value={text}
        placeholder={placeholder}
        size="lg"
        onChange={(event) => setText(event.target.value)}
      />
      <p>{text}</p>
    </>
  );
};
