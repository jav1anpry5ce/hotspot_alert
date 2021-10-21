import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    activeKey: "1",
    hide: false,
  },
  reducers: {
    setActiveKey: (state, { payload }) => {
      state.activeKey = payload;
    },
    setHide: (state) => {
      state.hide = !state.hide;
    },
    clearState: (state) => {
      state.hide = false;
    },
  },
});

export const { setActiveKey, setHide, clearState } = navbarSlice.actions;
export default navbarSlice.reducer;
