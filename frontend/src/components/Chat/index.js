import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Container } from "@mui/material";
import { Card, Button, Typography } from "antd";
import { TextArea } from "../PostCard/Elements";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setActiveKey } from "../../store/navSlice";

const socket = io("javaughnpryce.live:5000");
const { Title } = Typography;

export default function Chat({ match }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let name;
  if (auth.is_auth) {
    name = "dispatcher";
  } else {
    name = `anonymous_user_${localStorage.getItem("user_key")}`;
  }

  const room = match.params.room_id;

  useEffect(() => {
    dispatch(setActiveKey("2"));
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    if (room) {
      socket.emit("join", { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
    return () => socket.emit("left");
    // eslint-disable-next-line
  }, [match.params.room_id]);

  window.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
      event.preventDefault();
      document.getElementById("send-message").click();
    }
  });

  const onClick = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <Container maxWidth="md">
      <Card
        bordered={false}
        style={{
          height: "90.5vh",
          marginTop: 7,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 7,
        }}
        headStyle={{ backgroundColor: "#383d42" }}
        title={
          <Title align="center" style={{ color: "#fff" }} level={3}>
            Emergency Chat
          </Title>
        }
      >
        <Messages messages={messages} name={name} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <TextArea
            onFocus={() => {
              window.scrollTo(1000, 0);
              document.body.scrollTop = 0;
            }}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={onClick} id="send-message">
            Send
          </Button>
        </div>
      </Card>
    </Container>
  );
}
