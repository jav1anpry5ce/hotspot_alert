import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { Message as M, Text } from "./Elements";
import "./s.css";

const Messages = ({ messages, name, typing }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, index) => (
      <div key={index}>
        <Message message={message} name={name} />
      </div>
    ))}
    {typing ? (
      <M>
        <Text
          background="#2b2b2b"
          color="white"
          radius="14px 14px 14px 0"
          borderColor="#2b2b2b"
          fontSize="1rem"
        >
          typing...
        </Text>
      </M>
    ) : null}
  </ScrollToBottom>
);

export default Messages;
