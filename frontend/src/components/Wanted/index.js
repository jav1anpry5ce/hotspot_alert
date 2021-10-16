import React, { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Modal, Form, Input, Pagination } from "antd";
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
import WantedPostCard from "../WantedPostCard";
import { openNotification } from "../../functions/Notification";
import { Typography } from "antd";

const { Title } = Typography;

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
    dispatch(setActiveKey("5"));
    return () => dispatch(clearState());
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
      dispatch(getWantedList(page));
      showModal();
      setName("");
      setCrime("");
      setReward("");
      setImage(null);
    }
    if (data.vSuccess) {
      dispatch(clearState());
      dispatch(getWantedList(page));
    }
    if (data.message) {
      openNotification("error", "Error", data.message);
    }
    // eslint-disable-next-line
  }, [data.success, data.vSuccess, data.message]);

  const showModal = () => {
    setShow(!show);
  };

  const onSubmit = () => {
    if (name && crime && reward) {
      const data = {
        name,
        crime,
        reward,
        image,
      };
      if (image) {
        if (!image.size > 31457280) {
          dispatch(createWantedPerson(data));
        } else {
          openNotification("error", "Error", "Selected fill is too large.");
        }
      } else {
        dispatch(createWantedPerson(data));
      }
    } else {
      openNotification("error", "Error", "Please fill all required fields.");
    }
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
          <Form.Item
            required
            allowClear
            label="Name"
            style={{ marginBottom: 2 }}
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            required
            allowClear
            label="Crime"
            style={{ marginBottom: 2 }}
          >
            <Input onChange={(e) => setCrime(e.target.value)} />
          </Form.Item>
          <Form.Item
            required
            allowClear
            label="Reward"
            style={{ marginBottom: 2 }}
          >
            <Input
              type="number"
              min="1"
              max="999999999"
              onChange={(e) => setReward(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Photo(optional)" style={{ marginBottom: 2 }}>
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
          {data.wantedList.results.map((person, index) =>
            auth.is_auth ? (
              <WantedPostCard
                key={index}
                id={person.id}
                name={person.name}
                image={person.wanted_image}
                crime={person.crime}
                reward={person.reward}
                comments={person.comments}
                visible={person.visible}
                viewPost
              />
            ) : person.visible ? (
              <WantedPostCard
                key={index}
                id={person.id}
                name={person.name}
                image={person.wanted_image}
                crime={person.crime}
                reward={person.reward}
                comments={person.comments.slice(0, 5)}
                visible={person.visible}
                viewPost
              />
            ) : null
          )}
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
      ) : (
        <Title style={{ color: "#fff", marginTop: 255 }} level={3}>
          Nothing has been posted.
        </Title>
      )}
    </Container>
  );
}
