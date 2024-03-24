import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  playlist: [],
  playlists: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    createPlaylist: (state, action) => {
      (state.loading = false), (state.playlist = action.payload);
    },
    getPlaylistsByUser: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

export const { getPlaylistsByUser } = playlistSlice.actions;
export default playlistSlice.reducer;
