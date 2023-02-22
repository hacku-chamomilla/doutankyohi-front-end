import { NextRouter } from "next/router";

//FIXME: any の回避
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HandleError = (router: NextRouter, err: any) => {
  router.push({
    pathname: "/http-error",
    query: {
      message: err.message,
      name: err.name,
    },
  });
};
