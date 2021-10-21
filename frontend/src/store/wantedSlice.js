import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWantedList = createAsyncThunk(
  "get/wanted/list",
  async (page) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token")
          ? "Token  " + sessionStorage.getItem("token")
          : null,
      },
    };
    const response = await axios.get(`/api/wanted-list?page=${page}`, config);
    if (response.status === 200) {
      const data = response.data;
      return { data };
    }
  }
);

export const getWantedPost = createAsyncThunk(
  "get/wanted/post",
  async (post_id, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`/api/get-wanted-post/${post_id}`, config);
    try {
      if (response.status === 200) {
        const data = response.data;
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "add/wanted/comment",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token")
          ? "Token  " + sessionStorage.getItem("token")
          : null,
      },
    };
    try {
      const response = await axios.post(
        "/api/add-wanted-comment/",
        data,
        config
      );
      if (response.status === 201) {
        const data = response.data;
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createWantedPerson = createAsyncThunk(
  "create/wanted/person",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
    };
    let formData = new FormData();
    if (data.image) {
      formData.append("name", data.name);
      formData.append("crime", data.crime);
      formData.append("reward", data.reward);
      formData.append("image", data.image);
    } else {
      formData.append("name", data.name);
      formData.append("crime", data.crime);
      formData.append("reward", data.reward);
    }
    try {
      await axios.post("/api/create-wanted-person/", formData, config);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const setVisibility = createAsyncThunk(
  "set/wanted/visibility",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
    };
    try {
      await axios.patch("api/set-wanted-visibility/", data, config);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const wantedSlice = createSlice({
  name: "wanted",
  initialState: {
    loading: false,
    wantedList: null,
    wantedPost: null,
    results: [],
    wLoading: false,
    cLoading: false,
    vLoading: false,
    success: false,
    vSuccess: false,
    message: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.wantedList = null;
      state.wantedPost = null;
      state.wLoading = false;
      state.cLoading = false;
      state.vLoading = false;
      state.success = false;
      state.vSuccess = false;
      state.message = null;
      state.results = [];
    },
    resetSuccess: (state) => {
      state.success = false;
      state.vSuccess = false;
    },
  },
  extraReducers: {
    [getWantedList.pending]: (state) => {
      state.loading = true;
    },
    [getWantedList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.wantedList = payload.data;
      state.results = state.results.concat(payload.data.results);
    },
    [getWantedList.rejected]: (state) => {
      state.loading = false;
    },
    [createWantedPerson.pending]: (state) => {
      state.wLoading = true;
    },
    [createWantedPerson.fulfilled]: (state) => {
      state.wLoading = false;
      state.success = true;
    },
    [createWantedPerson.rejected]: (state, { payload }) => {
      state.wLoading = false;
      if (payload.image) {
        state.message = payload.image;
      } else {
        payload.message = "Something went wrong!";
      }
    },
    [getWantedPost.pending]: (state) => {
      state.loading = true;
    },
    [getWantedPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.wantedPost = payload.data;
    },
    [getWantedPost.rejected]: (state) => {
      state.loading = false;
    },
    [addComment.pending]: (state) => {
      state.cLoading = true;
      state.message = null;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.cLoading = false;
      state.wantedPost = payload.data;
      state.success = true;
      state.message = null;
    },
    [addComment.rejected]: (state, { payload }) => {
      state.cLoading = false;
      state.message = payload.Message;
    },
    [setVisibility.pending]: (state) => {
      state.vLoading = true;
    },
    [setVisibility.fulfilled]: (state) => {
      state.vLoading = false;
      state.vSuccess = true;
    },
    [setVisibility.rejected]: (state, { payload }) => {
      state.vLoading = false;
      state.message = payload.data;
    },
  },
});
export const { clearState, resetSuccess } = wantedSlice.actions;
export default wantedSlice.reducer;
