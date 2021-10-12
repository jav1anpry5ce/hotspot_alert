import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWantedList = createAsyncThunk(
  "get/wanted/list",
  async (page) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`/api/wanted-list?page=${page}`, config);
    if (response.status === 200) {
      const data = response.data;
      return { data };
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

export const wantedSlice = createSlice({
  name: "wanted",
  initialState: {
    loading: false,
    wantedList: null,
    wLoading: false,
    success: false,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.wantedList = null;
      state.wLoading = false;
      state.success = false;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: {
    [getWantedList.pending]: (state) => {
      state.loading = true;
    },
    [getWantedList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.wantedList = payload.data;
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
    [createWantedPerson.rejected]: (state) => {
      state.wLoading = false;
    },
  },
});
export const { clearState, resetSuccess } = wantedSlice.actions;
export default wantedSlice.reducer;
