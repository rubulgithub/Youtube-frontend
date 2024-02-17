import React, { useState } from "react";
import Button from "../button/Button.jsx";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/AuthSlice.js";
import axiosInstance from "../../api/axiosInstance.js";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/api/v1/users/login",
        { username, password }
        // {
        //   headers: { "Content-Type": "application/json" },
        //   withCrentials: true,
        // }
      );

      const response = res?.data;

      if (res?.status === 200) {
        setUsername("");
        setPassword("");
        navigate("/");
        console.log(response?.message);
        dispatch(login(response?.data));
      } else {
        console.log(response.message);
      }

      // console.log(res?.data.data.accessToken);
      // console.log(res?.data.message);
      // const token = res?.data?.accessToken;
      // console.log(token);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="box">
      {/* <h2> Sign in</h2> */}
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="User name or Email"
          />
        </div>

        <div className="input-box">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="button-container">
          <Button
            onClick={() => navigate("/create-account")}
            className="create-button"
          >
            Create Account
          </Button>
          <Button type="submit" className="create-button">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
