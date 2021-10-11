import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
    };
    try {
      await axios.post("auth/register/", data, config);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const activate = createAsyncThunk(
  "activate",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("auth/activate/", data, config);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("auth/login/", data, config);
      if (response.status === 200) {
        const data = response.data;
        return { data };
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("logout", async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };
  const data = {};
  await axios.post("auth/logout", data, config);
});

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
    };
    try {
      await axios.patch("auth/change-password/", data, config);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetRequest = createAsyncThunk(
  "reset/request",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("auth/reset-request/", data, config);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "reset/password",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("auth/reset/", data, config);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    username: sessionStorage.getItem("username"),
    is_auth: String(true) === sessionStorage.getItem("is_auth"),
    token: sessionStorage.getItem("token"),
    message: null,
    success: false,
  },
  reducers: {
    clearState: (state) => {
      state.success = false;
      state.message = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
      state.message = null;
    },
    [register.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.message = null;
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      try {
        state.message = payload.Message;
      } catch (err) {
        state.message = "Something went wrong!";
      }
    },
    [activate.pending]: (state) => {
      state.loading = true;
      state.message = null;
    },
    [activate.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [activate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      try {
        state.message = payload.Message;
      } catch (err) {
        state.message = "Something went wrong!";
      }
    },
    [login.pending]: (state) => {
      state.loading = true;
      state.message = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.username = payload.data.username;
      state.is_auth = true;
      state.token = payload.data.auth_token;
      state.message = null;
      sessionStorage.setItem("username", payload.data.username);
      sessionStorage.setItem("is_auth", true);
      sessionStorage.setItem("token", payload.data.auth_token);
      sessionStorage.setItem("_expiredTime", Date.now() + 60 * 60 * 1000);
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      try {
        state.message = payload.Message;
      } catch (err) {
        state.message = "Something went wrong!";
      }
    },
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state) => {
      state.loading = false;
      state.username = null;
      state.is_auth = false;
      state.token = null;
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("is_auth");
      sessionStorage.removeItem("token");
    },
    [logout.rejected]: (state) => {
      state.loading = false;
    },
    [changePassword.pending]: (state) => {
      state.loading = true;
      state.message = null;
    },
    [changePassword.fulfilled]: (state) => {
      state.loading = false;
      state.message = null;
      state.success = true;
    },
    [changePassword.rejected]: (state, { payload }) => {
      state.loading = false;
      try {
        state.message = payload.Message;
      } catch (err) {
        state.message = "Something went wrong.";
      }
    },
    [resetRequest.pending]: (state) => {
      state.loading = true;
      state.message = null;
    },
    [resetRequest.fulfilled]: (state) => {
      state.loading = false;
      state.message = null;
      state.success = true;
    },
    [resetRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      try {
        state.message = payload.Message;
      } catch (err) {
        state.message = "Something went wrong.";
      }
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
      state.message = null;
    },
    [resetPassword.fulfilled]: (state) => {
      state.loading = false;
      state.message = null;
      state.success = true;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      try {
        state.message = payload.Message;
      } catch (err) {
        state.message = "Something went wrong.";
      }
    },
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
