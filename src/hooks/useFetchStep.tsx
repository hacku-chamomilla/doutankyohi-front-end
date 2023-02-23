import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { BASE_URL } from "@/data/BaseUrl";

import { HandleError } from "@/hooks/useError";

export const FetchStep = (
  StepToDetect: number,
  setStep: Dispatch<SetStateAction<number>>,
  router: NextRouter,
  roomId: string
) => {
  axios
    .get(BASE_URL + "step", {
      params: { roomId: roomId },
    })
    .then((res) => {
      if (res.data === StepToDetect) {
        setStep(res.data);
      }
    })
    .catch((err) => {
      HandleError(router, err);
    });
};
