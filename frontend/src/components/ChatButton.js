import React from "react";
import { Button } from "antd";
import { MessageFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export default function ChatButton({ bottom }) {
  const history = useHistory();
  return (
    <Button
      onClick={() => history.push("/chats")}
      style={{
        position: "fixed",
        right: 20,
        bottom: bottom,
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.0)",
        border: "none",
      }}
      shape="circle"
      size="large"
      icon={<MessageFilled style={{ fontSize: 38, color: "#5e99e6" }} />}
    />
  );
}
