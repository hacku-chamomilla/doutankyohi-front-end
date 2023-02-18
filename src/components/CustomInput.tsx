import React, { Dispatch, SetStateAction } from "react";

import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Input,
  Text,
} from "@chakra-ui/react";

import { VSpacer } from "@/components/common/Spacer";
type Props = {
  title: string;
  placeholder: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

export const CustomInput = ({ title, placeholder, text, setText }: Props) => {
  return (
    <>
      <Text fontSize="xl">{title}</Text>
      <VSpacer size={8} />
      <Input
        value={text}
        placeholder={placeholder}
        size="lg"
        onChange={(event) => setText(event.target.value)}
      />
    </>
  );
};
