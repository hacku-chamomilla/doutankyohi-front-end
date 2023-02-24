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

import { BASE_URL, IS_AUTO_REQUEST } from "@/data/data";

import { RecoilOwner, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { AutoHttpRequest } from "@/hooks/useHttpRequest";

type Player = {
  nickname: string;
  particIcon: number;
};

const Wait: NextPage = () => {
  const [playerList, setPlayerList] = useState<Player[]>();
  const room = useRecoilValue(RecoilRoom);
  const owner = useRecoilValue(RecoilOwner);
  const router = useRouter();

  const updateParticList = () => {
    axios
      .get(BASE_URL + "partic-list", {
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

  const judgeIsGameStart = () => {
    // NOTE: 遷移も行われているため共通化できない
    axios
      .get(BASE_URL + "step", {
        params: {
          roomId: room.id,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          router.push("/game");
        }
      })
      .catch((err) => {
        HandleError(router, err);
      });
  };

  const handleUpdate = () => {
    judgeIsGameStart();
    updateParticList();
  };

  const handleGameStart = () => {
    axios
      .post(BASE_URL + "start-game", {
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

  useEffect(() => {
    if (IS_AUTO_REQUEST) {
      AutoHttpRequest(handleUpdate, 0, Date.now());
    } else {
      handleUpdate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {owner.isOwner ? (
        <PageBackIcon pass={"/create-room"} />
      ) : (
        <PageBackIcon pass={"/start-game"} />
      )}
      <Center>
        <VStack>
          <VSpacer size={20} />
          {!IS_AUTO_REQUEST && <Button onClick={handleUpdate}>更新</Button>}
          <CustomTitleText title="ルームID" text={room.id}></CustomTitleText>
          <VSpacer size={20} />
          {playerList && (
            <MemberList title={"参加者リスト"} memberNameList={playerList} />
          )}
          <VSpacer size={24} />
          {owner.isOwner && (
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
