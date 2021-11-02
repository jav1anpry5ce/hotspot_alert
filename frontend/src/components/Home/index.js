import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveKey } from "../../store/navSlice";
import ChatButton from "../ChatButton";

import { Title, Paragraph } from "./Elements";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveKey("1"));
    // eslint-disable-next-line
  }, []);
  return (
    <Container maxWidth="xls">
      <Container maxWidth="md" style={{ marginTop: 35 }}>
        <ChatButton bottom={20} />
        <Title align="center" style={{ color: "white", marginTop: 60 }}>
          Welcome to Hotspot Alert
        </Title>
        <Paragraph strong style={{ color: "white", fontSize: 20 }}>
          Hotspot Alert is a community base web application for Jamaican
          citizens that allows locals to expose and post not only information
          regarding criminal activities, but missing persons as well. The users
          of this platform are able to post these activities anonymously without
          victims having to go through the effects of victim blaming, bystanders
          lives being put at risk and allow information of perpetrators
          conducting such crimes to be posted instantly and widespread through
          the community platform.
        </Paragraph>
        <Paragraph strong style={{ color: "white", fontSize: 20 }}>
          Hotspot Alert’s main goal is to create a safe place for victims and
          bystanders to post/report a crime instantly which could save lives of
          not only the victim but the individuals who make these reports, which
          could in turn allow for capture of the assailant before they get their
          hands on a next victim which would like result in reducing the crime
          rate.
        </Paragraph>
      </Container>
    </Container>
  );
}
