import React from "react";
import { Stack } from "@mui/material";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Image,
  Comment,
  Form,
  Dropdown,
  Menu,
  PageHeader,
  Spin,
} from "antd";
import { TextArea } from "./Elements";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMore } from "react-icons/ai";
import { setVisibility } from "../../store/postSlice";
import RandomColor from "../../functions/RandomColor";
import { LoadingOutlined } from "@ant-design/icons";
const { Meta } = Card;
const { Text, Paragraph, Title } = Typography;

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
  option5,
  option6,
  comments,
  addComment,
  loading,
  onSubmit,
  setComment,
  viewPost,
  visible,
  userKey,
  canSetVisibility,
  backVisible,
}) {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const onClick = () => {
    const data = {
      id,
    };
    dispatch(setVisibility(data));
  };

  const menu = (
    <Menu>
      <Menu.Item key={id}>
        {auth.is_admin ? (
          visible ? (
            <Button onClick={onClick}>Set post invisible</Button>
          ) : (
            <Button onClick={onClick}>Set post visible</Button>
          )
        ) : null}
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      style={{
        marginTop: 6,
        marginBottom: 6,
        borderRadius: 9,
        backgroundColor: "rgba(250,250,250,0.85)",
      }}
      bordered={false}
    >
      {backVisible ? (
        <PageHeader
          onBack={() => window.history.back()}
          title="Back"
          style={{ marginTop: -35, marginLeft: -25 }}
        />
      ) : null}

      <Meta
        avatar={
          <Avatar
            src={
              author
                ? author.account.profile_image
                : "https://i1.sndcdn.com/avatars-000245472345-2odmx5-t240x240.jpg"
            }
            alt="img"
          />
        }
        title={
          author ? (
            <div
              style={{
                display: "flex",
                marginBottom: -3,
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <Text>{author.account.username}</Text>
                <span
                  style={{
                    fontSize: 16,
                    color: "#47a6ff",
                    marginLeft: 2,
                    marginTop: 4,
                  }}
                  className="material-icons"
                >
                  verified
                </span>
              </div>
              {auth.is_admin && canSetVisibility ? (
                <Dropdown overlay={menu}>
                  <AiOutlineMore
                    style={{ marginRight: 3, fontSize: 18, marginTop: 3 }}
                  />
                </Dropdown>
              ) : auth.is_admin ? (
                <Text style={{ fontSize: 11 }}>
                  Visible: {String(visible).toLocaleUpperCase()}
                </Text>
              ) : null}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ display: "flex", marginBottom: -1 }}>
                anonymous_user_{userKey}
              </Text>
              {auth.is_admin && canSetVisibility ? (
                <Dropdown overlay={menu}>
                  <AiOutlineMore
                    style={{ marginRight: 3, fontSize: 18, marginTop: 3 }}
                  />
                </Dropdown>
              ) : auth.is_admin ? (
                <Text style={{ fontSize: 11 }}>
                  Visible: {String(visible).toLocaleUpperCase()}
                </Text>
              ) : null}
            </div>
          )
        }
        description={
          <Text style={{ display: "flex", marginTop: -6, color: "#1f1f1f" }}>
            {new Date(postDate).toLocaleString()}
          </Text>
        }
      />
      <Paragraph style={{ marginTop: 7 }}>
        <Stack style={{ display: "flex" }}>
          <Title level={3}>{title}</Title>
          {postImage ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                style={{ borderRadius: 4 }}
                placeholder={
                  <div
                    style={{
                      backgroundColor: `${RandomColor()}`,
                      minHeight: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 56,
                            color: "white",
                          }}
                        />
                      }
                      size="large"
                    />
                  </div>
                }
                alt={postImage}
                src={postImage}
                width={250}
              />
            </div>
          ) : postVideo ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactPlayer width={275} controls url={postVideo} />
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
              <br />
              <Text strong>Last seen attire: {option1}</Text>
              <br />
              <Text strong>Gender: {option2}</Text>
              <br />
              <Text strong>Age: {option3}</Text>
              <br />
              <Text strong>Last seen location: {option4}</Text>
              <br />
              <Text strong>
                You many contact {option5} at {option6} or the police.
              </Text>
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
                          <Text style={{ color: "#1f1f1f" }}>
                            {comment.author.account.username}
                          </Text>
                          <span
                            style={{
                              fontSize: 11,
                              color: "#47a6ff",
                              marginLeft: 1,
                              marginTop: 4.5,
                            }}
                            className="material-icons"
                          >
                            verified
                          </span>
                        </div>
                      ) : (
                        <Text style={{ color: "#1f1f1f" }}>
                          anonymous_user_{comment.user_key}
                        </Text>
                      )}
                    </div>
                  }
                  content={
                    <p style={{ marginTop: -5 }}>{comment.description}</p>
                  }
                  datetime={
                    <span style={{ color: "#333333" }}>
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  }
                />
              ))
            : null}
        </Stack>
      </Paragraph>
      {addComment ? (
        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item label="Add a comment">
            <TextArea
              name="comment"
              id="comment"
              rows={3}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Comment
          </Button>
        </Form>
      ) : null}
      {viewPost ? (
        <Button
          type="primary"
          onClick={() => history.push(`/post/${id}`)}
          style={{ marginTop: 13 }}
        >
          View Post
        </Button>
      ) : null}
    </Card>
  );
}
