import React, { Dispatch, SetStateAction } from "react";

import { Avatar, HStack, Input, Text } from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";

type Props = {
  title: string;
  subtitle: string;
  nickname: string;
  placeholder: string;
  avatarList: string[];
  avatarIndex: number;
  setAvatarIndex: Dispatch<SetStateAction<number>>;
  setNickname: Dispatch<SetStateAction<string>>;
};

export const NNAndIcon = ({
  title,
  subtitle,
  nickname,
  placeholder,
  setNickname,
  avatarList,
  avatarIndex,
  setAvatarIndex,
}: Props) => {
  return (
    <>
      <Text fontSize="24">{title}</Text>
      <VSpacer size={2} />
      <Input
        w="50%"
        value={nickname}
        outlineColor="blue"
        placeholder={placeholder}
        size="lg"
        onChange={(event) => setNickname(event.target.value)}
      />
      <VSpacer size={8} />
      <Text fontSize="24">{subtitle}</Text>
      <VSpacer size={2} />
      <HStack>
        {avatarList.map((avatar, i) => {
          return (
            <>
              {avatarIndex === i ? (
                <Avatar
                  key={i}
                  src={avatar}
                  onClick={() => setAvatarIndex(i)}
                  _hover={{ cursor: "pointer" }}
                  borderWidth={3}
                  borderColor="blue"
                />
              ) : (
                <Avatar
                  key={i}
                  src={avatar}
                  onClick={() => setAvatarIndex(i)}
                />
              )}
            </>
          );
        })}
      </HStack>
    </>
  );
};
