import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  channelStats: null,
  channelVideos: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    gettingChannelStats: (state) => {
      state.loading = true;
    },
    getChannelStats: (state, action) => {
      state.loading = false;
      state.channelStats = action.payload;
    },
    getttingChannelVideos: (state) => {
      state.loading = true;
    },
    getChannelVideos: (state, action) => {
      state.loading = false;
      state.channelVideos = action.payload;
    },
  },
});

export const {
  gettingChannelStats,
  getChannelStats,
  getChannelVideos,
  getttingChannelVideos,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
