import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/Store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Signin from "./components/signin/Signin.jsx";
import Home from "./components/home/Home.jsx";
// import CreateAccount from "./components/createAccount/CreateAccount.jsx";
import User from "./components/user/User.jsx";
import MyProfile from "./components/myProfile/MyProfile.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import UploadVideo from "./components/UploadVideo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/user",
        element: <User />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
      {
        path: "/upload-video",
        element: <UploadVideo />,
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
