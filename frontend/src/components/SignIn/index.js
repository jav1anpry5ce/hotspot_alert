import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Card, Typography, Button, Input, Form, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, clearState } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import { setActiveKey } from "../../store/navSlice";

const { Title } = Typography;

export default function SignIn() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.is_auth) {
      history.push("/posts");
    }
    dispatch(setActiveKey(""));
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, [auth.is_auth]);

  const onSubmit = () => {
    const data = {
      username,
      password,
    };
    dispatch(login(data));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 55 }}>
      <Card
        style={{ borderRadius: 7, marginTop: 35 }}
        bordered={false}
        headStyle={{ backgroundColor: "#383d42" }}
        title={
          <Title style={{ color: "#fff" }} level={3}>
            Sign In
          </Title>
        }
      >
        {auth.message ? <Alert message={auth.message} type="error" /> : null}
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            style={{ marginBottom: 2 }}
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item
            style={{ display: "flex", marginBottom: 13 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit" loading={auth.loading}>
                Sign In
              </Button>
              <Button
                onClick={() => history.push("/account/forgot-password")}
                disabled={auth.loading}
              >
                Forgot Password?
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
}
