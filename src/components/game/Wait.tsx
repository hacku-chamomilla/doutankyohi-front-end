import React, { Dispatch, SetStateAction } from "react";

import { Button, Center, HStack, VStack } from "@chakra-ui/react";

import { Respondent } from "@/components/common/Respondent";
import { VSpacer } from "@/components/common/Spacer";

import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const Wait = ({ setStep }: Props) => {
  const handleUpdate = () => {
    FetchStep(5, setStep);
  };

  return (
    <Center>
      <VStack>
        <HStack>
          <Respondent />
          <Button isLoading colorScheme="gray"></Button>
        </HStack>
        <VSpacer size={20} />
        <Button onClick={handleUpdate}>更新</Button>
      </VStack>
    </Center>
  );
};
