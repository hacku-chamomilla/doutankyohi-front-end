import React, { Dispatch, SetStateAction } from "react";

import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

type Props = {
  title: string;
  subtitle: string;
  nickName: string;
  placeholder: string;
  avatarList: string[];
  setAvatarIndex: Dispatch<SetStateAction<number>>;
  setNickName: Dispatch<SetStateAction<string>>;
};

export const NNAndIcon = ({
  title,
  subtitle,
  nickName,
  placeholder,
  setNickName,
  avatarList,
  setAvatarIndex,
}: Props) => {
  return (
    <>
      <Text fontSize="24">{title}</Text>
      <VSpacer size={2} />
      <InputGroup>
        <Input
          w="100%"
          value={nickName}
          outlineColor="blue"
          placeholder={placeholder}
          size="lg"
          onChange={(event) => setNickName(event.target.value)}
        />
        <InputRightElement height="100%" width="10%">
          <Button
            h="100%"
            w="100%"
            textColor={"black"}
            colorScheme="blue"
            variant="solid"
          >
            決定
          </Button>
        </InputRightElement>
      </InputGroup>
      <VSpacer size={8} />
      <Text fontSize="24">{subtitle}</Text>
      <VSpacer size={2} />
      <HStack>
        {avatarList.map((avatar, i) => {
          return (
            <>
              <IconButton
                aria-label="Avatar"
                icon={<Avatar key={i} src={avatar} />}
                onClick={() => setAvatarIndex(i)}
              />
            </>
          );
        })}
      </HStack>
    </>
  );
};
