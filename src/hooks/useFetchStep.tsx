import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { BASE_URL } from "@/data/BaseUrl";

import { RecoilRoom } from "@/store/Recoil";

import { HandleError } from "@/hooks/useError";

export const FetchStep = (
  StepToDetect: number,
  setStep: Dispatch<SetStateAction<number>>
) => {
  const router = useRouter();
  const room = useRecoilValue(RecoilRoom);

  axios
    .get(BASE_URL + "step", {
      params: { roomId: room.id },
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
