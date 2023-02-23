import type { NextPage } from "next";
import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
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
import { YouAre } from "@/components/common/YouAre";
import { DeleteHintList } from "@/components/DeleteHintList";
import { Answer } from "@/components/game/Answer";
import { AnswerWait } from "@/components/game/AnswerWait";
import { DeleteHintOtherMasterUI } from "@/components/game/DeleteHintOtherMasterUI";
import { DiscussJudgeAns } from "@/components/game/DiscussJudgeAns";
import { HowToDecideTheme } from "@/components/game/HowToDecideTheme";
import { InputHint } from "@/components/game/InputHint";
import { InputTheme } from "@/components/game/InputTheme";
import { JudgeAnswer } from "@/components/game/JudgeAnswer";
import { PointList } from "@/components/game/PointList";
import { Result } from "@/components/game/Result";
import { Score } from "@/components/game/Score";
import { SelectDuplicateHint } from "@/components/game/SelectDuplicateHint";
import { ThinkingTheme } from "@/components/game/ThinkingTheme";
import { Wait } from "@/components/game/Wait";
import { MemberList } from "@/components/MemberList";

import { avatarList } from "@/data/AvatarList";

const Component: NextPage = () => {
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [step, setStep] = useState<number>(0);
  const theme = "theme";
  const answer = "answer";
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const exampleNameList = [
    { nickname: "ふかむーる", particIcon: 0 },
    { nickname: "ふかみん", particIcon: 1 },
    { nickname: "ふかむー", particIcon: 2 },
    { nickname: "ふかめも", particIcon: 3 },
    { nickname: "KJ", particIcon: 4 },
  ];

  const examplePointList = [
    { nickname: "ふかむーる", particIcon: 0, point: 3 },
    { nickname: "ふかみん", particIcon: 1, point: 5 },
    { nickname: "ふかむー", particIcon: 2, point: 0 },
    { nickname: "ふかめも", particIcon: 3, point: 2 },
    { nickname: "KJ", particIcon: 4, point: 3 },
  ];

  const exampleHintList = [
    {
      playerId: "11111",
      hint: "フルハウス",
      avatarIndex: 0,
      isDelete: false,
    },
    { playerId: "22222", hint: "トランプ", avatarIndex: 1, isDelete: true },
    { playerId: "33333", hint: "オールイン", avatarIndex: 2, isDelete: true },
    { playerId: "44444", hint: "トランプ", avatarIndex: 3, isDelete: false },
    { playerId: "55555", hint: "ストレート", avatarIndex: 4, isDelete: false },
  ];

  return (
    <>
      <VStack>
        <VSpacer size={4} />
        <Container maxW="container.lg">
          <Heading size="lg" textAlign="center">
            Components Mock Storybook
          </Heading>

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

          {/* common/AreYou */}
          <VSpacer size={8} />
          <Heading size="lg">common/AreYou</Heading>
          <Card variant="filled">
            <CardBody>
              <YouAre
                title="あなたは人狼です！"
                text="正解しないように妨害をしよう！"
                areYou={true}
              />
            </CardBody>
          </Card>
          <VSpacer size={8} />
          <Heading size="lg">common/AreYou</Heading>
          <Card variant="filled">
            <CardBody>
              <YouAre
                title="あなたは村人です！"
                text="協力して正解に導こう！"
                areYou={false}
              />
            </CardBody>
          </Card>

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

          {/* game/Answer */}
          <VSpacer size={8} />
          <Heading size="lg">game/Answer</Heading>
          <Card variant="filled">
            <CardBody>
              <Answer hintList={exampleHintList} setStep={setStep} />
              <VSpacer size={8} />
            </CardBody>
          </Card>

          {/* game/AnswerWait */}
          <VSpacer size={8} />
          <Heading size="lg">game/AnswerWait</Heading>
          <Card variant="filled">
            <CardBody>
              <AnswerWait hintList={exampleHintList} setStep={setStep} />
              <VSpacer size={8} />
            </CardBody>
          </Card>

          {/* game/DiscussJudgeAns */}
          <VSpacer size={8} />
          <Heading size="lg">game/DiscussJudgeAns</Heading>
          <Card variant="filled">
            <CardBody>
              <DiscussJudgeAns theme={text} answer={text} setStep={setStep} />
            </CardBody>
          </Card>

          {/* game/DeleteHintOtherMasterUI */}
          <VSpacer size={8} />
          <Heading size="lg">game/DeleteHintOtherMasterUI</Heading>
          <Card variant="filled">
            <CardBody>
              <DeleteHintOtherMasterUI
                hintList={exampleHintList}
                setStep={setStep}
              />
              <VSpacer size={8} />
            </CardBody>
          </Card>

          {/* game/HowToDecideTheme */}
          <VSpacer size={8} />
          <Heading size="lg">game/HowToDecideTheme</Heading>
          <Card variant="filled">
            <CardBody>
              <HowToDecideTheme setStep={setStep} />
            </CardBody>
          </Card>

          {/* game/InputHint */}
          <VSpacer size={8} />
          <Heading size="lg">game/InputHint</Heading>
          <Card variant="filled">
            <CardBody>
              <InputHint theme="小三元" setStep={setStep} />
            </CardBody>
          </Card>

          {/* game/InputTheme */}
          <VSpacer size={8} />
          <Heading size="lg">game/InputTheme</Heading>
          <Card variant="filled">
            <CardBody>
              <InputTheme setStep={setStep} />
            </CardBody>
          </Card>

          {/* game/JudgeAnswer */}
          <VSpacer size={8} />
          <Heading size="lg">game/JudgeAnswer</Heading>
          <Card variant="filled">
            <CardBody>
              <JudgeAnswer
                theme={"theme"}
                answer={"answer"}
                setStep={setStep}
              />
            </CardBody>
          </Card>

          {/* game/PointList */}
          <VSpacer size={8} />
          <Heading size="lg">game/PointList</Heading>
          <Card variant="filled">
            <CardBody>
              <PointList memberPointList={examplePointList} />
            </CardBody>
          </Card>

          {/* game/Result */}
          <VSpacer size={8} />
          <Heading size="lg">game/Result</Heading>
          <Card variant="filled">
            <CardBody>
              <Result theme={theme} answer={answer} isCorrect={isCorrect} />
              <Checkbox
                onChange={() => {
                  setIsCorrect(!isCorrect);
                }}
              >
                isCorrect = true
              </Checkbox>
            </CardBody>
          </Card>

          {/* game/Score */}
          <VSpacer size={8} />
          <Heading size="lg">game/Score</Heading>
          <Card variant="filled">
            <CardBody>
              <Score />
            </CardBody>
          </Card>

          {/* game/SelectDuplicateHint */}
          <VSpacer size={8} />
          <Heading size="lg">game/SelectDuplicateHint</Heading>
          <Card variant="filled">
            <CardBody>
              <SelectDuplicateHint
                hintList={exampleHintList}
                setStep={setStep}
              />
            </CardBody>
          </Card>

          {/* game/ThinkingTheme */}
          <VSpacer size={8} />
          <Heading size="lg">game/ThinkingTheme</Heading>
          <Card variant="filled">
            <CardBody>
              <ThinkingTheme setStep={setStep} />
            </CardBody>
          </Card>

          {/* game/Wait */}
          <VSpacer size={8} />
          <Heading size="lg">game/Wait</Heading>
          <Card variant="filled">
            <CardBody>
              <Wait text={"適当なタイトル"} setStep={setStep} />
            </CardBody>
          </Card>
          <VSpacer size={12} />

          <VSpacer size={12} />

          {/* --------------------*/}

          {/* 追加のテンプレート：消さないでね！！ */}

          {/* --------------------*/}
          {/* メモ */}
          {/* ###/###/### の部分には components 以降のパスを記入する */}
          {/* コンポーネントの配置順番はファイルの位置順が嬉しい (性善説) */}

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
