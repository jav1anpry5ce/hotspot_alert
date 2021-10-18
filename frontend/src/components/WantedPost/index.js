import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getWantedPost,
  resetSuccess,
  addComment,
} from "../../store/wantedSlice";
import Loading from "../Loading";
import { setActiveKey } from "../../store/navSlice";
import WantedPostCard from "../WantedPostCard";
import { Typography } from "antd";
import ChatButton from "../ChatButton";

const { Title } = Typography;

export default function WantedPost({ match }) {
  const data = useSelector((state) => state.wanted);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getWantedPost(match.params.id));
    dispatch(setActiveKey("5"));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data.success) {
      document.getElementById("wanted-comment").value = "";
      dispatch(resetSuccess());
      setComment("");
    }
    // eslint-disable-next-line
  }, [data.success]);

  useEffect(() => {
    if (data.vSuccess) {
      dispatch(resetSuccess());
      dispatch(getWantedPost(match.params.id));
    }
    // eslint-disable-next-line
  }, [data.vSuccess]);

  const onSubmit = () => {
    if (comment) {
      const data = {
        id: match.params.id,
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
      {data.wantedPost ? (
        <WantedPostCard
          id={data.wantedPost.id}
          name={data.wantedPost.name}
          image={data.wantedPost.wanted_image}
          crime={data.wantedPost.crime}
          reward={data.wantedPost.reward}
          comments={data.wantedPost.comments}
          addComment
          setComment={setComment}
          onSubmit={onSubmit}
          loading={data.cLoading}
          visible={data.wantedPost.visible}
          canSetVisibility
          backVisible
        />
      ) : (
        <Title style={{ color: "#fff", marginTop: "50%" }} level={2}>
          The wanted post you are looking for does not exist or has been
          removed.
        </Title>
      )}
    </Container>
  );
}
