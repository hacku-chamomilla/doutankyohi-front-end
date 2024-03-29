import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

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
import { Wait } from "@/components/coop/frame/Wait";
import { YouAre } from "@/components/wolf/frame/step1/YouAre";
import { Score } from "@/components/wolf/frame/step11/Score";
import { ThemeResult } from "@/components/wolf/frame/step7/ThemeResult";
import { ChoiceWolf } from "@/components/wolf/frame/step8/ChoiceWolf";
import { BanishPerson } from "@/components/wolf/frame/step9/BanishPerson";

import { BASE_URL } from "@/data/data";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { Hint, Vote } from "@/types/type";

import { HandleError } from "@/hooks/useError";

import { VoteResult } from "../src/components/wolf/frame/step10/VoteResult";

type ChoseWolf = {
  id: string;
  nickname: string;
  vote: number;
};

// TODO: pages/game と共通化できるとこを共通化する
const WolfGame: NextPage = () => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);
  const player = useRecoilValue(RecoilPlayer);
  const [role, setRole] = useState<number>(-1);
  const [step, setStep] = useState<number>(1); // /game に最初に到達する時点でstep=1が保証されている(はず)
  const [theme, setTheme] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [hintList, setHintList] = useState<Hint[]>();
  const [deletedHintList, setDeletedHintList] = useState<Hint[]>();
  const [camp, setCamp] = useState<boolean>(false); // 人狼と村人を表示する画面をみたか, true=見た
  const [catchCamp, setCatchCamp] = useState<boolean>(); // 自分が人狼 or 村人か true=人狼, false=村人
  const [voteList, setVoteList] = useState<Vote[]>();
  const [choseWolf, setChoseWolf] = useState<ChoseWolf>();
  const [wolfResult, setWolfResult] = useState<number>(0);
  const [trustWolfName, setTrustWolfName] = useState<string>("");
  const [playerList, setPlayerList] =
    useState<{ nickname: string; particIcon: number; point: number }[]>();

  useEffect(() => {
    const url = BASE_URL + "get-role-wolf";
    axios
      .get(url, {
        params: { playerId: player.id, roomId: room.id },
      })
      .then((res) => {
        setRole(res.data["role"]);
        setCatchCamp(res.data["wolf"]);
      })
      .catch((err) => {
        HandleError(router, err);
      });
  }, [player.id, room.id, router]);

  useEffect(() => {
    if (step === 3 || step === 6 || step === 7) {
      axios
        .get(BASE_URL + "theme", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setTheme(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
    if (step === 4) {
      const url = BASE_URL + "hint-list";
      axios
        .get(url, {
          params: { roomId: room.id },
        })
        .then((res) => {
          setHintList(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
    if (step === 5) {
      axios
        .get(BASE_URL + "hint-list", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setDeletedHintList(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
    if (step === 6 || step === 7) {
      axios
        .get(BASE_URL + "answer", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setAnswer(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
    if (step === 7) {
      axios
        .get(BASE_URL + "judgement-answer", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setIsCorrect(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
    if (step === 8) {
      axios
        .get(BASE_URL + "partic-list-vote", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setVoteList(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
    if (step === 9) {
      axios
        .get(BASE_URL + "vanish-wolf", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setChoseWolf(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
    if (step === 10) {
      axios
        .get(BASE_URL + "get-wolf-name", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setTrustWolfName(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });

      axios
        .get(BASE_URL + "result", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setWolfResult(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
    if (step === 11) {
      axios
        .get(BASE_URL + "partic-list-wolf", {
          params: { roomId: room.id },
        })
        .then((res) => {
          setPlayerList(res.data);
        })
        .catch((err) => {
          HandleError(router, err);
        });
    }
  }, [room.id, router, step]);

  // eslint-disable-next-line no-console
  console.log(`role:${role} step:${step} camp:${camp} catchCamp:${catchCamp}`); // TODO : デバッグ用のログ

  return (
    <>
      {/* --------------- */}
      {/* Step 1 */}
      {/* --------------- */}
      {step === 1 && !camp && catchCamp !== undefined && (
        <YouAre youAre={catchCamp} setYouAre={setCamp} />
      )}
      {camp && role === 1 && step === 1 && (
        <Wait text={"あなたはゲッサーです！"} setStep={setStep} />
      )}

      {camp && role === 2 && step === 1 && (
        <HowToDecideTheme setStep={setStep} />
      )}
      {camp && role === 3 && step === 1 && <ThinkingTheme setStep={setStep} />}
      {/* --------------- */}
      {/* Step 2 */}
      {/* --------------- */}

      {role === 1 && step === 2 && (
        <Wait text={"あなたはゲッサーです！"} setStep={setStep} />
      )}
      {(role === 2 || role === 3) && step === 2 && (
        <InputTheme setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 3 */}
      {/* --------------- */}
      {role === 1 && step === 3 && (
        <Wait text={"あなたはゲッサーです！"} setStep={setStep} />
      )}
      {(role === 2 || role === 3) && step === 3 && (
        <InputHint theme={theme} setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 4 */}
      {/* --------------- */}
      {role === 1 && step === 4 && (
        <Wait text={"あなたはゲッサーです！"} setStep={setStep} />
      )}
      {role === 2 && step === 4 && hintList && (
        <SelectDuplicateHint hintList={hintList} setStep={setStep} />
      )}
      {role === 3 && step === 4 && hintList && (
        <DeleteHintOtherMasterUI hintList={hintList} setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 5 */}
      {/* --------------- */}
      {role === 1 && step === 5 && deletedHintList && (
        <Answer hintList={deletedHintList} setStep={setStep} />
      )}
      {(role === 2 || role === 3) && step === 5 && deletedHintList && (
        <AnswerWait hintList={deletedHintList} setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 6 */}
      {/* --------------- */}
      {(role === 1 || role === 3) && step === 6 && (
        <DiscussJudgeAns theme={theme} answer={answer} setStep={setStep} />
      )}
      {role === 2 && step === 6 && (
        <JudgeAnswer theme={theme} answer={answer} setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 7 */}
      {/* --------------- */}
      {step === 7 && isCorrect !== undefined && (
        <ThemeResult
          theme={theme}
          answer={answer}
          isCorrect={isCorrect}
          setStep={setStep}
        />
      )}

      {/* --------------- */}
      {/* Step 8 */}
      {/* --------------- */}
      {step === 8 && voteList && (
        <ChoiceWolf wolfList={voteList} setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 9 */}
      {/* --------------- */}
      {step === 9 && choseWolf && (
        <BanishPerson
          choseWolf={choseWolf}
          setWolfResult={setWolfResult}
          setStep={setStep}
        />
      )}

      {/* --------------- */}
      {/* Step 10 */}
      {/* --------------- */}
      {step === 10 && choseWolf && (
        <VoteResult
          name={choseWolf.nickname}
          wolf={trustWolfName}
          result={wolfResult}
          setStep={setStep}
        />
      )}

      {/* --------------- */}
      {/* Step 11 */}
      {/* --------------- */}
      {step === 11 && playerList && (
        <Score playerList={playerList} setStep={setStep} />
      )}
    </>
  );
};

export default WolfGame;
