import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { QuestionOutlineIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
              <Tabs>
                <TabList>
                  <Tab>通常ルール</Tab>
                  <Tab>人狼ルール</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <ModalBody>
                      <p>
                        ゲーム開始時に、1人がゲッサー、その他がヒントホルダーのロールがそれぞれ与えられる。
                      </p>
                      <VSpacer size={2} />
                      <p>
                        ヒントホルダーは、お題となる単語をランダムで決定するか、自分たちで決定するかを選ぶことができる。
                        自分たちで決定する場合は、ヒントホルダーそれぞれが入力したお題の中からランダムで選ばれる。
                      </p>
                      <VSpacer size={2} />
                      <p>
                        ヒントホルダーは、お題となった単語に関連する単語をそれぞれ入力する。
                      </p>
                      <VSpacer size={2} />
                      <p>
                        ヒントを全員が書き終わり次第、ヒントホルダーは話し合いを行い、
                        ヒントホルダー間で同じ又は類似したヒントがあった場合、そのヒントを削除する。
                      </p>
                      <VSpacer size={2} />
                      <p>
                        残ったヒントから、ゲッサーはテーマを推測＆回答！
                        当たれば正解！うれしい、間違うと残念！公開処刑！
                      </p>
                      <VSpacer size={2} />
                      全員が回答者を1回ずつやることでワンセット終了
                    </ModalBody>
                  </TabPanel>
                  <TabPanel>
                    <ModalBody>
                      <p>
                        ヒントホルダーの中に「人狼」が存在するかもしれない(0~1人)
                      </p>
                      <VSpacer size={2} />
                      <p>
                        人狼はゲッサーのミスリードを誘う(全然違うヒントを出す)や、
                        ほかのヒントの削除を狙うなどして、正しい答えを導かせないようにする。
                      </p>
                      <VSpacer size={2} />
                      <p>
                        ゲッサーは、正解/不正解の判定が行われた後に人狼が誰かを当てるフェイズがある。
                      </p>
                      <VSpacer size={4} />
                      <Center> - 結果 -</Center>
                      <VSpacer size={4} />
                      <p>
                        回答者が正解しかつ人狼を見つけた場合(人狼が居なかった事を当てた場合も)、村+3ポイント
                      </p>
                      <VSpacer size={2} />
                      <p>
                        回答者が正解したが人狼をみつけられなかった場合、村+1ポイント、人狼+1ポイント
                      </p>
                      <VSpacer size={2} />
                      <p>
                        回答者が不正解だったが人狼を見つけた場合、村+2ポイント、
                        人狼+1ポイント(人狼が居ない事を当てた場合は村のみポイント)
                      </p>
                      <VSpacer size={2} />
                      <p>
                        回答者が不正解かつ人狼をみつけられなかった場合、人狼+5ポイント
                      </p>
                    </ModalBody>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <ModalFooter>
                <Button colorScheme="red" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Text fontSize="xs">How to play</Text>
        </VStack>
      </Box>

      <VSpacer size={20} />

      <Center>
        <VStack>
          <Image src="https://bit.ly/3SkQW8y" alt="TitleLogo" />
          <VSpacer size={36} />
          <Button
            leftIcon={<StarIcon />}
            rightIcon={<StarIcon />}
            h={"60px"}
            w={"270px"}
            as="i"
            colorScheme="red"
            color="white"
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
