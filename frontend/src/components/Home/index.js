import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Typography, Card } from "antd";
import { useDispatch } from "react-redux";
import { setActiveKey } from "../../store/navSlice";
import ChatButton from "../ChatButton";
import image from "../../images/person.jpg";
import { Image } from "./Elements";

import { Title, Text, Paragraph } from "./Elements";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveKey("1"));
    // eslint-disable-next-line
  }, []);
  return (
    <Container
      maxWidth="xls"
      style={{
        color: "#fff",
        height: "150%",
        // backgroundColor: "rgba(80,102,141,0.8)",
        backgroundImage: `url(${image})`,
        backgroundSize: "auto",
      }}
    >
      <Container maxWidth="md">
        <ChatButton bottom={20} />
        <Title align="center" style={{ color: "white" }}>
          Welcome to Hotspot Alert
        </Title>
        <Paragraph>
          <Text strong style={{ color: "white", fontSize: 22 }}>
            Hotspot Alert is a community base web application for Jamaican
            citizens that allows locals to expose and post not only information
            regarding criminal activities, but missing persons as well. The
            users of this platform are able to post these activities anonymously
            without victims having to go through the effects of victim blaming,
            bystanders lives being put at risk and allow information of
            perpetrators conducting such crimes to be posted instantly and
            widespread through the community platform.
          </Text>
        </Paragraph>
        <Paragraph>
          <Text strong style={{ color: "white", fontSize: 22 }}>
            Hotspot Alert’s main goal is to create a safe place for victims and
            bystanders to post/report a crime instantly which could save lives
            of not only the victim but the individuals who make these reports,
            which could in turn allow for capture of the assailant before they
            get their hands on a next victim which would like result in reducing
            the crime rate.
          </Text>
        </Paragraph>
      </Container>
    </Container>
  );
}
