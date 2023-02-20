import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import React from "react";

import { IconButton } from "@chakra-ui/react";

type Props = {
  pass: string;
};

export const PageBackIcon = ({ pass }: Props) => {
  const router = useRouter();
  return (
    <>
      <IconButton
        colorScheme="gray"
        icon={<ArrowBackIcon />}
        isRound={true}
        aria-label={"homeBack"}
        onClick={() => {
          router.push(pass);
        }}
      />
    </>
  );
};
