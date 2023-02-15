import React from "react";

import { Input, Text } from "@chakra-ui/react";

type Props = {
  title: string;
};

export const CustomInput = ({ title }: Props) => {
  return (
    <>
      <Text fontSize="xs">{title}</Text>
      <Input placeholder="large size" size="lg" />
    </>
  );
};
