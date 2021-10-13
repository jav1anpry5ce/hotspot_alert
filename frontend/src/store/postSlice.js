import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("get/posts", async (page) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(`api/posts?page=${page}`, config);
  if (response.status === 200) {
    const data = response.data;
    return { data };
  }
});

export const getMissingPersons = createAsyncThunk(
  "get/missing/person",
  async (page) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`api/missing-person?page=${page}`, config);
    if (response.status === 200) {
      const data = response.data;
      return { data };
    }
  }
);

export const createPost = createAsyncThunk(
  "create/post",
  async (data, { rejectWithValue }) => {
    if (sessionStorage.getItem("token")) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + sessionStorage.getItem("token"),
        },
      };
      console.log(data);
      let formData = new FormData();
      if (data.image) {
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("option1", data.option1);
        formData.append("option2", data.option2);
        formData.append("option3", data.option3);
        formData.append("option4", data.option4);
        formData.append("option5", data.option5);
        formData.append("option6", data.option6);
        if (data.image.type.includes("image")) {
          formData.append("image", data.image);
        } else if (data.image.type.includes("video")) {
          formData.append("video", data.image);
        } else {
          formData.append("image", null);
        }
      } else {
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("option1", data.option1);
        formData.append("option2", data.option2);
        formData.append("option3", data.option3);
        formData.append("option4", data.option4);
        formData.append("option5", data.option5);
        formData.append("option6", data.option6);
      }
      try {
        await axios.post("/api/create-post/", formData, config);
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    } else {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      if (data.image) {
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.image.type.includes("image")) {
          formData.append("image", data.image);
        } else if (data.image.type.includes("video")) {
          formData.append("video", data.image);
        } else {
          formData.append("image", null);
        }
      } else {
        formData.append("title", data.title);
        formData.append("description", data.description);
      }
      try {
        await axios.post("/api/create-post/", formData, config);
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  }
);

export const getPost = createAsyncThunk(
  "get/post",
  async (post_id, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`/api/get-post/${post_id}`, config);
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
  "add/comment",
  async (data, { rejectWithValue }) => {
    if (sessionStorage.getItem("token")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token  " + sessionStorage.getItem("token"),
        },
      };
      try {
        const response = await axios.post("/api/add-comment/", data, config);
        if (response.status === 201) {
          const data = response.data;
          return { data };
        }
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.post("/api/add-comment/", data, config);
        if (response.status === 201) {
          const data = response.data;
          return { data };
        }
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    cLoading: false,
    success: false,
    posts: null,
    post: null,
    missingPersons: null,
    message: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.cLoading = false;
      state.success = false;
      state.posts = null;
      state.missingPersons = null;
      state.post = null;
      state.message = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload.data;
    },
    [getPosts.rejected]: (state) => {
      state.loading = false;
    },
    [createPost.pending]: (state) => {
      state.cLoading = true;
      state.message = null;
    },
    [createPost.fulfilled]: (state) => {
      state.cLoading = false;
      state.success = true;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.cLoading = false;
      state.success = false;
      if (payload.image) {
        state.message = "Please upload a photo or a video.";
      } else if (payload.Message) {
        state.message = payload.Message;
      } else {
        state.message = "Something went wrong!";
      }
    },
    [getPost.pending]: (state) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.post = payload.data;
    },
    [getPost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [getMissingPersons.pending]: (state) => {
      state.loading = true;
    },
    [getMissingPersons.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.missingPersons = payload.data;
    },
    [getMissingPersons.rejected]: (state) => {
      state.loading = false;
    },
    [addComment.pending]: (state) => {
      state.cLoading = true;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.cLoading = false;
      state.post = payload.data;
      state.success = true;
    },
    [addComment.rejected]: (state, { payload }) => {
      state.cLoading = false;
    },
  },
});

export const { clearState, resetSuccess } = postSlice.actions;
export default postSlice.reducer;
