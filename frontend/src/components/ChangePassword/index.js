import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Card, Typography, Button, Input, Form, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, clearState } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import { setActiveKey } from "../../store/navSlice";
import { openNotification } from "../../functions/Notification";

const { Title } = Typography;

export default function ChangePassword() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    dispatch(setActiveKey("7"));
    if (!auth.is_auth) {
      history.push("/account/signin");
    }
    if (auth.success) {
      history.push("/");
      openNotification(
        "success",
        "Success",
        "Password was successfully changed!"
      );
    }
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, [auth.is_auth, auth.success]);

  const onSubmit = () => {
    const data = {
      old_password: oldPassword,
      new_password: newPassword,
      con_password: confirmPassword,
    };
    dispatch(changePassword(data));
  };
  return (
    <Container maxWidth="sm" style={{ marginTop: 55 }}>
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
            label="Old Password"
            name="old_password"
            rules={[{ required: true, message: "Please input a password!" }]}
          >
            <Input.Password onChange={(e) => setOldPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 2 }}
            label="New Password"
            name="new password"
            rules={[{ required: true, message: "Please input a password!" }]}
          >
            <Input.Password onChange={(e) => setNewPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            rules={[
              { required: true, message: "Please input password again!" },
            ]}
          >
            <Input.Password
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 2 }}>
            <Button type="primary" htmlType="submit" loading={auth.loading}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
}
