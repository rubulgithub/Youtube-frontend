import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subscribed: null,
  channelSubscribers: [],
  mySubscriptions: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    toggleSubscription: (state, action) => {
      state.loading = false;
      state.subscribed = action.payload;
    },
    gettingUserChannelSubscribers: (state) => {
      state.loading = true;
    },
    getUserChannelSubscribers: (state, action) => {
      state.loading = false;
      state.channelSubscribers = action.payload;
    },
    gettingSubscribedChannels: (state) => {
      state.loading = true;
    },
    getSubscribedChannels: (state, action) => {
      state.loading = false;
      state.mySubscriptions = action.payload.filter(
        (subscription) => subscription?.subscribedChannel?.latestVideo
      );
    },
  },
});

export const {
  toggleSubscription,
  gettingUserChannelSubscribers,
  getUserChannelSubscribers,
  gettingSubscribedChannels,
  getSubscribedChannels,
} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
