import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { NNAndIcon } from "@/components/common/NNAndIcon";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";
import { baseUrl } from "@/data/BaseUrl";

import { playerId } from "@/store/Recoil";

const CreateRoom: NextPage = () => {
  const setPlayer = useSetRecoilState(playerId);
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);

  const handleCreateRoom = () => {
    const url = baseUrl + "add-player";
    axios
      .post(url, {
        roomId: "zjH7Si3lo3vjtcqJSaE1", //TODO: #78 で API からの戻り値にする
        playerName: nickname,
        playerIcon: avatarIndex,
      })
      .then((res) => {
        if (res.status === 200) {
          const _ = {
            id: res.data,
          };
          setPlayer(_);

          router.push({
            pathname: "/wait",
            // TODO: isRoomCreate の値を Recoil で管理するようにする
            query: {
              username: nickname,
              avatarIcon: avatarIndex,
              isRoomCreate: true,
            },
          });
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  return (
    <>
      <VSpacer size={4} />
      <PageBackIcon pass={"/start-game"} />
      <VSpacer size={12} />

      <Center>
        <VStack>
          <Text fontSize={40}>ルームの作成</Text>
          <VSpacer size={8} />
          <Text fontSize={20} whiteSpace="pre-line">
            {"「ルームの作成」を押すと,\nルームIDが自動で生成されます"}
          </Text>
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
            onClick={handleCreateRoom}
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
