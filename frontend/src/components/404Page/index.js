import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveKey, setHide, clearState } from "../../store/navSlice";

export default function NotFoundPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveKey(""));
    dispatch(setHide());
    return () => dispatch(clearState());
  }, [dispatch]);

  return (
    <Result
      style={{ marginTop: 5 }}
      status="404"
      title={<p style={{ color: "white" }}>404</p>}
      subTitle={
        <p style={{ color: "#fff", marginTop: -20 }}>
          Sorry, the page you visited does not exist.
        </p>
      }
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Back Home
        </Button>
      }
    />
  );
}
