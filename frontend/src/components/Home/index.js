import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { setActiveKey } from "../../store/navSlice";
import ChatButton from "../ChatButton";

const { Title, Text } = Typography;

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveKey("1"));
    // eslint-disable-next-line
  }, []);
  return (
    <Container
      maxWidth="xls"
      style={{ color: "#fff", height: "100vh", backgroundColor: "white" }}
    >
      <ChatButton bottom={20} />
      <Title align="center">Welcome to Hotspot Alert</Title>
      <Text strong>
        Stay alerted about all crime and violence in your area.
      </Text>
    </Container>
  );
}
