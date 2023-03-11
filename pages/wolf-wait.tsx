import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";
import { PointList } from "@/components/wolf/PointList";

import { BASE_URL, IS_AUTO_REQUEST } from "@/data/data";

import { RecoilOwner, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";
import { AutoHttpRequest } from "@/hooks/useHttpRequest";

type Player = {
  nickname: string;
  particIcon: number;
  point: number;
};

const WolfWait: NextPage = () => {
  const [playerList, setPlayerList] = useState<Player[]>();
  const room = useRecoilValue(RecoilRoom);
  const owner = useRecoilValue(RecoilOwner);
  const router = useRouter();
  // eslint-disable-next-line no-console
  console.log(`roomId: ${room.id}`); // TODO:デバック用のログ

  const updateParticList = () => {
    axios
      .get(BASE_URL + "partic-list-wolf", {
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
          router.push("/wolf-game");
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
          router.push("/wolf-game");
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
          <VSpacer size={4} />
          {!IS_AUTO_REQUEST && <Button onClick={handleUpdate}>更新</Button>}
          <CustomTitleText title="ルームID" text={room.id}></CustomTitleText>
          <VSpacer size={4} />
          <Text fontSize={24}>メンバー：現在のポイント</Text>
          {playerList && <PointList memberPointList={playerList} />}
          <VSpacer size={4} />
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

export default WolfWait;
