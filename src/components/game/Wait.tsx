import React from "react";

import { Button, Center, Text } from "@chakra-ui/react";

export const Wait = () => {
  return (
    <Center>
      <Text>あなたは解答者です！</Text>
      <Button isLoading colorScheme="gray"></Button>
    </Center>
  );
};
