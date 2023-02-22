import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

import { Button, Center, Input, Text, VStack } from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { NNAndIcon } from "@/components/common/NNAndIcon";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";

import { avatarList } from "@/data/AvatarList";
import { BASE_URL } from "@/data/BaseUrl";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

const JoinRoom: NextPage = () => {
  const router = useRouter();
  const setRoom = useSetRecoilState(RecoilRoom);
  const setPlayer = useSetRecoilState(RecoilPlayer);
  const [inputRoomId, setInputRoomId] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isRoomId, setIsRoomId] = useState<boolean>(true);

  const isRoomExit = () => {
    const url = BASE_URL + "is-room-exit";

    axios
      .get(url, {
        params: {
          roomId: inputRoomId,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data === false) {
            setIsRoomId(false);
            return false;
          } else {
            addPlayer();
          }
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
    return false;
  };

  const addPlayer = () => {
    const url = BASE_URL + "add-player";

    axios
      .post(url, {
        roomId: inputRoomId,
        playerName: nickname,
        playerIcon: avatarIndex,
      })
      .then((res) => {
        if (res.status === 200) {
          const newRoomId = {
            id: inputRoomId,
          };
          const newPlayerId = {
            id: res.data,
          };
          setRoom(newRoomId);
          setPlayer(newPlayerId);

          router.push("/wait");
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
      <PageBackIcon pass={"/start-game"} />
      <VSpacer size={8} />
      <Center>
        <VStack>
          <Text fontSize="3xl">ルームに参加</Text>
          <VSpacer size={12} />
          {isRoomId ? (
            <CustomInput
              title={"参加するルームのIDを入力して下さい"}
              placeholder={"roomID"}
              text={inputRoomId}
              setText={setInputRoomId}
            />
          ) : (
            <>
              <Text fontSize="xl">参加するルームのIDを入力して下さい</Text>
              <VSpacer size={8} />
              <Input
                value={inputRoomId}
                placeholder="roomId"
                size="lg"
                borderColor="red.300"
                focusBorderColor="red.300"
                _hover={{ borderColor: "red.300" }}
                onChange={(event) => setInputRoomId(event.target.value)}
              />
              <Text color="red">※ルームIDが正しくありません</Text>
            </>
          )}

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
              isRoomExit();
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
