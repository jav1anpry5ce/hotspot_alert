import React, { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Modal, Select, Form, Input, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getPosts,
  createPost,
  clearState,
  resetSuccess,
} from "../../store/postSlice";
import { openNotification } from "../../functions/Notification";
import { setActiveKey } from "../../store/navSlice";
import PostCard from "../PostCard";
import Loading from "../Loading";

const { Option } = Select;
const { TextArea } = Input;

const crimeData = [
  { label: "Burglary", value: "Burglary" },
  { label: "Shooting", value: "Shooting" },
  { label: "Theft", value: "Theft" },
  { label: "Car Theft", value: "Car Theft" },
  { label: "Rape", value: "Rape" },
  { label: "Abduction", value: "Abduction" },
  { label: "Murder", value: "Murder" },
  { label: "Physical Abuse", value: "Physical Abuse" },
  { label: "Domestic Abuse", value: "Domestic Abuse" },
];

export default function Posts() {
  const data = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPosts(page));
    dispatch(setActiveKey("3"));
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getPosts(page));
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (data.success) {
      dispatch(clearState());
      dispatch(getPosts(1));
      showModal();
      setTitle("");
      setDescription("");
      setOption1("");
      setOption2("");
      setOption3("");
      setImage(null);
      openNotification("success", "Success", "Post created!");
    }
    if (data.message) {
      openNotification("error", "Error", data.message);
    }
    if (data.vSuccess) {
      dispatch(resetSuccess());
      dispatch(getPosts(1));
    }
    // eslint-disable-next-line
  }, [data.success, data.message, data.vSuccess]);

  const showModal = () => {
    setShow(!show);
  };

  const onSubmit = () => {
    if (title && description) {
      if (title === "Car Theft") {
        if (option1 && option2 && option3 && image) {
          const data = {
            title,
            description,
            image,
            option1,
            option2,
            option3,
          };
          dispatch(createPost(data));
        } else {
          openNotification("error", "Error", "Please fill out all fields.");
        }
      } else {
        const data = {
          title,
          description,
          image,
          option1,
          option2,
          option3,
        };
        dispatch(createPost(data));
      }
    } else {
      openNotification("error", "Error", "Please fill out all fields.");
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
        title="Create a Post"
        footer={[
          <Button
            key="back"
            onClick={() => setShow(false)}
            disabled={data.cLoading}
          >
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={data.cLoading}
            onClick={onSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Type of Report" style={{ marginBottom: 2 }}>
            <Select style={{ borderRadius: 30 }} onChange={(e) => setTitle(e)}>
              {crimeData.map((data, index) => (
                <Option key={index} value={data.value}>
                  {data.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Report Description" style={{ marginBottom: 2 }}>
            <TextArea
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          {title === "Car Theft" ? (
            <div style={{ marginBottom: 2 }}>
              <Form.Item label="Car colour" style={{ marginBottom: 2 }}>
                <Input onChange={(e) => setOption1(e.target.value)} />
              </Form.Item>
              <Form.Item label="License Plate" style={{ marginBottom: 2 }}>
                <Input onChange={(e) => setOption2(e.target.value)} />
              </Form.Item>
              <Form.Item label="Last seen location" style={{ marginBottom: 2 }}>
                <Input onChange={(e) => setOption3(e.target.value)} />
              </Form.Item>
            </div>
          ) : null}
          <Form.Item
            label={
              title === "Car Theft"
                ? "Upload an image or video"
                : "Upload an image or video(optional)"
            }
            style={{ marginBottom: 2 }}
          >
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        onClick={showModal}
        style={{ position: "fixed", right: 20, bottom: 55, zIndex: 1 }}
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined style={{ fontSize: 28 }} />}
      />
      <Stack>
        {data.posts
          ? data.posts.results.map((post, index) =>
              auth.is_auth ? (
                <PostCard
                  key={index}
                  id={post.id}
                  author={post.author}
                  postDate={post.created_at}
                  title={post.title}
                  postImage={post.post_image}
                  postVideo={post.post_video}
                  postDescription={post.description}
                  option1={post.option1}
                  option2={post.option2}
                  option3={post.option3}
                  option4={post.option4}
                  comments={post.comments.slice(0, 5)}
                  visible={post.visible}
                  viewPost
                  userKey={post.user_key}
                />
              ) : post.visible ? (
                <PostCard
                  key={index}
                  id={post.id}
                  author={post.author}
                  postDate={post.created_at}
                  title={post.title}
                  postImage={post.post_image}
                  postVideo={post.post_video}
                  postDescription={post.description}
                  option1={post.option1}
                  option2={post.option2}
                  option3={post.option3}
                  option4={post.option4}
                  comments={post.comments.slice(0, 5)}
                  visible={post.visible}
                  viewPost
                  userKey={post.user_key}
                />
              ) : null
            )
          : null}
      </Stack>
      <Pagination
        hideOnSinglePage
        showSizeChanger={false}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 25,
        }}
        current={page}
        total={data.posts ? data.posts.count : 0}
        onChange={handelPageChange}
      />
    </Container>
  );
}