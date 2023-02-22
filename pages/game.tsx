import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Answer } from "@/components/game/Answer";
import { HowToDecideTheme } from "@/components/game/HowToDecideTheme";
import { ThinkingTheme } from "@/components/game/ThinkingTheme";
import { Wait } from "@/components/game/Wait";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilPlayer } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

const Game: NextPage = () => {
  const router = useRouter();
  const player = useRecoilValue(RecoilPlayer);
  const [role, setRole] = useState<number>();
  const [step, setStep] = useState<number>(1); // /game に最初に到達する時点でstep=1が保証されている(はず)

  const exampleAnswerHintList = [
    { text: "ジャッカル", isDelete: true },
    { text: "ジャッカル", isDelete: true },
    { text: "かいぎしつ", isDelete: false },
  ];
  // eslint-disable-next-line no-console
  console.log(`----------\nplayerId: ${player.id}\n----------`); // TODO 作業用のログ, いつかは消す

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

  return (
    <>
      {role == 1 && step == 1 && <Wait setStep={setStep} />}
      {role == 1 && step == 6 && <Answer hintList={exampleAnswerHintList} />}
      {role == 2 && <HowToDecideTheme />}
      {role == 3 && <ThinkingTheme />}
    </>
  );
};

export default Game;
