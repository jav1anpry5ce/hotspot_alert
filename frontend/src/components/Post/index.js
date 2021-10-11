import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Typography, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  clearState,
  addComment,
  resetSuccess,
} from "../../store/postSlice";
import PostCard from "../PostCard";

const { Title } = Typography;

export default function Post({ match }) {
  const data = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getPost(match.params.post_id));
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, [match.params.post_id]);

  useEffect(() => {
    if (data.success) {
      document.getElementById("comment").reset();
      dispatch(resetSuccess());
      setComment("");
    }
    // eslint-disable-next-line
  }, [data.success]);

  const onSubmit = () => {
    if (comment) {
      const data = {
        id: match.params.post_id,
        description: comment,
      };
      dispatch(addComment(data));
    }
  };

  if (data.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30%",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Container maxWidth="sm">
      {data.post ? (
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
          comments={data.post.comments}
          addComment
          loading={data.cLoading}
          onSubmit={onSubmit}
          setComment={setComment}
        />
      ) : (
        <Title level={3} style={{ color: "white", marginTop: 250 }}>
          The post you are looking for does not exist!
        </Title>
      )}
    </Container>
  );
}
