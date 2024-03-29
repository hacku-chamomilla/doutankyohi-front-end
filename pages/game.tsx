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
import { Result } from "@/components/coop/frame/step7/Result";
import { Wait } from "@/components/coop/frame/Wait";

import { BASE_URL } from "@/data/data";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { Hint } from "@/types/type";

import { HandleError } from "@/hooks/useError";

const Game: NextPage = () => {
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

  useEffect(() => {
    const url = BASE_URL + "get-role";
    axios
      .get(url, {
        params: { playerId: player.id, roomId: room.id },
      })
      .then((res) => {
        setRole(res.data);
      })
      .catch((err) => {
        HandleError(router, err);
      });
  }, [player.id, room.id, router]);

  useEffect(() => {
    if (step === 0) {
      router.push("/wait");
    }
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
  }, [room.id, router, step]);

  return (
    <>
      {/* --------------- */}
      {/* Step 1 */}
      {/* --------------- */}
      {role === 1 && step === 1 && (
        <Wait text={"あなたはゲッサーです！"} setStep={setStep} />
      )}
      {role === 2 && step === 1 && <HowToDecideTheme setStep={setStep} />}
      {role === 3 && step === 1 && <ThinkingTheme setStep={setStep} />}

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
        <Result
          theme={theme}
          answer={answer}
          isCorrect={isCorrect}
          setStep={setStep}
        />
      )}
    </>
  );
};

export default Game;
