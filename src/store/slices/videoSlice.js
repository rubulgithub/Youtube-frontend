import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  uploading: false,
  uploaded: false,
  videos: {
    docs: [],
    hasNextPage: false,
  },
  video: null,
  publishToggled: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
    makeVideosNull: (state) => {
      state.videos.docs = [];
    },
    getAllVideos: (state, action) => {
      state.loading = false;
      state.videos.docs = [...state.videos.docs, ...action.payload.docs];
      state.videos.hasNextPage = action.payload.hasNextPage;
    },
    videoUploading: (state) => {
      state.uploading = true;
    },
    videoUploaded: (state) => {
      state.uploading = false;
      state.uploaded = true;
    },
    togglePublishStatus: (state) => {
      state.publishToggled = !state.publishToggled;
    },
  },
});

export const {
  updateUploadState,
  makeVideosNull,
  getAllVideos,
  videoUploading,
  videoUploaded,
  togglePublishStatus,
} = videoSlice.actions;

export default videoSlice.reducer;
