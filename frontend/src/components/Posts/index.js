import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Modal, Select, Form, Input, Typography, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, createPost, clearState } from "../../store/postSlice";
import { openNotification } from "../../functions/Notification";
import { setActiveKey } from "../../store/navSlice";
import PostCard from "../PostCard";
import Loading from "../Loading";
import ChatButton from "../ChatButton";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

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
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [page, setPage] = useState(1);
  const observer = useRef();

  useEffect(() => {
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
      setPage(1);
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
    // eslint-disable-next-line
  }, [data.success, data.message]);

  const showModal = () => {
    setShow(!show);
  };

  const lastPostElement = useCallback(
    (node) => {
      if (data.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.posts.next) {
          setPage((page) => page + 1);
          //console.log("HI");
        }
      });
      if (node) observer.current.observe(node);
    },
    [data.loading, data.posts]
  );

  const onSubmit = () => {
    if (title && description) {
      let data;
      if (title === "Car Theft") {
        if (option1 && option2 && option3 && image) {
          data = {
            title,
            description,
            image,
            option1,
            option2,
            option3,
          };
        } else {
          openNotification("error", "Error", "Please fill out all fields.");
        }
      } else {
        data = {
          title,
          description,
          image,
        };
      }
      if (image) {
        if (image.size <= 71457280) {
          dispatch(createPost(data));
        } else {
          openNotification("error", "Error", "Selected file is too large.");
        }
      } else {
        dispatch(createPost(data));
      }
    } else {
      openNotification("error", "Error", "Please fill out all fields.");
    }
  };

  // if (data.loading) {
  //   return <Loading />;
  // }
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
          <Form.Item
            required
            label="Type of Report"
            style={{ marginBottom: 2 }}
          >
            <Select style={{ borderRadius: 30 }} onChange={(e) => setTitle(e)}>
              {crimeData.map((data, index) => (
                <Option key={index} value={data.value}>
                  {data.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            required
            label="Report Description"
            style={{ marginBottom: 2 }}
          >
            <TextArea
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          {title === "Car Theft" ? (
            <div style={{ marginBottom: 2 }}>
              <Form.Item
                required
                label="Car colour"
                style={{ marginBottom: 2 }}
              >
                <Input onChange={(e) => setOption1(e.target.value)} />
              </Form.Item>
              <Form.Item
                required
                label="License Plate"
                style={{ marginBottom: 2 }}
              >
                <Input onChange={(e) => setOption2(e.target.value)} />
              </Form.Item>
              <Form.Item
                required
                label="Last seen location"
                style={{ marginBottom: 2 }}
              >
                <Input onChange={(e) => setOption3(e.target.value)} />
              </Form.Item>
            </div>
          ) : null}
          <Form.Item
            required={title === "Car Theft"}
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
      <ChatButton bottom={90} />
      <Button
        onClick={showModal}
        style={{ position: "fixed", right: 25, bottom: 30, zIndex: 1 }}
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined style={{ fontSize: 28 }} />}
      />
      <Stack>
        {data.postsResults ? (
          data.postsResults.map((post, index) => {
            if (data.postsResults.length === index + 1) {
              return auth.is_auth ? (
                <div ref={lastPostElement} key={index}>
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
                </div>
              ) : post.visible ? (
                <div ref={lastPostElement} key={index}>
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
                </div>
              ) : null;
            } else {
              return auth.is_auth ? (
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
              ) : null;
            }
          })
        ) : (
          <Title level={3}>Nothing has been posted just yet.</Title>
        )}
      </Stack>
      {data.loading ? (
        data.postsResults.length > 0 ? (
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
