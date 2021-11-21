import React from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Header, Content, Footer as F } from "rsuite";
import "./App.css";
import {
  Navbar,
  Home,
  Posts,
  Post,
  SignIn,
  ChangePassword,
  Wanted,
  MissingPerson,
  ForgotPassword,
  ResetPassword,
  AddAccount,
  AccountActivation,
  WantedPost,
  Chats,
  Chat,
  NotFoundPage,
  Copyright,
} from "./components";
import { io } from "socket.io-client";

axios.defaults.baseURL = "https://javaughnpryce.live:8002/";

const socket = io("https://javaughnpryce.live:6060");

if (!localStorage.getItem("user_key")) {
  const user_key = Math.floor(100000000 + Math.random() * 900000000);
  localStorage.setItem("user_key", user_key);
}

function App() {
  return (
    <Container className="App">
      <Router>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ backgroundColor: "rgba(31, 42, 61, 0.7)" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/post/:post_id" component={Post} />
            <Route exact path="/account/signin" component={SignIn} />
            <Route
              exact
              path="/account/change-password"
              component={ChangePassword}
            />
            <Route exact path="/wanted" component={Wanted} />
            <Route
              exact
              path="/account/forgot-password"
              component={ForgotPassword}
            />
            <Route
              exact
              path="/account/password/reset/:token"
              component={ResetPassword}
            />
            <Route exact path="/add-account" component={AddAccount} />
            <Route
              exact
              path="/account/activation/:activate/:token"
              component={AccountActivation}
            />
            <Route exact path="/missing-persons" component={MissingPerson} />
            <Route exact path="/wanted/post/:id" component={WantedPost} />
            <Route
              exact
              path="/chats"
              component={() => <Chats socket={socket} />}
            />
            <Route
              exact
              path="/chat/:room_id"
              component={(matchProps) => (
                <Chat {...matchProps} socket={socket} />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Content>
      </Router>
      <F>
        <Copyright />
      </F>
    </Container>
  );
}

export default App;
