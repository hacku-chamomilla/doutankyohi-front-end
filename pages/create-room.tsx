import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";
import { avatarList } from "@/components/data/AvatarList";
import { NNAndIcon } from "@/components/NNAndIcon";
import { PageBackIcon } from "@/components/PageBackIcon";

const CreateRoom: NextPage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  return (
    <>
      <VSpacer size={4} />
      <PageBackIcon pass={"/start-game"} />
      <VSpacer size={12} />

      <Center>
        <VStack>
          <Text fontSize={40}>ルームの作成</Text>
          <VSpacer size={8} />
          <Text fontSize={20}>「ルームの作成」を押すと,</Text>
          <Text fontSize={20}>ルームIDが自動で生成されます</Text>
          <VSpacer size={8} />
          <NNAndIcon
            title={"ニックネーム"}
            subtitle={"アイコン選択"}
            nickname={nickname}
            placeholder={"ふかまる"}
            avatarList={avatarList}
            avatarIndex={avatarIndex}
            setNickname={setNickname}
            setAvatarIndex={setAvatarIndex}
          />
          <VSpacer size={24} />
          <Button
            colorScheme="blue"
            color={"white"}
            minW={64}
            onClick={() => {
              router.push({
                pathname: "/game",
                query: {
                  username: nickname,
                  avatarIcon: avatarIndex,
                  isRoomCreate: true,
                },
              });
            }}
          >
            ルーム作成
          </Button>
          <VSpacer size={24} />
        </VStack>
      </Center>
    </>
  );
};

export default CreateRoom;
