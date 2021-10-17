import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  clearState,
  addComment,
  resetSuccess,
} from "../../store/postSlice";
import PostCard from "../PostCard";
import Loading from "../Loading";
import { setActiveKey } from "../../store/navSlice";
import ChatButton from "../ChatButton";

const { Title } = Typography;

export default function Post({ match }) {
  const data = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getPost(match.params.post_id));
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, [match.params.post_id]);

  useEffect(() => {
    if (data.success) {
      document.getElementById("comment").value = "";
      dispatch(resetSuccess());
      setComment("");
    }
    // eslint-disable-next-line
  }, [data.success]);

  useEffect(() => {
    if (data.vSuccess) {
      dispatch(resetSuccess());
      dispatch(getPost(match.params.post_id));
    }
    // eslint-disable-next-line
  }, [data.vSuccess]);

  useEffect(() => {
    if (data.post) {
      if (data.post.title === "Missing Person") {
        dispatch(setActiveKey("4"));
      } else {
        dispatch(setActiveKey("3"));
      }
    }
    // eslint-disable-next-line
  }, [data.post]);

  const onSubmit = () => {
    if (comment) {
      const data = {
        id: match.params.post_id,
        description: comment,
        user_key: localStorage.getItem("user_key"),
      };
      dispatch(addComment(data));
    }
  };

  if (data.loading) {
    return <Loading />;
  }
  return (
    <Container maxWidth="sm">
      <ChatButton bottom={30} />
      {data.post ? (
        auth.is_admin ? (
          <PostCard
            id={data.post.id}
            author={data.post.author}
            postDate={data.post.created_at}
            title={data.post.title}
            postImage={data.post.post_image}
            postVideo={data.post.post_video}
            postDescription={data.post.description}
            option1={data.post.option1}
            option2={data.post.option2}
            option3={data.post.option3}
            option4={data.post.option4}
            option5={data.post.option5}
            option6={data.post.option6}
            comments={data.post.comments}
            visible={data.post.visible}
            addComment
            loading={data.cLoading}
            onSubmit={onSubmit}
            setComment={setComment}
            userKey={data.post.user_key}
            canSetVisibility
            backVisible
          />
        ) : data.post.visible ? (
          <PostCard
            id={data.post.id}
            author={data.post.author}
            postDate={data.post.created_at}
            title={data.post.title}
            postImage={data.post.post_image}
            postVideo={data.post.post_video}
            postDescription={data.post.description}
            option1={data.post.option1}
            option2={data.post.option2}
            option3={data.post.option3}
            option4={data.post.option4}
            option5={data.post.option5}
            option6={data.post.option6}
            comments={data.post.comments}
            visible={data.post.visible}
            addComment
            loading={data.cLoading}
            onSubmit={onSubmit}
            setComment={setComment}
            userKey={data.post.user_key}
            backVisible
          />
        ) : (
          <Title level={4} style={{ color: "white", marginTop: 250 }}>
            This post is no longer available or has been removed.
          </Title>
        )
      ) : (
        <Title level={3} style={{ color: "white", marginTop: 250 }}>
          The post you are looking for does not exist!
        </Title>
      )}
    </Container>
  );
}
