import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

import {
  Button,
  Center,
  Checkbox,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";
import { NNAndIcon } from "@/components/coop/NNAndIcon";

import { avatarList, BASE_URL } from "@/data/data";

import { RecoilOwner, RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

const CreateRoom: NextPage = () => {
  const setRoom = useSetRecoilState(RecoilRoom);
  const setPlayer = useSetRecoilState(RecoilPlayer);
  const setOwner = useSetRecoilState(RecoilOwner);
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isNNNull, setIsNNNull] = useState<boolean>(false);
  const [wolfMode, setWolfMode] = useState(false);

  const handleCreateRoom = () => {
    const url = BASE_URL + "create-room";
    axios
      .post(url, {
        wolfMode: wolfMode,
      })
      .then((res) => {
        if (res.status === 200) {
          handleAddPlayer(res.data);
        }
      })
      .catch((err) => {
        HandleError(router, err);
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
          const newOwner = {
            isOwner: true,
          };
          setRoom(newRoomId);
          setPlayer(newPlayerId);
          setOwner(newOwner);

          if (wolfMode === true) {
            router.push("/wolf-wait");
          } else {
            router.push("/wait");
          }
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  return (
    <>
      <VSpacer size={4} />
      <PageBackIcon pass={"/start-game"} />
      <VSpacer size={4} />

      <Center>
        <VStack>
          <Text fontSize={40}>??????????????????</Text>
          <Image src="https://bit.ly/3XZv4AS" alt="deco1" />
          <VSpacer size={8} />
          <Text fontSize={14} whiteSpace="pre-line">
            {"???????????????????????????????????????ID???????????????????????????"}
          </Text>
          <VSpacer size={8} />

          <NNAndIcon
            title={"??????????????????"}
            subtitle={"??????????????????"}
            nickname={nickname}
            placeholder={"????????????"}
            avatarList={avatarList}
            avatarIndex={avatarIndex}
            setNickname={setNickname}
            setAvatarIndex={setAvatarIndex}
            isNNNull={isNNNull}
          />
          <VSpacer size={8} />
          <Checkbox
            colorScheme="green"
            size="lg"
            onChange={() => {
              setWolfMode(!wolfMode);
            }}
          >
            <Text fontSize={24}>???????????????</Text>
          </Checkbox>

          <VSpacer size={8} />
          <Button
            colorScheme="orange"
            color={"white"}
            minW={64}
            minH={12}
            onClick={() => {
              if (nickname === "") {
                setIsNNNull(true);
              } else {
                handleCreateRoom();
              }
            }}
          >
            ??????????????????
          </Button>
          <VSpacer size={24} />
        </VStack>
      </Center>
    </>
  );
};

export default CreateRoom;
