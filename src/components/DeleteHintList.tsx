import React from "react";

import {
  Avatar,
  Card,
  CardBody,
  Checkbox,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";
type Props = {
  hintList: {
    text: string;
    isSelect: boolean;
  }[];
};

export const DeleteHintList = ({ hintList }: Props) => {
  return (
    <>
      <VSpacer size={8} />
      <UnorderedList>
        {hintList.map((hint, i) => {
          return (
            <div key={i}>
              <Stack spacing="8">
                <Checkbox
                  size="lg"
                  colorScheme="orange"
                  onChange={() => {
                    hint.isSelect = !hint.isSelect;
                  }}
                >
                  <Card key={i}>
                    <CardBody>
                      <Avatar size="xs" src="https://bit.ly/broken-link" />
                      <text>{hint.text}</text>
                    </CardBody>
                  </Card>
                </Checkbox>
              </Stack>
              <VSpacer size={8} />
            </div>
          );
        })}
      </UnorderedList>
    </>
  );
};
