import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  likedVideos: [],
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    gettingLikedVideos: (state) => {
      state.loading = true;
    },
    getLikedVideos: (state, action) => {
      state.loading = false;
      state.likedVideos = action.payload;
    },
  },
});

export const { gettingLikedVideos, getLikedVideos } = likeSlice.actions;
export default likeSlice.reducer;
