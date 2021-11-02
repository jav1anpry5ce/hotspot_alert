import React, { useEffect, useState } from "react";
import { Container, Stack } from "@mui/material";
import { Card, Typography, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import create_UUID from "../../functions/CreateUUID";
import { setActiveKey } from "../../store/navSlice";

const { Title, Text } = Typography;

export default function Chats({ socket }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [rooms, setRooms] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    dispatch(setActiveKey("2"));
    if (auth.is_auth && auth.security_token) {
      setToken(auth.security_token);
    }
    if (auth.is_auth && token) {
      socket.emit("getRooms", { token });
    }
    socket.on("rooms", (rooms) => {
      setRooms(rooms.data);
    });
    socket.on("roomCreated", () => {
      if (auth.is_auth && token) {
        socket.emit("getRooms", { token });
      }
    });
    socket.on("You can update", () => {
      if (auth.is_auth && token) {
        socket.emit("getRooms", { token });
      }
    });
    return () => {
      socket.off("rooms.get");
      socket.off("roomCreated");
      socket.off("you can update");
    };
    // eslint-disable-next-line
  }, [auth.is_auth, token, auth.security_token]);
  return (
    <Container maxWidth="sm" style={{ marginTop: 65, marginBottom: 10 }}>
      {auth.is_auth ? (
        <Card
          style={{
            borderRadius: 7,
            marginTop: 7,
          }}
          bordered={false}
          headStyle={{ backgroundColor: "#383d42" }}
          title={
            <Title align="center" style={{ color: "#fff" }} level={3}>
              Emergencies
            </Title>
          }
        >
          <Stack spacing={2} style={{ height: "75vh", overflow: "auto" }}>
            {rooms
              ? rooms.map((room, index) => (
                  <Card
                    onClick={() => history.push(`/chat/${room.name}`)}
                    style={{ borderRadius: 7 }}
                    hoverable
                    key={index}
                  >
                    <Title level={5} style={{ fontSize: 14 }}>
                      Room Id: {room.name}
                    </Title>
                    <Text strong>Users active: </Text> <br />
                    {room.users.map((user) => (
                      <div>{user.name}</div>
                    ))}
                  </Card>
                ))
              : null}
          </Stack>
        </Card>
      ) : (
        <Card
          bordered={false}
          headStyle={{ backgroundColor: "#383d42" }}
          title={
            <Title align="center" style={{ color: "#fff" }} level={3}>
              Emergency Chat
            </Title>
          }
          style={{ marginTop: 135, backgroundColor: "rgba(255,255,255,0.7)" }}
        >
          <Title level={3} strong style={{ marginBottom: -11 }}>
            Feeling Unsafe?
          </Title>
          <br />
          <Text strong>
            Press the button below to start chatting with a dispatcher.
          </Text>
          <br />
          <br />
          <Button
            type="primary"
            onClick={() => history.push(`/chat/${create_UUID()}`)}
          >
            Start Chatting
          </Button>
        </Card>
      )}
    </Container>
  );
}
