import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Card, Typography, Button, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { register, clearState } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import { setActiveKey } from "../../store/navSlice";
import { openNotification } from "../../functions/Notification";

const { Title } = Typography;

export default function AddAccount() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(setActiveKey("6"));
    if (!auth.is_admin) {
      history.push("/");
    }
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, [auth.is_admin]);

  useEffect(() => {
    if (auth.success) {
      form.setFieldsValue({
        email: "",
        username: "",
        station: "",
        image: "",
      });
      openNotification("success", "Success", "Account created successfully.");
    }
    // eslint-disable-next-line
  }, [auth.success]);

  const onSubmit = () => {
    const data = {
      email,
      username,
      name,
      image,
    };
    dispatch(register(data));
    dispatch(clearState());
  };

  return (
    <Container maxWidth="sm">
      <Card
        style={{ borderRadius: 7, marginTop: 35 }}
        bordered={false}
        headStyle={{ backgroundColor: "#383d42" }}
        title={
          <Title style={{ color: "#fff" }} level={3}>
            Add An Account
          </Title>
        }
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item
            label="Email"
            name="email"
            style={{ marginBottom: 2 }}
            rules={[{ required: true, message: "Please a email!" }]}
          >
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            style={{ marginBottom: 2 }}
            rules={[{ required: true, message: "Please a username!" }]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} allowClear />
          </Form.Item>
          <Form.Item
            label="Station"
            name="station"
            style={{ marginBottom: 2 }}
            rules={[{ required: true, message: "Please a station!" }]}
          >
            <Input onChange={(e) => setName(e.target.value)} allowClear />
          </Form.Item>
          <Form.Item
            label="Station Picture"
            name="picture"
            style={{ marginBottom: 13 }}
            rules={[{ required: true, message: "Please select a photo!" }]}
          >
            <Input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              allowClear
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 2 }}>
            <Button type="primary" htmlType="submit" loading={auth.loading}>
              Add Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
}
