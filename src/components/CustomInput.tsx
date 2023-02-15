import React from "react";

import { Input, Text } from "@chakra-ui/react";

import { HSpacer, VSpacer } from "@/components/common/Spacer";

type Props = {
  title: string;
  placeholder: string;
};

export const CustomInput = ({ title, placeholder }: Props) => {
  return (
    <>
      <Text fontSize="xl">{title}</Text>
      <VSpacer size={8} />
      <Input placeholder={placeholder} size="lg" />
    </>
  );
};
