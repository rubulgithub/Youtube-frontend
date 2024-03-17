import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice.js";
import userSliceReducer from "./slices/useSlice.js";
import videoSlice from "./slices/videoSlice.js";
import commentSlice from "./slices/commentSlice.js";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: userSliceReducer,
    video: videoSlice,
    comment: commentSlice,
  },
});

export default store;
