/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { PageBackIcon } from "@/components/common/PageBackIcon";
import { HSpacer, VSpacer } from "@/components/common/Spacer";
import { DeleteHintList } from "@/components/coop/DeleteHintList";
import { HowToDecideTheme } from "@/components/coop/frame/step1/HowToDecideTheme";
import { ThinkingTheme } from "@/components/coop/frame/step1/ThinkingTheme";
import { InputTheme } from "@/components/coop/frame/step2/InputTheme";
import { InputHint } from "@/components/coop/frame/step3/InputHint";
import { DeleteHintOtherMasterUI } from "@/components/coop/frame/step4/DeleteHintOtherMasterUI";
import { SelectDuplicateHint } from "@/components/coop/frame/step4/SelectDuplicateHint";
import { Answer } from "@/components/coop/frame/step5/Answer";
import { AnswerWait } from "@/components/coop/frame/step5/AnswerWait";
import { DiscussJudgeAns } from "@/components/coop/frame/step6/DiscussJudgeAns";
import { JudgeAnswer } from "@/components/coop/frame/step6/JudgeAnswer";
import { Result } from "@/components/coop/frame/step7/Result";
import { Wait } from "@/components/coop/frame/Wait";
import { MemberList } from "@/components/coop/MemberList";
import { NNAndIcon } from "@/components/coop/NNAndIcon";
import { ChoiceWolfList } from "@/components/wolf/ChoiceWolfList";
import { YouAre } from "@/components/wolf/frame/step1/YouAre";
import { VoteResult } from "@/components/wolf/frame/step10/VoteResult";
import { Score } from "@/components/wolf/frame/step11/Score";
import { ChoiceWolf } from "@/components/wolf/frame/step8/ChoiceWolf";
import { BanishPerson } from "@/components/wolf/frame/step9/BanishPerson";
import { PointList } from "@/components/wolf/PointList";

import { avatarList } from "@/data/data";

import { Vote } from "@/types/type";

