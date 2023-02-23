import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Answer } from "@/components/game/Answer";
import { DeleteHintOtherMasterUI } from "@/components/game/DeleteHintOtherMasterUI";
import { DiscussJudgeAns } from "@/components/game/DiscussJudgeAns";
import { HowToDecideTheme } from "@/components/game/HowToDecideTheme";
import { InputHint } from "@/components/game/InputHint";
import { InputTheme } from "@/components/game/InputTheme";
import { Result } from "@/components/game/Result";
import { SelectDuplicateHint } from "@/components/game/SelectDuplicateHint";
import { ThinkingTheme } from "@/components/game/ThinkingTheme";
import { Wait } from "@/components/game/Wait";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilPlayer, RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

const Game: NextPage = () => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);
  const player = useRecoilValue(RecoilPlayer);
  const [role, setRole] = useState<number>();
  const [step, setStep] = useState<number>(1); // /game に最初に到達する時点でstep=1が保証されている(はず)
  const [theme, setTheme] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
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
  const [hintList, setHintList] =
    useState<{ key: string; hint: string; isDelete: boolean }[]>();

  useEffect(() => {
    const url = BASE_URL + "get-role";
    axios
      .get(url, {
        params: { playerId: player.id },
      })
      .then((res) => {
        setRole(res.data);
      })
      .catch((err) => {
        HandleError(router, err);
      });
  }, [player.id, router]);

  useEffect(() => {
    //NOTE: マジックナンバー
    if (step === 3) {
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
    //NOTE: マジックナンバー
    if (step === 5) {
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
    //NOTE: マジックナンバー
    if (step === 6) {
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
    if (step == 7) {
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

  // eslint-disable-next-line no-console
  console.log(`role:${role} step:${step}`); // TODO : デバッグ用のログ

  return (
    <>
      {/* --------------- */}
      {/* Step 1 */}
      {/* --------------- */}
      {role == 1 && step == 1 && <Wait setStep={setStep} />}
      {role == 2 && step == 1 && <HowToDecideTheme setStep={setStep} />}
      {role == 3 && step == 1 && <ThinkingTheme />}

      {/* --------------- */}
      {/* Step 2 */}
      {/* --------------- */}
      {(role == 2 || role == 3) && step == 2 && (
        <InputTheme setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 3 */}
      {/* --------------- */}
      {(role == 2 || role == 3) && step == 3 && (
        <InputHint theme={theme} setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 4 */}
      {/* --------------- */}
      {role === 2 && step === 4 && <SelectDuplicateHint />}
      {role === 3 && step === 4 && (
        <DeleteHintOtherMasterUI hintList={exampleHintList} />
      )}
      {/* --------------- */}
      {/* Step 5 */}
      {/* --------------- */}
      {role == 1 && step == 5 && hintList && (
        <Answer hintList={hintList} setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 6 */}
      {/* --------------- */}
      {(role == 1 || role == 3) && step == 6 && hintList && (
        <DiscussJudgeAns theme={theme} answer={answer} setStep={setStep} />
      )}

      {/* --------------- */}
      {/* Step 7 */}
      {/* --------------- */}
      {step == 7 && (
        <Result theme={theme} answer={answer} isCorrect={isCorrect} />
      )}
    </>
  );
};

export default Game;
