import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tweet: [],
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    createTweet: (state, action) => {
      state.loading = false;
      state.tweet = action.payload;
    },
  },
});

export const { createTweet } = tweetSlice.actions;
export default tweetSlice.reducer;
