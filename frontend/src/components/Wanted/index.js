import React, { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import {
  Button,
  Modal,
  Form,
  Input,
  Pagination,
  Image,
  Card,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getWantedList,
  createWantedPerson,
  clearState,
} from "../../store/wantedSlice";
import Loading from "../Loading";
import { useHistory } from "react-router-dom";
import { setActiveKey } from "../../store/navSlice";

const { Text, Paragraph, Title } = Typography;

export default function Wanted() {
  const auth = useSelector((state) => state.auth);
  const data = useSelector((state) => state.wanted);
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [crime, setCrime] = useState("");
  const [reward, setReward] = useState("");
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getWantedList(page));
    dispatch(setActiveKey("2"));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getWantedList(page));
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (data.success) {
      document.getElementById("wanted-form").reset();
      dispatch(clearState());
      dispatch(getWantedList(1));
      showModal();
    }
    // eslint-disable-next-line
  }, [data.success]);

  const showModal = () => {
    setShow(!show);
  };

  const onSubmit = () => {
    const data = {
      name,
      crime,
      reward,
      image,
    };
    dispatch(createWantedPerson(data));
  };

  const handelPageChange = (page) => {
    setPage(page);
    history.push(`?page=${page}`);
  };

  if (data.loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="sm">
      <Modal
        visible={show}
        onCancel={() => setShow(!show)}
        style={{ borderRadius: 26 }}
        title="Create a Wanted Poster"
        footer={[
          <Button
            key="back"
            onClick={() => setShow(false)}
            disabled={data.wLoading}
          >
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={data.wLoading}
            onClick={onSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical" id="wanted-form">
          <Form.Item label="Name" style={{ marginBottom: 2 }}>
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Crime" style={{ marginBottom: 2 }}>
            <Input onChange={(e) => setCrime(e.target.value)} />
          </Form.Item>
          <Form.Item label="Reward" style={{ marginBottom: 2 }}>
            <Input onChange={(e) => setReward(e.target.value)} />
          </Form.Item>
          <Form.Item label="Reward" style={{ marginBottom: 2 }}>
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Item>
        </Form>
      </Modal>
      {auth.is_auth ? (
        <Button
          onClick={showModal}
          style={{ position: "fixed", right: 20, bottom: 55, zIndex: 1 }}
          type="primary"
          shape="circle"
          size="large"
          icon={<PlusOutlined style={{ fontSize: 28 }} />}
        />
      ) : null}
      {data.wantedList ? (
        <Stack spacing={1}>
          {data.wantedList.results.map((person) => (
            <Card
              style={{ marginTop: 11 }}
              bordered={false}
              headStyle={{ backgroundColor: "#383d42" }}
              title={
                <Title style={{ color: "white" }} align="center">
                  Wanted
                </Title>
              }
            >
              <Paragraph>
                <Title level={3}>{person.name}</Title>
                <Image src={person.wanted_image} />
                <Text strong>Crime: {person.crime}</Text> <br />
                <Text strong>Reward: {person.reward}</Text>
              </Paragraph>
            </Card>
          ))}
          <Pagination
            hideOnSinglePage
            showSizeChanger={false}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 25,
            }}
            onChange={handelPageChange}
            current={page}
            total={data.wantedList ? data.wantedList.count : 0}
          />
        </Stack>
      ) : null}
    </Container>
  );
}
