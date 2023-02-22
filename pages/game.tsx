import axios from "axios";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { HowToDecideTheme } from "@/components/game/HowToDecideTheme";
import { ThinkingTheme } from "@/components/game/ThinkingTheme";
import { Wait } from "@/components/game/Wait";

import { RecoilPlayer } from "@/store/Recoil";

import { BASE_URL } from "../src/data/BaseUrl";

const Game: NextPage = () => {
  const player = useRecoilValue(RecoilPlayer);
  const [role, setRole] = useState<number>();

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
        console.log(err);
      });
  }, []);

  return (
    <>
      {role == 1 && <Wait />}
      {role == 2 && <HowToDecideTheme />}
      {role == 3 && <ThinkingTheme />}
    </>
  );
};

export default Game;