const Component: NextPage = () => {
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [step, setStep] = useState<number>(0);
  const theme = "theme";
  const answer = "answer";
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isWolf, setIsWolf] = useState<boolean>(false);
  const [isPeace, setIsPeace] = useState<boolean>(false);
  const [wolf, setWolf] = useState<boolean>(false);
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
  const exampleWolfHintList: Vote[] = [
    {
      playerid: "11111",
      nickname: "KJ",
      text: "フルハウス",
      particIcon: 0,
    },
    {
      playerid: "22222",
      nickname: "ケイジ",
      text: "平和宣言(トランプ)",
      particIcon: 1,
    },
    {
      playerid: "33333",
      nickname: "本多",
      text: "オールイン",
      particIcon: 2,
    },
    {
      playerid: "44444",
      nickname: "ホンダ",
      text: "トランプ",
      particIcon: 3,
    },
    {
      playerid: "55555",
      nickname: "ケイジェイ",
      text: "ストレート",
      particIcon: 4,
    },
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
  const exampleVoteList = { nickname: "AAA", id: "123", vote: 1 };

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
                validation={false}
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

          {/* coop/frame/step1/HowToDecideTheme */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step1/HowToDecideTheme</Heading>
          <Card variant="filled">
            <CardBody>
              <HowToDecideTheme setStep={setStep} />
            </CardBody>
          </Card>

          {/* coop/frame/step1/ThinkingTheme */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step1/ThinkingTheme</Heading>
          <Card variant="filled">
            <CardBody>
              <ThinkingTheme setStep={setStep} />
            </CardBody>
          </Card>

          {/* coop/frame/step2/InputTheme */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step2/InputTheme</Heading>
          <Card variant="filled">
            <CardBody>
              <InputTheme setStep={setStep} />
            </CardBody>
          </Card>

          {/* coop/frame/step3/InputHint */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step3/InputHint</Heading>
          <Card variant="filled">
            <CardBody>
              <InputHint theme="小三元" setStep={setStep} />
            </CardBody>
          </Card>

          {/* coop/frame/step4/DeleteHintOtherMasterUI */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step4/DeleteHintOtherMasterUI</Heading>
          <Card variant="filled">
            <CardBody>
              <DeleteHintOtherMasterUI
                hintList={exampleHintList}
                setStep={setStep}
              />
              <VSpacer size={8} />
            </CardBody>
          </Card>

          {/* coop/frame/step4/SelectDuplicateHint */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step4/SelectDuplicateHint</Heading>
          <Card variant="filled">
            <CardBody>
              <SelectDuplicateHint
                hintList={exampleHintList}
                setStep={setStep}
              />
            </CardBody>
          </Card>

          {/* coop/frame/step5/Answer */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step5/Answer</Heading>
          <Card variant="filled">
            <CardBody>
              <Answer hintList={exampleHintList} setStep={setStep} />
              <VSpacer size={8} />
            </CardBody>
          </Card>

          {/* coop/frame/step5/AnswerWait */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step5/AnswerWait</Heading>
          <Card variant="filled">
            <CardBody>
              <AnswerWait hintList={exampleHintList} setStep={setStep} />
              <VSpacer size={8} />
            </CardBody>
          </Card>

          {/* coop/frame/step6/DiscussJudgeAns */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step6/DiscussJudgeAns</Heading>
          <Card variant="filled">
            <CardBody>
              <DiscussJudgeAns theme={text} answer={text} setStep={setStep} />
            </CardBody>
          </Card>

          {/* coop/frame/step6/JudgeAnswer */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step6/JudgeAnswer</Heading>
          <Card variant="filled">
            <CardBody>
              <JudgeAnswer
                theme={"theme"}
                answer={"answer"}
                setStep={setStep}
              />
            </CardBody>
          </Card>

          {/* coop/frame/step7/Result */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/step7/Result</Heading>
          <Card variant="filled">
            <CardBody>
              <Result
                theme={theme}
                answer={answer}
                isCorrect={isCorrect}
                setStep={setStep}
              />
              <Checkbox
                onChange={() => {
                  setIsCorrect(!isCorrect);
                }}
              >
                isCorrect = true
              </Checkbox>
            </CardBody>
          </Card>

          {/* coop/frame/Wait */}
          <VSpacer size={8} />
          <Heading size="lg">coop/frame/Wait</Heading>
          <Card variant="filled">
            <CardBody>
              <Wait text={"適当なタイトル"} setStep={setStep} />
            </CardBody>
          </Card>
          <VSpacer size={12} />

          {/* coop/DeleteHintList */}
          <VSpacer size={8} />
          <Heading size="lg">coop/parts/DeleteHintList</Heading>
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

          {/* coop/MemberList */}
          <VSpacer size={8} />
          <Heading size="lg">coop/MemberList</Heading>
          <Card variant="filled">
            <CardBody>
              <MemberList
                title={"参加者リスト"}
                memberNameList={exampleNameList}
              />
            </CardBody>
          </Card>

          {/* coop/NNAndIcon */}
          <VSpacer size={8} />
          <Heading size="lg">coop/NNAndIcon</Heading>
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
                isNNNull={true}
              />
            </CardBody>
            <Text>名前:{nickname}</Text>
            <Text>Index:{avatarIndex}</Text>
          </Card>

          {/* wolf/frame/step1/YouAre */}
          <VSpacer size={8} />
          <Heading size="lg">wolf/frame/step1/YouAre</Heading>
          <Card variant="filled">
            <CardBody>
              <YouAre youAre={wolf} setYouAre={setWolf} />
            </CardBody>
          </Card>
          <VSpacer size={8} />
          <Heading size="lg">common/YouAre</Heading>
          <Card variant="filled">
            <CardBody>
              <YouAre youAre={wolf} setYouAre={setWolf} />
            </CardBody>
          </Card>

          {/* wolf/frame/step8/ChoiceWolf*/}
          <VSpacer size={8} />
          <Heading size="lg">wolf/frame/step8/ChoiceWolf</Heading>
          <Card variant="filled">
            <CardBody>
              <ChoiceWolf wolfList={exampleWolfHintList} setStep={setStep} />
              <p>{text}</p>
            </CardBody>
          </Card>

          {/* wolf/frame/step9/BanishPerson*/}
          <VSpacer size={8} />
          <Heading size="lg">wolf/frame/step9/BanishPerson</Heading>
          <Card variant="filled">
            <CardBody>
              <BanishPerson
                choseWolf={exampleVoteList}
                setWolfResult={setStep}
                setStep={setStep}
              />
              <p>{text}</p>
            </CardBody>
          </Card>

          {/* wolf/frame/step10/VoteResult */}
          <VSpacer size={8} />
          <Heading size="lg">wolf/frame/step10/VoteResult</Heading>
          <Card variant="filled">
            <CardBody>
              <VoteResult
                name={"Player1"}
                wolf={"Player2"}
                result={1}
                setStep={setStep}
              />
              <Checkbox
                onChange={() => {
                  setIsWolf(!isWolf);
                }}
              >
                追放者: true
              </Checkbox>
              <Checkbox
                onChange={() => {
                  setIsPeace(!isPeace);
                }}
              >
                平和村: true
              </Checkbox>
            </CardBody>
          </Card>

          {/* wolf/frame/step11/Score */}
          <VSpacer size={8} />
          <Heading size="lg">game/wolf/frame/step11/Score</Heading>
          <Card variant="filled">
            <CardBody>
              <Score playerList={examplePointList} setStep={setStep} />
            </CardBody>
          </Card>

          {/* wolf/ChoiceWolfList */}
          <VSpacer size={8} />
          <Heading size="lg">wolf/ChoiceWolfList</Heading>
          <Card variant="filled">
            <CardBody>
              <ChoiceWolfList
                wolfList={exampleWolfHintList}
                setValue={setText}
              />
            </CardBody>
          </Card>

          <VSpacer size={12} />

          {/* wolf/asPointList */}
          <VSpacer size={8} />
          <Heading size="lg">game/wolf/parts/PointList</Heading>
          <Card variant="filled">
            <CardBody>
              <PointList memberPointList={examplePointList} />
            </CardBody>
          </Card>

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
