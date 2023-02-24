import React from "react";

import { Button, Center, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

type Props = {
  title: string;
  text: string;
  areYou: boolean;
};

export const YouAre = ({ title, text, areYou }: Props) => {
  return (
    <>
      <Center>
        <VStack>
          {areYou ? (
            <>
              <Text fontSize={40} color={"red"}>
                {title}
              </Text>
              <VSpacer size={8} />
              <Image src="https://bit.ly/3Zjpfj1" alt="wolf" />
              <VSpacer size={8} />
              <Text fontSize={28} color={"red"}>
                {text}
              </Text>
            </>
          ) : (
            <>
              <Text fontSize={40} color={"blue"}>
                {title}
              </Text>
              <VSpacer size={8} />
              <Image src="https://bit.ly/3IylGyK" alt="vilager" />
              <VSpacer size={8} />
              <Text fontSize={28} color={"blue"}>
                {text}
              </Text>
            </>
          )}
          <VSpacer size={12} />
          <Button colorScheme="pink" size="lg" minW={48}>
            Are you Ready?
          </Button>
        </VStack>
      </Center>
    </>
  );
};
