import React from "react";

import { Button, Center } from "@chakra-ui/react";

import { Respondent } from "../common/Respondent";

export const Wait = () => {
  return (
    <Center>
      <Respondent />
      <Button isLoading colorScheme="gray"></Button>
    </Center>
  );
};
