import React from "react";
import { MessageFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { CustomButton } from "./Posts/Elements";

export default function ChatButton({ bottom }) {
  const history = useHistory();
  return (
    <CustomButton
      onClick={() => history.push("/chats")}
      style={{
        position: "fixed",
        right: 25,
        bottom: bottom,
      }}
      shape="circle"
      size="large"
      type="ghost"
      icon={<MessageFilled style={{ fontSize: 22, color: "white" }} />}
    />
  );
}
