import type { NextPage } from "next";
import router from "next/router";
import React, { useState } from "react";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { NNAndIcon } from "@/components/common/NNAndIcon";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";

const JoinRoom: NextPage = () => {
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  return (
    <>
      <PageBackIcon pass={"/start-game"} />
      <VSpacer size={8} />
      <Center>
        <VStack>
          <Text fontSize="3xl">ルームに参加</Text>
          <VSpacer size={12} />
          <CustomInput
            title={"参加するルームのIDを入力して下さい"}
            placeholder={"roomID"}
            text={text}
            setText={setText}
          />
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
            colorScheme="linkedin"
            minW={64}
            onClick={() => {
              router.push("/wait");
            }}
          >
            参加する
          </Button>
          <VSpacer size={8} />
        </VStack>
      </Center>
    </>
  );
};

export default JoinRoom;
