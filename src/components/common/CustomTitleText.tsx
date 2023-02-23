import React from "react";

import { Box, HStack, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  text: string;
};
export const CustomTitleText = ({ title, text }: Props) => {
  return (
    <HStack spacing="40px">
      <Text fontSize="lg">{title}</Text>
      <Box
        borderWidth="2px"
        borderColor="blue"
        borderRadius={10}
        p={3}
        minW={48}
        minH={12}
      >
        {text}
      </Box>
    </HStack>
  );
};
