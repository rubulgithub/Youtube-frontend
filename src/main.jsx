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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
      {
        path: "/upload-video",
        element: <UploadVideo />,
      },
      {
        path: "/watch/:videoId",
        element: <VideoDetail />,
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
