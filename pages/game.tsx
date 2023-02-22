import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Answer } from "@/components/game/Answer";
import { DiscussJudgeAns } from "@/components/game/DiscussJudgeAns";
import { HowToDecideTheme } from "@/components/game/HowToDecideTheme";
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
    if (step === 6) {
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
    if (step === 7) {
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
  }, [room.id, router, step]);

  return (
    <>
      {role == 1 && step == 1 && <Wait setStep={setStep} />}
      {role == 1 && step == 5 && hintList && (
        <Answer hintList={hintList} setStep={setStep} />
      )}
      {(role == 1 || role == 3) && step == 6 && hintList && (
        <DiscussJudgeAns theme={theme} answer={answer} />
      )}
      {role == 2 && <HowToDecideTheme />}
      {role == 3 && <ThinkingTheme />}
    </>
  );
};

export default Game;
