import React from "react";
import { Stack } from "@mui/material";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Image,
  Input,
  Comment,
  Form,
  Tooltip,
} from "antd";
import moment from "moment";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
const { Meta } = Card;
const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;

export default function PostCard({
  id,
  author,
  title,
  postDate,
  postImage,
  postVideo,
  postDescription,
  option1,
  option2,
  option3,
  option4,
  comments,
  addComment,
  loading,
  onSubmit,
  setComment,
  viewPost,
}) {
  const history = useHistory();
  return (
    <Card
      style={{
        marginTop: 6,
        marginBottom: 6,
        borderRadius: 9,
        backgroundColor: "rgba(255,255,255,0.95)",
      }}
    >
      <Meta
        avatar={
          <Avatar
            src={
              author
                ? author.account.profile_image
                : "https://i1.sndcdn.com/avatars-000245472345-2odmx5-t240x240.jpg"
            }
          />
        }
        title={
          author ? (
            <div style={{ display: "flex", marginBottom: -3 }}>
              <Text>{author.account.name}</Text>
              <span
                style={{
                  fontSize: 16,
                  color: "#47a6ff",
                  marginLeft: 2,
                  marginTop: 6,
                }}
                class="material-icons"
              >
                verified
              </span>
            </div>
          ) : (
            <Text style={{ display: "flex", marginBottom: -3 }}>Anonymous</Text>
          )
        }
        description={
          <Text style={{ display: "flex", marginTop: -6, color: "grey" }}>
            {new Date(postDate).toLocaleString()}
          </Text>
        }
      />
      <Paragraph style={{ marginTop: 7 }}>
        <Stack style={{ display: "flex" }}>
          <Title level={3}>{title}</Title>
          {postImage ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image src={postImage} width={250} />
            </div>
          ) : postVideo ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactPlayer width={265} controls url={postVideo} />
            </div>
          ) : null}
          <Text strong>{postDescription}</Text>
          {title === "Car Theft" ? (
            <div>
              <Text strong>Car Colour: {option1}</Text>
              <br />
              <Text strong>License Plate: {option2}</Text>
              <br />
              <Text strong>Last seen location: {option3}</Text>
            </div>
          ) : title === "Missing Person" ? (
            <div>
              <Text strong>Last seen attire: {option1}</Text>
              <br />
              <Text strong>Gender: {option2}</Text>
              <br />
              <Text strong>Age: {option3}</Text>
              <br />
              <Text strong>Last seen location: {option4}</Text>
            </div>
          ) : null}
          {comments
            ? comments.map((comment, index) => (
                <Comment
                  key={index}
                  style={{ marginLeft: 5, marginBottom: -39 }}
                  avatar={
                    <Avatar
                      src={
                        comment.author
                          ? comment.author.account.profile_image
                          : "https://i1.sndcdn.com/avatars-000245472345-2odmx5-t240x240.jpg"
                      }
                      alt="Anonymous"
                    />
                  }
                  author={
                    <div>
                      {comment.author ? (
                        <div style={{ display: "flex", marginBottom: -3 }}>
                          <Text>{comment.author.account.name}</Text>
                          <span
                            style={{
                              fontSize: 11,
                              color: "#47a6ff",
                              marginLeft: 1,
                              marginTop: 4.5,
                            }}
                            class="material-icons"
                          >
                            verified
                          </span>
                        </div>
                      ) : (
                        "Anonymous"
                      )}
                    </div>
                  }
                  content={
                    <p style={{ marginTop: -5 }}>{comment.description}</p>
                  }
                  datetime={
                    <Tooltip title={moment().format("YYYY-MM-DD HH:mm")}>
                      <span>
                        {new Date(comment.created_at).toLocaleString()}
                      </span>
                    </Tooltip>
                  }
                />
              ))
            : null}
        </Stack>
      </Paragraph>
      {addComment ? (
        <Form onFinish={onSubmit} id="comment" layout="vertical">
          <Form.Item label="Add a comment">
            <TextArea rows={3} onChange={(e) => setComment(e.target.value)} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Comment
          </Button>
        </Form>
      ) : null}
      {viewPost ? (
        <Button type="primary" onClick={() => history.push(`/post/${id}`)}>
          View Post
        </Button>
      ) : null}
    </Card>
  );
}
