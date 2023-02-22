import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

const HttpError: NextPage = () => {
  const router = useRouter();
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
    </>
  );
};

export default HttpError;
