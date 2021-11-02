import { Button, Input, Form, Select } from "antd";

const { Option } = Select;

export const DispatcherAdminFields = ({
  setEmail,
  setUsername,
  setFirstName,
  setLastName,
  setStation,
  loading,
  form,
  onSubmit,
  accountType,
  setAdmin,
  isAdmin,
  stations,
  setAccount,
}) => {
  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      <Form.Item
        label="Email"
        name="email"
        style={{ marginBottom: 3 }}
        rules={[{ required: true, message: "Please enter a email!" }]}
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
        style={{ marginBottom: 3 }}
        rules={[{ required: true, message: "Please enter a username!" }]}
      >
        <Input onChange={(e) => setUsername(e.target.value)} allowClear />
      </Form.Item>
      <Form.Item
        label="First Name"
        name="first_name"
        style={{ marginBottom: 3 }}
        rules={[{ required: true, message: "Please enter a first name!" }]}
      >
        <Input onChange={(e) => setFirstName(e.target.value)} allowClear />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="last_name"
        style={{ marginBottom: accountType === "Admin" ? 3 : 13 }}
        rules={[{ required: true, message: "Please enter a last name!" }]}
      >
        <Input onChange={(e) => setLastName(e.target.value)} allowClear />
      </Form.Item>
      {accountType === "Admin" && (
        <Form.Item
          label="Station"
          name="station"
          style={{ marginBottom: 13 }}
          rules={[{ required: true, message: "Please select a station!" }]}
        >
          <Select onChange={(e) => setStation(e)}>
            {stations
              ? stations.map((station, index) => (
                  <Option key={index} value={station.name}>
                    {station.name}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
      )}
      {isAdmin ? setAdmin(true) : null}
      {isAdmin ? setAccount("Admin") : setAccount("Dispatcher")}
      <Form.Item style={{ marginBottom: 2 }}>
        <Button
          type="primary"
          htmlType="submit"
          disable={loading}
          loading={loading}
        >
          Add Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export const StationFields = ({
  setEmail,
  setUsername,
  loading,
  setFirstName,
  setStation,
  setImage,
  form,
  onSubmit,
  setAccount,
}) => {
  const setBoth = (e) => {
    setStation(e.target.value);
    setFirstName(e.target.value);
  };
  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      {setAccount("Station")}
      <Form.Item
        label="Email"
        name="email"
        style={{ marginBottom: 2 }}
        rules={[{ required: true, message: "Please enter a email!" }]}
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
        rules={[{ required: true, message: "Please enter a username!" }]}
      >
        <Input onChange={(e) => setUsername(e.target.value)} allowClear />
      </Form.Item>
      <Form.Item
        label="Station"
        name="station"
        style={{ marginBottom: 2 }}
        rules={[{ required: true, message: "Please enter a station!" }]}
      >
        <Input onChange={setBoth} allowClear />
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
          disable={loading}
          loading={loading}
        >
          Add Account
        </Button>
      </Form.Item>
    </Form>
  );
};
