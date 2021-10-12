import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Card, Typography, Button, Input, Form, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearState } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import { setActiveKey } from "../../store/navSlice";
import { openNotification } from "../../functions/Notification";

const { Title } = Typography;

export default function ResetPassword({ match }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  useEffect(() => {
    dispatch(setActiveKey(""));
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auth.success) {
      history.push("/account/signin");
      openNotification(
        "success",
        "Success",
        "Your password has been successfully reset."
      );
    }
    // eslint-disable-next-line
  }, [auth.success]);

  const onSubmit = () => {
    const data = {
      reset_token: match.params.token,
      new_password: newPassword,
      con_password: conPassword,
    };
    dispatch(resetPassword(data));
  };

  return (
    <Container maxWidth="sm">
      <Card
        style={{ borderRadius: 7, marginTop: 35 }}
        bordered={false}
        headStyle={{ backgroundColor: "#383d42" }}
        title={
          <Title style={{ color: "#fff" }} level={3}>
            Change Password
          </Title>
        }
      >
        {auth.message ? <Alert message={auth.message} type="error" /> : null}
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            style={{ marginBottom: 2 }}
            label="New Password"
            name="new_password"
            rules={[{ required: true, message: "Please input a password!" }]}
          >
            <Input.Password onChange={(e) => setNewPassword(e.target.value)} />
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
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
}
