import { ArrowBackIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import React from "react";

import { Button, Center, IconButton, VStack } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";
import { CustomTitleText } from "@/components/CustomTitleText";
import { MemberList } from "@/components/MemberList";

const Wait: NextPage = () => {
  return (
    <>
      <IconButton aria-label="Search database" icon={<ArrowBackIcon />} />
      <Center>
        <VStack>
          <VSpacer size={20} />
          <CustomTitleText title="ルームID" text="abcdef"></CustomTitleText>
          <VSpacer size={20} />
          <MemberList
            title={"参加者リスト"}
            memberNameList={["aaaaa", "bbbbb", "ccccc"]}
          />
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
