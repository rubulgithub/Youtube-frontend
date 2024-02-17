import React from "react";
import useAxiosPrivate from "../customHooks/useAxiosPrivate.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/AuthSlice.js";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const accessToken = useSelector((state) => state.auth?.userData?.accessToken);
  const handleLogout = async () => {
    try {
      const res = await axiosPrivate.post("/api/v1/users/logout");
      const response = res.data;
      //   console.log(res);
      if (res?.status === 200) {
        // console.log(response?.message);
        dispatch(logout(response?.data));
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error.response.message);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Logout;
