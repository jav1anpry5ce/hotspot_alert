import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "antd/dist/antd.css";
import "material-icons/iconfont/material-icons.css";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
