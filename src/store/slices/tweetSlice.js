import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tweet: null,
  tweets: [],
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    createTweet: (state, action) => {
      state.loading = false;
      state.tweet = action.payload;
    },
    getUserTweets: (state, action) => {
      state.loading = false;
      state.tweets = action.payload;
    },
  },
});

export const { createTweet, getUserTweets } = tweetSlice.actions;
export default tweetSlice.reducer;
