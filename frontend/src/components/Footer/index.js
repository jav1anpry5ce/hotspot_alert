import React from "react";
import { Container, Title, Text } from "./Elements";
import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <Container>
      <Grid container direction="row" rowSpacing={2} align="center">
        <Grid item xs={4}>
          <Title>Hi</Title>
          <Text>Hello</Text>
        </Grid>
        <Grid item xs={4}>
          <Title>Hi</Title>
        </Grid>
        <Grid item xs={4}>
          <Title>Hi</Title>
        </Grid>
      </Grid>
    </Container>
  );
}
