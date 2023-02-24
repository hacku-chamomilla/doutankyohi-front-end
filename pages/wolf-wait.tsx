import type { NextPage } from "next";
import router from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, Text, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";
import { PointList } from "@/components/game/PointList";

import { RecoilRoom } from "@/store/Recoil";

const WolfWait: NextPage = () => {
  const examplePointList = [
    { nickname: "ふかむーる", particIcon: 0, point: 3 },
    { nickname: "ふかみん", particIcon: 1, point: 5 },
    { nickname: "ふかむー", particIcon: 2, point: 0 },
    { nickname: "ふかめも", particIcon: 3, point: 2 },
    { nickname: "KJ", particIcon: 4, point: 3 },
  ];
  const room = useRecoilValue(RecoilRoom);

  // eslint-disable-next-line no-console
  console.log(`roomId: ${room.id}`); // TODO:デバック用のログ

  const handleGameStart = () => {
    router.push("/wolf-game");
  };
  return (
    <>
      <PageBackIcon pass={"/start-game"} />
      <Center>
        <VStack>
          <VSpacer size={4} />
          <Button>更新</Button>
          <CustomTitleText title="ルームID" text={"aaaaa"}></CustomTitleText>
          <VSpacer size={4} />
          <Text fontSize={24}>メンバー：現在のポイント</Text>
          <PointList memberPointList={examplePointList} />
          <VSpacer size={4} />
          <Button
            h={"60px"}
            w={"270px"}
            colorScheme="blue"
            onClick={handleGameStart}
          >
            ゲーム開始
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default WolfWait;
