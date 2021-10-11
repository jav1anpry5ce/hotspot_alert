import React from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Header, Content } from "rsuite";
import { BackTop } from "antd";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Post from "./components/Post";
import SignIn from "./components/SignIn";
import ChangePassword from "./components/ChangePassword";
import image from "./images/justice.jpeg";

axios.defaults.baseURL = "http://192.168.0.200:8000/";

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
            <Route exact path="/post/:post_id" component={Post} />
            <Route exact path="/account/signin" component={SignIn} />
            <Route
              exact
              path="/account/change-password"
              component={ChangePassword}
            />
          </Content>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
