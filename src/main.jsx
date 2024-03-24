import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/Store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyProfile from "./components/myProfile/MyProfile.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import UploadVideo from "./components/UploadVideo.jsx";
import HomePage from "./pages/HomePage.jsx";
import VideoDetail from "./pages/VideoDetail.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import Channel from "./pages/Channel/Channel.jsx";
import ChannelVideos from "./pages/Channel/ChannelVideos.jsx";
import ChannelPlaylist from "./pages/Channel/ChannelPlaylist.jsx";
import ChannelTweets from "./pages/Channel/ChannelTweets.jsx";
import ChannelSubscribers from "./pages/Channel/ChannelSubscribers.jsx";
import History from "./pages/History.jsx";
import MySubscriptions from "./pages/MySubscriptions.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <AuthLayout authentication={false}>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <MyProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/upload-video",
        element: <UploadVideo />,
      },
      {
        path: "/watch/:videoId",
        element: (
          <AuthLayout authentication>
            <VideoDetail />
          </AuthLayout>
        ),
      },
      {
        path: "/collections",
        element: (
          <AuthLayout authentication>
            <AdminDashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout authentication>
            <LikedVideos />
          </AuthLayout>
        ),
      },
      {
        path: "/channel/:username",
        element: (
          <AuthLayout authentication>
            <Channel />
          </AuthLayout>
        ),
        children: [
          {
            path: "videos",
            element: (
              <AuthLayout authentication>
                <ChannelVideos />,
              </AuthLayout>
            ),
          },
          {
            path: "playlists",
            element: (
              <AuthLayout authentication>
                <ChannelPlaylist />,
              </AuthLayout>
            ),
          },
          {
            path: "tweets",
            element: (
              <AuthLayout authentication>
                <ChannelTweets />
              </AuthLayout>
            ),
          },
          {
            path: "subscribed",
            element: (
              <AuthLayout authentication>
                <ChannelSubscribers />,
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/history",
        element: (
          <AuthLayout authentication>
            <History />,
          </AuthLayout>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <AuthLayout authentication>
            <MySubscriptions />,
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
