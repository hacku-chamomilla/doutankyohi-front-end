import type { NextPage } from "next";
import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { CustomInput } from "@/components/common/CustomInput";
import { CustomTitleText } from "@/components/common/CustomTitleText";
import { NNAndIcon } from "@/components/common/NNAndIcon";
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { HSpacer, VSpacer } from "@/components/common/Spacer";
import { DeleteHintList } from "@/components/DeleteHintList";
import { DeleteHintOtherMasterUI } from "@/components/game/DeleteHintOtherMasterUI";
import { HowToDecideTheme } from "@/components/game/HowToDecideTheme";
import { SelectDuplicateHint } from "@/components/game/SelectDuplicateHint";
import { ThinkingTheme } from "@/components/game/ThinkingTheme";
import { Wait } from "@/components/game/Wait";
import { MemberList } from "@/components/MemberList";

import { avatarList } from "@/data/AvatarList";

const Component: NextPage = () => {
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const exampleNameList = [
    "ふかむーる",
    "ふかみん",
    "ふかむー",
    "ふかめも",
    "KJ",
  ];

  const exampleHintList = [
    {
      text: "フルハウス",
      avatarIndex: 0,
      isSelect: false,
    },
    { text: "トランプ", avatarIndex: 1, isSelect: false },
    { text: "オールイン", avatarIndex: 2, isSelect: false },
    { text: "トランプ", avatarIndex: 3, isSelect: false },
    { text: "ストレート", avatarIndex: 4, isSelect: false },
  ];

  return (
    <>
      <VStack>
        <VSpacer size={4} />
        <Container maxW="container.lg">
          <Heading size="lg" textAlign="center">
            Components Mock Storybook
          </Heading>

          {/* common/CustomInput */}
          <VSpacer size={8} />
          <Heading size="lg">common/CustomInput</Heading>
          <Card variant="filled">
            <CardBody>
              <CustomInput
                title={"あいことばを入力してください"}
                placeholder={"ぎゃんぶる"}
                text={text}
                setText={setText}
              />
              <p>{text}</p>
            </CardBody>
          </Card>

          {/* common/CustomTitleText */}
          <VSpacer size={8} />
          <Heading size="lg">common/CustomTitleText</Heading>
          <Card variant="filled">
            <CardBody>
              <CustomTitleText title="お題" text="ポーカー" />
            </CardBody>
          </Card>

          {/*  common/Spacer/VSpacer  */}
          <VSpacer size={8} />
          <Heading size="lg">common/Spacer/VSpacer</Heading>
          <Card variant="filled">
            <CardBody>
              <Box bg="green.400" w="100%" color="white">
                Box A
              </Box>
              <VSpacer size={12} />
              <Box bg="green.400" w="100%" color="white">
                Box B
              </Box>
            </CardBody>
          </Card>

          {/* common/Spacer/HSpacer */}
          <VSpacer size={8} />
          <Heading size="lg">common/Spacer/HSpacer</Heading>
          <Card variant="filled">
            <CardBody>
              <HStack>
                <Box bg="green.400" color="white">
                  Box A
                </Box>
                <HSpacer size={12} />
                <Box bg="green.400" color="white">
                  Box B
                </Box>
              </HStack>
            </CardBody>
          </Card>

          {/* common/NNAndIcon */}
          <VSpacer size={8} />
          <Heading size="lg">common/NNAndIcon</Heading>
          <Card variant="filled">
            <CardBody>
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
            </CardBody>
            <Text>名前:{nickname}</Text>
            <Text>Index:{avatarIndex}</Text>
          </Card>

          {/* common/PageBackIcon */}
          <VSpacer size={8} />
          <Heading size="lg">common/PageBackIcon</Heading>
          <Card variant="filled">
            <CardBody>
              <PageBackIcon pass={"/"} />
            </CardBody>
          </Card>

          {/* game/HowToDecideTheme */}
          <VSpacer size={8} />
          <Heading size="lg">game/HowToDecideTheme</Heading>
          <Card variant="filled">
            <CardBody>
              <HowToDecideTheme />
            </CardBody>
          </Card>

          {/* game/SelectDuplicateHint */}
          <VSpacer size={8} />
          <Heading size="lg">game/SelectDuplicateHint</Heading>
          <Card variant="filled">
            <CardBody>
              <SelectDuplicateHint />
            </CardBody>
          </Card>

          {/* DeleteHintList */}
          <VSpacer size={8} />
          <Heading size="lg">DeleteHintList</Heading>
          <Card variant="filled">
            <CardBody>
              <DeleteHintList hintList={exampleHintList} />
              <VSpacer size={8} />
              <Button
                colorScheme="blue"
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log(exampleHintList);
                }}
              >
                チェックされているものをコンソールで確認
              </Button>
            </CardBody>
          </Card>

          {/* game/DeleteHintOtherMasterUI */}
          <VSpacer size={8} />
          <Heading size="lg">game/DeleteHintOtherMasterUI</Heading>
          <Card variant="filled">
            <CardBody>
              <DeleteHintOtherMasterUI hintList={exampleHintList} />
              <VSpacer size={8} />
            </CardBody>
          </Card>

          {/* game/ThinkingTheme */}
          <VSpacer size={8} />
          <Heading size="lg">game/ThinkingTheme</Heading>
          <Card variant="filled">
            <CardBody>
              <ThinkingTheme />
            </CardBody>
          </Card>

          {/* MemberList */}
          <VSpacer size={8} />
          <Heading size="lg">MemberList</Heading>
          <Card variant="filled">
            <CardBody>
              <MemberList
                title={"参加者リスト"}
                memberNameList={exampleNameList}
              />
            </CardBody>
          </Card>

          {/* game/Wait */}
          <VSpacer size={8} />
          <Heading size="lg">game/Wait</Heading>
          <Card variant="filled">
            <CardBody>
              <Wait />
            </CardBody>
          </Card>
          <VSpacer size={12} />

          {/* --------------------*/}

          {/* 追加のテンプレート：消さないでね！！ */}

          {/* --------------------*/}
          {/* メモ */}
          {/* ###/###/### の部分には components 以降のパスを記入する */}
          {/* コンポーネントの配置順番はファイルのは位置順が嬉しい (性善説) */}

          {/* コード */}
          {/* ###/###/### */}
          {/* <VSpacer size={8} />
          <Heading size="lg">###/###/###</Heading>
          <Card variant="filled">
            <CardBody>
              // ここに追加するコンポーネントを書く
            </CardBody>
          </Card> */}
        </Container>
      </VStack>
    </>
  );
};
export default Component;
