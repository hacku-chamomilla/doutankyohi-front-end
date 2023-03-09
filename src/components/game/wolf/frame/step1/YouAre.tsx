import React, { Dispatch, SetStateAction } from "react";

import { Button, Center, Image, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

type Props = {
  youAre: boolean;
  setYouAre: Dispatch<SetStateAction<boolean>>;
};

export const YouAre = ({ youAre, setYouAre }: Props) => {
  return (
    <>
      <Center>
        <VStack>
          {youAre ? (
            <>
              <Text fontSize={40} color={"red"}>
                あなたは人狼です！
              </Text>
              <VSpacer size={8} />
              <Image src="https://bit.ly/3Zjpfj1" alt="wolf" />
              <VSpacer size={8} />
              <Text fontSize={28} color={"red"}>
                正解しないように妨害をしよう！
              </Text>
            </>
          ) : (
            <>
              <Text fontSize={40} color={"blue"}>
                あなたは村人です！
              </Text>
              <VSpacer size={8} />
              <Image src="https://bit.ly/3IylGyK" alt="vilager" />
              <VSpacer size={8} />
              <Text fontSize={28} color={"blue"}>
                協力して正解に導こう！
              </Text>
            </>
          )}
          <VSpacer size={12} />
          <Button
            colorScheme="pink"
            size="lg"
            minW={48}
            onClick={() => {
              setYouAre(true);
            }}
          >
            Are you Ready?
          </Button>
        </VStack>
      </Center>
    </>
  );
};
