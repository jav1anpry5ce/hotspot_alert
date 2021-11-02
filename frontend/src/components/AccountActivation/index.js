import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Card, Typography, Button, Input, Form, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { activate, clearState } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import { setActiveKey } from "../../store/navSlice";
import { openNotification } from "../../functions/Notification";

const { Title } = Typography;

export default function AccountActivation({ match }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  useEffect(() => {
    dispatch(setActiveKey(""));
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auth.success) {
      history.push("/account/signin");
      openNotification("success", "Success", "Account Successfully Activated.");
    }
    // eslint-disable-next-line
  }, [auth.success]);

  const onSubmit = () => {
    const data = {
      activate: match.params.activate,
      token: match.params.token,
      password,
      con_password: conPassword,
    };
    dispatch(activate(data));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 65 }}>
      <Card
        style={{ borderRadius: 7, marginTop: 35 }}
        bordered={false}
        headStyle={{ backgroundColor: "#383d42" }}
        title={
          <Title style={{ color: "#fff" }} level={3}>
            Activate Account
          </Title>
        }
      >
        {auth.message ? <Alert message={auth.message} type="error" /> : null}
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            style={{ marginBottom: 2 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input a password!" }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 13 }}
            label="Confirm Password"
            name="con_password"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password onChange={(e) => setConPassword(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 2 }}>
            <Button type="primary" htmlType="submit" loading={auth.loading}>
              Activate Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
}
