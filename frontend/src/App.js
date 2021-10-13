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
import Wanted from "./components/Wanted";
import MissingPerson from "./components/MissingPerson";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AddAccount from "./components/AddAccount";
import AccountActivation from "./components/AccountActivation";
import image from "./images/justice.jpeg";

axios.defaults.baseURL = "http://javaughnpryce.live:8000/";

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
          </Content>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
