import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  comments: [],
  totalComments: null,
  hasNextPage: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    cleanUpComments: (state) => {
      state.comments = [];
    },
    gettingVideoComments: (state) => {
      state.loading = true;
    },
    getVideoComments: (state, action) => {
      state.loading = false;
      state.comments = action.payload.docs;
      state.totalComments = action.payload.totalDocs;
      state.hasNextPage = action.payload.hasNextPage;
    },
    createAComment: (state, action) => {
      state.comments.unshift(action.payload);
      state.totalComments++;
    },
  },
});

export const {
  cleanUpComments,
  gettingVideoComments,
  getVideoComments,
  createAComment,
} = commentSlice.actions;
export default commentSlice.reducer;
