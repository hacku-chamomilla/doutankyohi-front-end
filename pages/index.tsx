import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { QuestionOutlineIcon, StarIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
                      <Accordion defaultIndex={[0]}>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                1.ロールに関して
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            ゲーム開始時に、1人がゲッサー(回答者)、その他がヒントホルダー(ヒントを与える人)
                            のロールがそれぞれ与えられる。
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                2.お題の決め方
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>
                              ヒントホルダーは、お題となる単語をランダムで決定するか、自分たちで決定するかを選ぶことができる。
                            </p>
                            自分たちで決定する場合は、ヒントホルダーそれぞれが入力したお題の中からランダムで選ばれる。
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                3.ヒントの入力
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>
                              ヒントホルダーは、お題に関連する単語をそれぞれ入力する。
                            </p>
                            <p>
                              ヒントは1単語で入力する。お題が含まれた単語や英語訳等は避ける。
                            </p>
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                4.ヒントの削除
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>
                              ヒントを書き終わり次第、ヒントホルダーは話し合いを行う。
                            </p>
                            <p>
                              ヒントホルダー間で同じ又は類似したヒントがあった場合、そのヒントを削除する。
                            </p>
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                5.お題を推測
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>
                              残ったヒントから、ゲッサーはテーマを推測＆回答！
                            </p>
                            <p>当たれば正解！！おめでとう！</p>
                            <p>間違うと残念！公開処刑！</p>
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                6.次のフェイズへ
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            全員が回答者を1回ずつやることでワンセット終了
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </ModalBody>
                  </TabPanel>
                  <TabPanel>
                    <ModalBody>
                      <Accordion defaultIndex={[0]}>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                1.人狼
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            ヒントホルダーの中に「人狼」が存在するかもしれない(0~1人)
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                2.人狼の役割
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>
                              人狼はゲッサーに、正しい答えを導かせないようにする。
                            </p>
                            <p>
                              (全然違うヒントを出す、ほかのヒントの削除を狙うなど)
                            </p>
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                3.人狼をみつける
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>
                              正解/不正解の判定が行われた後に、ゲッサーが人狼をみつけるフェイズがある。
                            </p>
                            <p>
                              他のヒントホルダーとの話し合いを行い、人狼だと思うヒントホルダーを選択する。
                            </p>
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                4.得点
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>・ゲッサー正解&人狼推測成功: 村+3Pt</p>
                            <VSpacer size={2} />
                            <p>・ゲッサー正解&人狼推測失敗: 村+1Pt、人狼+1Pt</p>
                            <VSpacer size={2} />
                            <p>
                              ・ゲッサー不正解&人狼推測成功: 村+2Pt、人狼+1Pt
                            </p>
                            <VSpacer size={2} />
                            <p>・ゲッサー不正解&人狼推測失敗: 人狼+5Pt</p>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      <p></p>
                      <VSpacer size={2} />
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
