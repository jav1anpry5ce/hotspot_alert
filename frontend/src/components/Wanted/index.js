import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Modal, Form, Input, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getWantedList,
  createWantedPerson,
  clearState,
} from "../../store/wantedSlice";
import Loading from "../Loading";
import { setActiveKey } from "../../store/navSlice";
import WantedPostCard from "../WantedPostCard";
import { openNotification } from "../../functions/Notification";
import { Typography } from "antd";
import ChatButton from "../ChatButton";
import { CustomButton } from "../Posts/Elements";

const { Title } = Typography;

export default function Wanted() {
  const auth = useSelector((state) => state.auth);
  const data = useSelector((state) => state.wanted);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [crime, setCrime] = useState("");
  const [reward, setReward] = useState("");
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const observer = useRef();

  useEffect(() => {
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
      form.setFieldsValue({
        name: "",
        crime: "",
        reward: "",
        image: "",
      });
      dispatch(clearState());
      setPage(1);
      showModal();
      setName("");
      setCrime("");
      setReward("");
      setImage(null);
    }
    if (data.message) {
      openNotification("error", "Error", data.message);
    }
    // eslint-disable-next-line
  }, [data.success, data.message]);

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
        if (image.size <= 71457280) {
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

  const lastPostElement = useCallback(
    (node) => {
      if (data.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.wantedList.next) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [data.loading, data.wantedList]
  );

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
        <Form layout="vertical" id="wanted-form" form={form}>
          <Form.Item
            required
            allowClear
            label="Name"
            style={{ marginBottom: 2 }}
            name="name"
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            required
            allowClear
            label="Crime"
            style={{ marginBottom: 2 }}
            name="crime"
          >
            <Input onChange={(e) => setCrime(e.target.value)} />
          </Form.Item>
          <Form.Item
            required
            allowClear
            label="Reward"
            style={{ marginBottom: 2 }}
            name="reward"
          >
            <Input
              type="number"
              min="1"
              max="999999999"
              onChange={(e) => setReward(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Photo(optional)"
            style={{ marginBottom: 2 }}
            name="image"
          >
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Item>
        </Form>
      </Modal>
      {auth.is_auth ? (
        <div>
          <CustomButton
            onClick={showModal}
            style={{ position: "fixed", right: 25, bottom: 30 }}
            shape="circle"
            size="large"
            icon={<PlusOutlined style={{ fontSize: 28, color: "white" }} />}
          />
          <ChatButton bottom={90} />
        </div>
      ) : (
        <ChatButton bottom={30} />
      )}
      <Stack spacing={1}>
        {data.results ? (
          data.results.map((person, index) => {
            if (data.results.length === index + 1) {
              return auth.is_auth ? (
                <div ref={lastPostElement} key={index}>
                  <WantedPostCard
                    id={person.id}
                    name={person.name}
                    image={person.wanted_image}
                    crime={person.crime}
                    reward={person.reward}
                    comments={person.comments}
                    visible={person.visible}
                    viewPost
                  />
                </div>
              ) : person.visible ? (
                <div ref={lastPostElement} key={index}>
                  <WantedPostCard
                    id={person.id}
                    name={person.name}
                    image={person.wanted_image}
                    crime={person.crime}
                    reward={person.reward}
                    comments={person.comments.slice(0, 5)}
                    visible={person.visible}
                    viewPost
                  />
                </div>
              ) : (
                <div ref={lastPostElement}></div>
              );
            } else {
              return auth.is_auth ? (
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
              ) : null;
            }
          })
        ) : (
          <Title style={{ color: "#fff", marginTop: 255 }} level={3}>
            Nothing has been posted.
          </Title>
        )}
      </Stack>
      {data.loading ? (
        data.results.length > 0 ? (
          <Spin
            size="medium"
            style={{ display: "flex", justifyContent: "center" }}
          />
        ) : (
          <Loading />
        )
      ) : null}
    </Container>
  );
}
