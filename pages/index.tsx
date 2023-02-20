import { QuestionOutlineIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Icon
        pos="absolute"
        top="4"
        right="7"
        as={QuestionOutlineIcon}
        boxSize={6}
        onClick={onOpen}
        _hover={{ cursor: "pointer" }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ゲームのルール</ModalHeader>
          <ModalCloseButton />
          <ModalBody>ゲームのルールの詳細をここに入れる</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text fontSize="xs" pos="absolute" top="10" right="3">
        How to play
      </Text>

      <Text fontSize="3xl" pos="absolute" top="200" left="100">
        タイトルロゴ
      </Text>
      {/* ここはロゴ作って差し替えたい */}
      <Button
        pos="absolute"
        top="450"
        left="61"
        h={"60px"}
        w={"270px"}
        colorScheme="blue"
        onClick={() => {
          router.push("/start-game");
        }}
      >
        START
      </Button>
    </>
  );
};

export default Home;
