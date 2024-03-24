import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice.js";
import videoSlice from "./slices/videoSlice.js";
import commentSlice from "./slices/commentSlice.js";
import dashboardSlice from "./slices/dashboardSlice.js";
import likeSlice from "./slices/likeSlice.js";
import useSlice from "./slices/useSlice.js";
import playlistSlice from "./slices/playlistSlice.js";
import tweetSlice from "./Slices/tweetSlice.js";
import subscriptionSlice from "./slices/subscriptionSlice.js";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: useSlice,
    video: videoSlice,
    comment: commentSlice,
    dashboard: dashboardSlice,
    like: likeSlice,
    playlist: playlistSlice,
    tweet: tweetSlice,
    subscription: subscriptionSlice,
  },
});

export default store;
