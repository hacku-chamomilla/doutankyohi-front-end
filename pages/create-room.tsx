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
import { BASE_URL } from "@/data/BaseUrl";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

const CreateRoom: NextPage = () => {
  const setRoom = useSetRecoilState(RecoilRoom);
  const setPlayer = useSetRecoilState(RecoilPlayer);
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);

  const handleCreateRoom = () => {
    const url = BASE_URL + "create-room";
    axios
      .post(url, {
        password: "",
        particNum: 5, // TODO: 現状この値を取得する UI が無いため、それを作る or API からこの引数をなくす
      })
      .then((res) => {
        if (res.status == 200) {
          handleAddPlayer(res.data);
        }
      })
      .catch((err) => {
        router.push({
          pathname: "/http-error",
          query: {
            message: err.message,
            name: err.name,
          },
        });
      });
  };

  const handleAddPlayer = (roomId: string) => {
    const url = BASE_URL + "add-player";

    axios
      .post(url, {
        roomId: roomId,
        playerName: nickname,
        playerIcon: avatarIndex,
      })
      .then((res) => {
        if (res.status === 200) {
          const newRoomId = {
            id: roomId,
          };
          const newPlayerId = {
            id: res.data,
          };
          setRoom(newRoomId);
          setPlayer(newPlayerId);

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
        router.push({
          pathname: "/http-error",
          query: {
            message: err.message,
            name: err.name,
          },
        });
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
