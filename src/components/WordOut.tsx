import React from "react";

import { Box, HStack, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  text: string;
};
export const WordOut = ({ title, text }: Props) => {
  return (
    <HStack spacing="40px">
      <Text fontSize="lg">{title}</Text>
      <Box borderWidth="2px" borderColor="blue" borderRadius={10} w="75%" p={3}>
        {text}
      </Box>
    </HStack>
  );
};
