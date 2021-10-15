import React from "react";
import { Message as M, Text } from "./Elements";

export default function Message({ message: { text, user }, name }) {
  return (
    <M justify={user === name ? "flex-end" : "flex-start"}>
      <Text
        background={user === name ? "#1b5f94" : "#2b2b2b"}
        color={user === name ? "white" : "white"}
        radius={user === name ? "14px 14px 0 14px" : "14px 14px 14px 0"}
        borderColor={user === name ? "#1b5f94" : "#2b2b2b"}
      >
        {text}
      </Text>
    </M>
  );
}
