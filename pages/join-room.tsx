import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { Button, Center, Image, Input, Text, VStack } from "@chakra-ui/react";

import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";
import { NNAndIcon } from "@/components/game/coop/parts/NNAndIcon";

import { avatarList, BASE_URL } from "@/data/data";

import { RecoilOwner, RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

const JoinRoom: NextPage = () => {
  const router = useRouter();
  const setRoom = useSetRecoilState(RecoilRoom);
  const setPlayer = useSetRecoilState(RecoilPlayer);
  const setOwner = useSetRecoilState(RecoilOwner);

  const [inputRoomId, setInputRoomId] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [roomIdVal, setRoomIdVal] = useState<boolean>(true);
  const [isNNNull, setIsNNNull] = useState<boolean>(false);
  const [wolfMode, setWolfMode] = useState<boolean>();

  const NNValidation = () => {
    if (nickname === "") {
      setIsNNNull(true);
    } else {
      setIsNNNull(false);
    }
  };

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
          if (!res.data) {
            setRoomIdVal(false);
          } else {
            if (nickname !== "") {
              addPlayer();
            } else {
              setRoomIdVal(true);
            }
          }
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  const addPlayer = () => {
    const url = BASE_URL + "add-player";
    const modeUrl = BASE_URL + "is-mode-wolf";

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
          const newOwner = {
            isOwner: false,
          };
          setRoom(newRoomId);
          setPlayer(newPlayerId);
          setOwner(newOwner);

          axios
            .get(modeUrl, {
              params: { roomId: inputRoomId },
            })
            .then((res) => {
              setWolfMode(res.data);
            })
            .catch((err) => {
              HandleError(router, err);
            });
        }
      });
  };

  useEffect(() => {
    if (wolfMode === true) {
      router.push("/wolf-wait");
    }
    if (wolfMode == false) {
      router.push("/wait");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wolfMode]);

  return (
    <>
      <VSpacer size={4} />
      <PageBackIcon pass={"/start-game"} />
      <VSpacer size={4} />
      <Center>
        <VStack>
          <Text fontSize={40}>ルームに参加</Text>
          <Image src="https://bit.ly/3XROgR3" alt="deco1" />
          <VSpacer size={6} />
          <Text fontSize="xl">参加するルームのIDを入力して下さい</Text>
          <VSpacer size={8} />
          {roomIdVal ? (
            <Input
              value={inputRoomId}
              placeholder="roomId"
              size="lg"
              onChange={(event) => setInputRoomId(event.target.value)}
            />
          ) : (
            <>
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
            isNNNull={isNNNull}
          />
          <VSpacer size={8} />
          <Button
            colorScheme="purple"
            minW={64}
            minH={12}
            onClick={() => {
              NNValidation();
              if (inputRoomId === "") {
                setRoomIdVal(false);
              } else {
                isRoomExit();
              }
            }}
          >
            ルームに参加
          </Button>
          <VSpacer size={8} />
        </VStack>
      </Center>
    </>
  );
};

export default JoinRoom;
