import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";
import { MemberList } from "@/components/MemberList";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

type Player = {
  nickname: string;
  particIcon: number;
};

const Wait: NextPage = () => {
  const [playerList, setPlayerList] = useState<Player[]>();
  const room = useRecoilValue(RecoilRoom);
  const router = useRouter();

  const handleGameStart = () => {
    const url = BASE_URL + "start-game";

    axios
      .post(url, {
        roomId: room.id,
      })
      .then((res) => {
        if (res.data) {
          router.push("/game");
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  const FetchPlayerList = () => {
    const url = BASE_URL + "partic-list";
    axios
      .get(url, {
        params: {
          roomId: room.id,
        },
      })
      .then((res) => {
        setPlayerList(res.data);
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  useEffect(() => {
    FetchPlayerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageBackIcon pass={"/create-room"} />
      <Center>
        <VStack>
          <VSpacer size={20} />
          <CustomTitleText title="ルームID" text={room.id}></CustomTitleText>
          <VSpacer size={20} />
          <Button onClick={FetchPlayerList}>参加者リストの更新</Button>
          {playerList && (
            <MemberList title={"参加者リスト"} memberNameList={playerList} />
          )}
          <VSpacer size={24} />
          {router.query && router.query.isRoomCreate == "true" && (
            <Button
              h={"60px"}
              w={"270px"}
              colorScheme="blue"
              onClick={handleGameStart}
            >
              ゲーム開始
            </Button>
          )}
        </VStack>
      </Center>
    </>
  );
};

export default Wait;
