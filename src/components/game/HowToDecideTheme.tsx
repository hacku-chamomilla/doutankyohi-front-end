import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  Button,
  Center,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { FetchStep } from "@/hooks/useFetchStep";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const HowToDecideTheme = ({ setStep }: Props) => {
  const [value, setValue] = useState<string>("0");
  const room = useRecoilValue(RecoilRoom);
  const router = useRouter();

  const hoWToChoice = () => {
    const url = BASE_URL + "how-decide-theme";
    axios
      .post(url, {
        roomId: room.id,
        HowToDecideTheme: Number(value),
      })
      .then((res) => {
        if (res.status === 200) {
          FetchStep(setStep, router, room.id);
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  return (
    <>
      <Center>
        <VStack>
          <VSpacer size={8} />
          <HStack>
            <Image src="https://bit.ly/3xLp0kK" alt="deco6" boxSize="50px" />
            <Text fontSize="xl">あなたはヒントホルダーです！</Text>
            <Image src="https://bit.ly/3XQ6KBu" alt="deco7" boxSize="50px" />
          </HStack>
          <VSpacer size={12} />
          <Text fontSize="xl">お題の決定方法</Text>
          <VSpacer size={12} />
          <RadioGroup onChange={setValue} value={value}>
            <VStack>
              <Radio value="0" size="lg">
                自分たちで決める
              </Radio>
              <Radio value="1" size="lg">
                ランダムで決める
              </Radio>
            </VStack>
          </RadioGroup>
          <VSpacer size={12} />
          <Button colorScheme="pink" size="lg" minW={48} onClick={hoWToChoice}>
            決定
          </Button>
          <VSpacer size={12} />
        </VStack>
      </Center>
    </>
  );
};
