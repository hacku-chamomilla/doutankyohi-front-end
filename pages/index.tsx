import { QuestionOutlineIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import {
  Box,
  Button,
  Center,
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
  VStack,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

const Home: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VSpacer size={4} />
      <Box display="flex" justifyContent="flex-end">
        <VStack>
          <Icon
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
                <Button colorScheme="blue" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Text fontSize="xs">How to play</Text>
        </VStack>
      </Box>

      <VSpacer size={40} />

      <Center>
        <VStack>
          {/* TODO: ここはロゴ作って差し替えたい */}
          <Text fontSize="3xl">タイトルロゴ</Text>
          <VSpacer size={36} />
          <Button
            h={"60px"}
            w={"270px"}
            colorScheme="blue"
            onClick={() => {
              router.push("/start-game");
            }}
          >
            START
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default Home;
