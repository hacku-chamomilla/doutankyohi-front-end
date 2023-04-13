import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

import { BASE_URL } from "@/data/data";

const HttpError: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    toast({
      title: "エラーが起きました",
      position: "top",
      description: "ボタンを押してホームに戻ってください",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }, []);

  const returnHome = () => {
    router.push("/");
  };

  return (
    <>
      <VSpacer size={12} />
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Http Status Code is not 200
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          <Text>Error Name: {router.query.name}</Text>
          <Text>Error Message: {router.query.message}</Text>
        </AlertDescription>
      </Alert>
      <VSpacer size={12} />
      <Center>
        <Button
          minW={20}
          minH={16}
          outlineColor={"black"}
          colorScheme={"white"}
          textColor={"black"}
          fontSize="lg"
          onClick={returnHome}
        >
          Back to Home
        </Button>
      </Center>
    </>
  );
};

export default HttpError;
