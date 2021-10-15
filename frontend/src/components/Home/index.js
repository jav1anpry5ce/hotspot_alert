import React from "react";
import { Container } from "@mui/material";
import { Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

export default function index() {
  return (
    <Container
      maxWidth="xls"
      style={{ color: "#fff", height: "100vh", backgroundColor: "white" }}
    >
      <Title align="center">Welcome to Hotspot Alert</Title>
      <Text strong>
        Stay alerted about all crime and violence in your area.
      </Text>
    </Container>
  );
}
