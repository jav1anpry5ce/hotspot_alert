import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Card, Typography, Button, Input, Form, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetRequest, clearState } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import { setActiveKey } from "../../store/navSlice";
import { openNotification } from "../../functions/Notification";

const { Title } = Typography;

export default function ForgotPassword() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(setActiveKey(""));
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auth.success) {
      form.setFieldsValue({
        username: "",
        email: "",
      });
      openNotification(
        "success",
        "Success",
        "An email as been sent with your reset link."
      );
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [auth.success]);

  const onSubmit = () => {
    const data = {
      email,
      username,
    };
    dispatch(resetRequest(data));
  };

  return (
    <Container maxWidth="sm">
      <Card
        style={{ borderRadius: 7, marginTop: 35 }}
        bordered={false}
        headStyle={{ backgroundColor: "#383d42" }}
        title={
          <Title style={{ color: "#fff" }} level={3}>
            Forgot Password
          </Title>
        }
      >
        {auth.message ? <Alert message={auth.message} type="error" /> : null}
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <Form.Item
            label="Username"
            name="username"
            style={{ marginBottom: 2 }}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            style={{ marginBottom: 15 }}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              allowClear
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit" loading={auth.loading}>
                Submit
              </Button>
              <Button
                onClick={() => history.push("/account/signin")}
                disabled={auth.loading}
              >
                Return to Sign In
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
}
