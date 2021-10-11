import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

export default function NotFoundPage() {
  const history = useHistory();
  return (
    <Result
      status="404"
      title={<p style={{ color: "white" }}>404</p>}
      subTitle={
        <p style={{ color: "white", marginTop: -20 }}>
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
