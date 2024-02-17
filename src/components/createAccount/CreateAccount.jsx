import React, { useState } from "react";
import "./createAccount.css";
import Button from "../button/Button.jsx";
// import axios from "axios";
import axiosInstance from "../../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    // Create a preview URL for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setFullName("");
    setAvatar(null);
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("fullName", fullName);
    formData.append("avatar", avatar);
    formData.append("password", password);
    try {
      const res = await axiosInstance.post("/api/v1/users/register", formData);

      if (res.status === 201) {
        console.log(res.data.message);
        resetForm();
        navigate("/signin");
        console.log("message");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log("something went wrong: ", error);
    }
  };
  return (
    <div className="box">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Create a account</h2>
        <div className="input-box">
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="User name"
          />
        </div>
        <div className="input-box">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            type="email"
          />
        </div>

        <div className="input-box">
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            placeholder="Full name"
          />
        </div>

        <div className="inputbox">
          <input
            onChange={handleAvatarChange}
            placeholder="Password"
            type="file"
          />
        </div>
        {avatarPreview && (
          <div className="image-preview">
            <img src={avatarPreview} alt="Avatar Preview" />
          </div>
        )}
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

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccount;
