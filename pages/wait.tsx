import type { NextPage } from "next";
import React from "react";
import { useRecoilValue } from "recoil";

import { playerId } from "@/store/Recoil";

const Wait: NextPage = () => {
  const _ = useRecoilValue(playerId);
  return <p>/wait {_.id}</p>;
};

export default Wait;
