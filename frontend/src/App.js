import React from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Header, Content } from "rsuite";
import { BackTop } from "antd";
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
} from "./components";

import image from "./images/justice.jpeg";

axios.defaults.baseURL = "http://javaughnpryce.live:8000/";

if (!localStorage.getItem("user_key")) {
  const user_key = Math.floor(100000000 + Math.random() * 900000000);
  localStorage.setItem("user_key", user_key);
}

function App() {
  return (
    <Container
      className="App"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Router>
        <Header>
          <Navbar />
        </Header>
        <Switch>
          <Content style={{ overflow: "auto" }}>
            <BackTop />
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
            <Route exact path="/chats" component={Chats} />
            <Route exact path="/chat/:room_id" component={Chat} />
          </Content>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
