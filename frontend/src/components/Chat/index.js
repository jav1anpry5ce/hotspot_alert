import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Card, Button, Typography } from "antd";
import { TextArea } from "../PostCard/Elements";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setActiveKey } from "../../store/navSlice";
import { Back } from "./Elements";

const { Title, Text } = Typography;

export default function Chat({ match, socket }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const text = document.getElementById("text-message");

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
      if (message.user !== name) {
        setTyping(false);
      }
      setMessages((messages) => [...messages, message]);
    });

    socket.on("typing", (data) => {
      if (typing === false) {
        if (data.user !== name) {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
          }, 5000);
        }
      }
    });

    if (room) {
      socket.emit("join", { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }

    return () => {
      socket.emit("left");
      socket.off("typing");
      socket.off("message");
      socket.off("join");
    };
    // eslint-disable-next-line
  }, [match.params.room_id]);

  useEffect(() => {
    if (text) {
      text.addEventListener("keydown", function (event) {
        if (event.code === "Enter") {
          event.preventDefault();
          document.getElementById("send-message").click();
        }
      });
    }
  }, [text]);

  const onClick = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  const leave = () => {
    const con = window.confirm("Are you sure you want to leave the chat?");
    if (con) {
      window.history.back();
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 65 }}>
      <Card
        bordered={false}
        style={{
          marginTop: 5,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 5,
        }}
        headStyle={{ backgroundColor: "#383d42" }}
        title={
          <Title style={{ display: "inline-flex", color: "#fff" }} level={3}>
            <div style={{ display: "inline-flex" }}>
              {<Back style={{ marginTop: 3 }} onClick={leave} />}
              <Text style={{ color: "#fff", marginLeft: 15 }}>
                Emergency Chat
              </Text>
            </div>
          </Title>
        }
      >
        <Messages messages={messages} name={name} typing={typing} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextArea
            id="text-message"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={() => socket.emit("typing")}
          />
          <Button onClick={onClick} id="send-message">
            Send
          </Button>
        </div>
      </Card>
    </Container>
  );
}
