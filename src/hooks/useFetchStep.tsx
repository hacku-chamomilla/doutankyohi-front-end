import axios from "axios";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import { BASE_URL } from "@/data/data";

import { HandleError } from "@/hooks/useError";

export const FetchStep = (
  setStep: Dispatch<SetStateAction<number>>,
  router: NextRouter,
  roomId: string
) => {
  axios
    .get(BASE_URL + "step", {
      params: { roomId: roomId },
    })
    .then((res) => {
      setStep(res.data);
    })
    .catch((err) => {
      HandleError(router, err);
    });
};
