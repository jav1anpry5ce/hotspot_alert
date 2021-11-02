import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Card, Typography, Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { register, clearState, getStations } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import { setActiveKey } from "../../store/navSlice";
import { openNotification } from "../../functions/Notification";
import { StationFields, DispatcherAdminFields } from "./AccountFields";

const { Title } = Typography;
const { Option } = Select;

const data = [
  { label: "Admin", value: "Admin" },
  { label: "Dispatcher", value: "Dispatcher" },
  { label: "Station", value: "Station" },
];

export default function AddAccount() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [station, setStation] = useState("");
  const [image, setImage] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [accountType, setAccountType] = useState();
  const [account, setAccount] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(setActiveKey("6"));
    dispatch(getStations());
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
        first_name: "",
        last_name: "",
        station: "",
        image: null,
      });
      openNotification("success", "Success", "Account created successfully.");
      dispatch(clearState());
      dispatch(getStations());
      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setImage(null);
      setAdmin(false);
      setStation("");
      setAccount("");
    }
    if (auth.message) {
      openNotification("error", "Error", auth.message);
    }
    // eslint-disable-next-line
  }, [auth.success, auth.message]);

  const onSubmit = () => {
    const data = {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      station,
      image,
      is_admin: admin,
      account_type: account,
    };
    dispatch(register(data));
  };

  const getAccountType = () => {
    switch (accountType) {
      case "Dispatcher":
        return (
          <DispatcherAdminFields
            accountType={accountType}
            setEmail={setEmail}
            setUsername={setUsername}
            form={form}
            loading={auth.loading}
            setFirstName={setFirstName}
            setLastName={setLastName}
            onSubmit={onSubmit}
            setAccount={setAccount}
          />
        );
      case "Station":
        return (
          <StationFields
            setEmail={setEmail}
            setUsername={setUsername}
            form={form}
            loading={auth.loading}
            setStation={setStation}
            setFirstName={setFirstName}
            setImage={setImage}
            onSubmit={onSubmit}
            setAccount={setAccount}
          />
        );
      case "Admin":
        return (
          <DispatcherAdminFields
            accountType={accountType}
            setEmail={setEmail}
            setUsername={setUsername}
            form={form}
            loading={auth.loading}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setStation={setStation}
            setAdmin={setAdmin}
            stations={auth.stations}
            isAdmin
            onSubmit={onSubmit}
            setAccount={setAccount}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 65 }}>
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
        <Form layout="vertical">
          <Form.Item
            style={{ marginBottom: 3 }}
            label="Select account type"
            required
          >
            <Select
              style={{ borderRadius: 30, width: "100%" }}
              onChange={(e) => setAccountType(e)}
            >
              {data.map((data, index) => (
                <Option key={index} value={data.value}>
                  {data.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        {getAccountType()}

        {/* <Form layout="vertical" form={form} onFinish={onSubmit}>
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
            <Button
              type="primary"
              htmlType="submit"
              disable={auth.loading}
              loading={auth.loading}
            >
              Add Account
            </Button>
          </Form.Item>
        </Form> */}
      </Card>
    </Container>
  );
}
