import React, { Dispatch, SetStateAction } from "react";

import { Avatar, HStack, Image, Input, Text } from "@chakra-ui/react";

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
      <HStack>
        <Image boxSize={6} src="https://bit.ly/3ItzWsi" alt="deco3" />
        <Text fontSize="24">{title}</Text>
      </HStack>
      <VSpacer size={2} />
      <Input
        w="85%"
        value={nickname}
        outlineColor="seagreen"
        placeholder={placeholder}
        size="lg"
        onChange={(event) => setNickname(event.target.value)}
      />
      <VSpacer size={8} />
      <HStack>
        <Image boxSize={6} src="https://bit.ly/3ItzWsi" alt="deco3" />
        <Text fontSize="24">{subtitle}</Text>
      </HStack>
      <VSpacer size={2} />
      <HStack>
        {avatarList.map((avatar, i) => {
          return (
            <div key={i}>
              {avatarIndex === i ? (
                <Avatar
                  src={avatar}
                  onClick={() => setAvatarIndex(i)}
                  _hover={{ cursor: "pointer" }}
                  borderWidth={3}
                  borderColor="blue"
                />
              ) : (
                <Avatar src={avatar} onClick={() => setAvatarIndex(i)} />
              )}
            </div>
          );
        })}
      </HStack>
    </>
  );
};
