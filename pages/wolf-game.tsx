import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { YouAre } from "@/components/common/YouAre";
import { Answer } from "@/components/game/Answer";
import { AnswerWait } from "@/components/game/AnswerWait";
import { DeleteHintOtherMasterUI } from "@/components/game/DeleteHintOtherMasterUI";
import { DiscussJudgeAns } from "@/components/game/DiscussJudgeAns";
import { HowToDecideTheme } from "@/components/game/HowToDecideTheme";
import { InputHint } from "@/components/game/InputHint";
import { InputTheme } from "@/components/game/InputTheme";
import { JudgeAnswer } from "@/components/game/JudgeAnswer";
import { SelectDuplicateHint } from "@/components/game/SelectDuplicateHint";
import { ThinkingTheme } from "@/components/game/ThinkingTheme";
import { Wait } from "@/components/game/Wait";
import { ChoiceWolf } from "@/components/game/wolf/ChoiceWolf";
import { ThemeResult } from "@/components/game/wolf/ThemeResult";

import { BASE_URL } from "@/data/data";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { Hint, Vote } from "@/types/type";

import { HandleError } from "@/hooks/useError";

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

  useEffect(() => {
    const url = BASE_URL + "get-role-wolf";
    axios
      .get(url, {
        params: { playerId: player.id },
      })
      .then((res) => {
        setRole(res.data["role"]);
        setCatchCamp(res.data["wolf"]);
      })
      .catch((err) => {
        HandleError(router, err);
      });
  }, [player.id, router]);

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
    </>
  );
};

export default WolfGame;
