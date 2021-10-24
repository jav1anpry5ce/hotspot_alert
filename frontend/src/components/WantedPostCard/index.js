import React from "react";
import {
  Button,
  Form,
  Image,
  Card,
  Typography,
  Comment,
  Avatar,
  Menu,
  Dropdown,
  Spin,
} from "antd";
import { TextArea } from "../PostCard/Elements";
import { AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setVisibility } from "../../store/wantedSlice";
import { Back } from "../Chat/Elements";
import RandomColor from "../../functions/RandomColor";
import { LoadingOutlined } from "@ant-design/icons";

const { Text, Paragraph, Title } = Typography;

export default function WantedPostCard({
  id,
  name,
  image,
  crime,
  reward,
  comments,
  addComment,
  setComment,
  viewPost,
  visible,
  onSubmit,
  loading,
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
      style={{ marginTop: 11, borderRadius: 7, marginBottom: 7 }}
      bordered={false}
      headStyle={{ backgroundColor: "#383d42" }}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: backVisible
              ? auth.is_admin && canSetVisibility
                ? "space-between"
                : null
              : "space-between",
            marginBottom: -20,
          }}
        >
          {backVisible ? (
            <Back
              style={{ fontSize: 28, color: "white", marginTop: 10 }}
              onClick={() => window.history.back()}
            />
          ) : null}

          <Title
            style={{ color: "white", marginLeft: backVisible ? 15 : 0 }}
            align="center"
          >
            Wanted
          </Title>
          {auth.is_admin && canSetVisibility ? (
            <Dropdown overlay={menu}>
              <AiOutlineMore
                style={{ fontSize: 36, marginTop: 3, color: "white" }}
              />
            </Dropdown>
          ) : auth.is_admin ? (
            <Text style={{ fontSize: 14, marginTop: 12, color: "white" }}>
              Visible: {String(visible).toLocaleUpperCase()}
            </Text>
          ) : null}
        </div>
      }
    >
      <Paragraph>
        <Title level={3}>{name}</Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
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
            width={350}
            src={image}
            alt={image}
          />
        </div>
        <Text strong>Crime: {crime}</Text> <br />
        <Text strong>Reward: ${reward}</Text>
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
                          {comment.author.account.name}
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
                content={<p style={{ marginTop: -5 }}>{comment.description}</p>}
                datetime={
                  <span style={{ color: "#333333" }}>
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                }
              />
            ))
          : null}
      </Paragraph>
      {addComment ? (
        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item label="Add a comment">
            <TextArea
              name="comment"
              id="wanted-comment"
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
          onClick={() => history.push(`/wanted/post/${id}`)}
          style={{ marginTop: 13 }}
        >
          View Post
        </Button>
      ) : null}
    </Card>
  );
}
