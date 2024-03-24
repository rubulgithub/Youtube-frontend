import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  profileData: null,
  history: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    gettingUserChannelProfile: (state) => {
      state.loading = true;
    },
    getUserChannelProfile: (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    },
    gettingWatchHistory: (state) => {
      state.loading = true;
    },
    getWatchHistory: (state, action) => {
      state.loading = false;
      state.history = action.payload;
    },
  },
});

export const {
  gettingUserChannelProfile,
  getUserChannelProfile,
  gettingWatchHistory,
  getWatchHistory,
} = userSlice.actions;
export default userSlice.reducer;
