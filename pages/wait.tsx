import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";

import { Button, Center, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";
import { MemberList } from "@/components/MemberList";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

const Wait: NextPage = () => {
  const _ = useRecoilValue(RecoilPlayer);
  const room = useRecoilValue(RecoilRoom);
  const router = useRouter();

  return (
    <>
      <PageBackIcon pass={"/create-room"} />
      <Center>
        <VStack>
          <p>動作確認用</p>
          <CustomTitleText title="ユーザID" text={_.id}></CustomTitleText>
          <p>----------</p>

          <VSpacer size={20} />
          <CustomTitleText title="ルームID" text={room.id}></CustomTitleText>
          <VSpacer size={20} />
          <MemberList
            title={"参加者リスト"}
            memberNameList={["aaaaa", "bbbbb", "ccccc"]}
          />
          <VSpacer size={24} />
          {router.query && router.query.isRoomCreate == "true" && (
            <Button
              h={"60px"}
              w={"270px"}
              colorScheme="blue"
              // onClick={() => {
              //   router.push("");
              // }}
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
