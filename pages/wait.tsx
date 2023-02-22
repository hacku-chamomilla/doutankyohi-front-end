import type { NextPage } from "next";
import React from "react";

import { Button, Center, VStack } from "@chakra-ui/react";

import { CustomTitleText } from "@/components/common/CustomTitleText";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { VSpacer } from "@/components/common/Spacer";
import { MemberList } from "@/components/MemberList";

const Wait: NextPage = () => {
  const exampleNameList = [
    { name: "ふかむーる", avatarIndex: 0 },
    { name: "ふかみん", avatarIndex: 1 },
    { name: "ふかむー", avatarIndex: 2 },
    { name: "ふかめも", avatarIndex: 3 },
    { name: "KJ", avatarIndex: 4 },
  ];
  return (
    <>
      <PageBackIcon pass={"/create-room"} />
      <Center>
        <VStack>
          <VSpacer size={20} />
          <CustomTitleText title="ルームID" text="abcdef"></CustomTitleText>
          <VSpacer size={20} />
          <MemberList title={"参加者リスト"} memberNameList={exampleNameList} />
          <VSpacer size={24} />
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
        </VStack>
      </Center>
    </>
  );
};

export default Wait;
