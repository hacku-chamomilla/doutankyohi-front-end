import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, HStack, VStack } from "@chakra-ui/react";

import { Respondent } from "@/components/common/Respondent";
import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const Wait = ({ setStep }: Props) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);

  const handleFetchStep = () => {
    const url = BASE_URL + "step";

    axios
      .get(url, {
        params: { roomId: room.id },
      })
      .then((res) => {
        if (res.data == 6) {
          //NOTE: 回答を入力する step のマジックナンバー
          setStep(res.data);
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  return (
    <Center>
      <VStack>
        <HStack>
          <Respondent />
          <Button isLoading colorScheme="gray"></Button>
        </HStack>
        <VSpacer size={20} />
        <Button onClick={handleFetchStep}>更新</Button>
      </VStack>
    </Center>
  );
};
