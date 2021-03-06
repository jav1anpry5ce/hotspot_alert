import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Stack } from "@mui/material";
import {
  Button,
  Modal,
  Select,
  Form,
  Input,
  Spin,
  BackTop,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getMissingPersons,
  createPost,
  clearState,
} from "../../store/postSlice";
import { openNotification } from "../../functions/Notification";
import { setActiveKey } from "../../store/navSlice";
import PostCard from "../PostCard";
import Loading from "../Loading";
import ChatButton from "../ChatButton";
import { CustomButton } from "../Posts/Elements";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const genderData = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

export default function MissingPerson() {
  const auth = useSelector((state) => state.auth);
  const data = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [option6, setOption6] = useState("");
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const observer = useRef();

  useEffect(() => {
    dispatch(setActiveKey("4"));
    return () => dispatch(clearState());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getMissingPersons(page));
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (data.success) {
      form.setFieldsValue({
        description: "",
        gender: "",
        last: "",
        age: "",
        location: "",
        kin: "",
        contact: "",
        image: "",
      });
      dispatch(clearState());
      showModal();
      if (page !== 1) {
        setPage(1);
      } else {
        dispatch(getMissingPersons(1));
      }
      openNotification("success", "Success", "Missing person post created!");
      setDescription("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setOption5("");
      setOption6("");
      setImage(null);
    }
    if (data.message) {
      openNotification("error", "Error", data.message);
    }
    // eslint-disable-next-line
  }, [data.success, data.message]);

  const onSubmit = () => {
    if (
      description &&
      image &&
      option1 &&
      option2 &&
      option3 &&
      option4 &&
      option5 &&
      option6
    ) {
      const data = {
        title: "Missing Person",
        description: description.trim(),
        image,
        option1: option1.trim(),
        option2: option2.trim(),
        option3: option3.trim(),
        option4: option4.trim(),
        option5: option5.trim(),
        option6: option6.trim(),
      };
      if (image.size <= 71457280) dispatch(createPost(data));
      else openNotification("error", "Error", "Selected fill is too large.");
    } else {
      openNotification("error", "Error", "Please fill all required fields.");
    }
  };

  const lastPostElement = useCallback(
    (node) => {
      if (data.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.missingPersons.next) {
          setPage((page) => page + 1);
          //console.log("HI");
        }
      });
      if (node) observer.current.observe(node);
    },
    [data.loading, data.missingPersons]
  );

  const showModal = () => {
    setShow(!show);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 55 }}>
      <Modal
        visible={show}
        onCancel={() => setShow(!show)}
        style={{ borderRadius: 26 }}
        title="Create a Missing Person"
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
        <Form
          layout="vertical"
          id="missing-form"
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            required
            label="Report Description"
            style={{ marginBottom: 2 }}
            name="description"
          >
            <TextArea
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            required
            label="Last Seen Attire"
            style={{ marginBottom: 2 }}
            name="last"
          >
            <Input onChange={(e) => setOption1(e.target.value)} />
          </Form.Item>
          <Form.Item
            required
            label="Gender"
            style={{ marginBottom: 2 }}
            name="gender"
          >
            <Select
              style={{ borderRadius: 30 }}
              onChange={(e) => setOption2(e)}
            >
              {genderData.map((data, index) => (
                <Option key={index} value={data.value}>
                  {data.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            required
            label="Age"
            style={{ marginBottom: 2 }}
            name="age"
          >
            <Input
              type="number"
              min="0"
              max="130"
              onChange={(e) => setOption3(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            required
            label="Last seen location"
            style={{ marginBottom: 2 }}
            name="location"
          >
            <Input onChange={(e) => setOption4(e.target.value)} />
          </Form.Item>
          <Form.Item
            required
            label="Next of kin name"
            style={{ marginBottom: 2 }}
            name="kin"
          >
            <Input onChange={(e) => setOption5(e.target.value)} />
          </Form.Item>
          <Form.Item
            required
            label="Contact Information"
            style={{ marginBottom: 2 }}
            name="contact"
          >
            <Input onChange={(e) => setOption6(e.target.value)} />
          </Form.Item>
          <Form.Item
            required
            label="Upload an image"
            style={{ marginBottom: 2 }}
            name="image"
          >
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Item>
        </Form>
      </Modal>
      <BackTop
        style={{
          bottom: auth.is_auth ? 140 : 85,
          right: 25,
          zIndex: 1,
        }}
      />
      {auth.is_auth && auth.account_type !== "Dispatcher" ? (
        <div>
          <CustomButton
            onClick={showModal}
            style={{ position: "fixed", right: 25, bottom: 30 }}
            shape="circle"
            size="large"
            icon={<PlusOutlined style={{ fontSize: 28, color: "white" }} />}
          />
          <ChatButton bottom={85} />
        </div>
      ) : (
        <ChatButton bottom={30} />
      )}
      <Stack>
        {data.missingPersonsResults.map((person, index) => {
          if (data.missingPersonsResults.length === index + 1) {
            return (
              <div ref={lastPostElement} key={index}>
                <PostCard
                  id={person.id}
                  author={person.author}
                  postDate={person.created_at}
                  title={person.title}
                  postImage={person.post_image}
                  postDescription={person.description}
                  option1={person.option1}
                  option2={person.option2}
                  option3={person.option3}
                  option4={person.option4}
                  option5={person.option5}
                  option6={person.option6}
                  visible={person.visible}
                  viewPost
                />
              </div>
            );
          } else {
            return (
              <PostCard
                key={index}
                id={person.id}
                author={person.author}
                postDate={person.created_at}
                title={person.title}
                postImage={person.post_image}
                postDescription={person.description}
                option1={person.option1}
                option2={person.option2}
                option3={person.option3}
                option4={person.option4}
                option5={person.option5}
                option6={person.option6}
                visible={person.visible}
                viewPost
              />
            );
          }
        })}
        {!data.loading && data.missingPersonsResults.length === 0 ? (
          <Title
            align="center"
            style={{ color: "white", marginTop: "50%" }}
            level={2}
          >
            Nothing has been posted just yet.
          </Title>
        ) : null}
      </Stack>
      {data.loading ? (
        data.missingPersonsResults.length > 0 ? (
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
