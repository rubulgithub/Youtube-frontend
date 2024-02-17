import React, { useRef } from "react";
import useAxiosPrivate from "../customHooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/AuthSlice.js";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileModal.css";

const ProfileModal = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const username = useSelector((state) => state.auth?.userData?.user?.username);
  const fullname = useSelector((state) => state.auth?.userData?.user?.fullName);
  const avatar = useSelector((state) => state.auth?.userData?.user?.avatar);

  const handleLogout = async () => {
    try {
      const res = await axiosPrivate.post("/api/v1/users/logout");
      const response = res.data;

      if (res?.status === 200) {
        dispatch(logout(response?.data));
        navigate("/signin"); // Navigate after state update
      }
    } catch (error) {
      console.error(error.response?.message || error.message);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from closing modal
        toggleModal();
      }}
      className="modal-wrapper"
    >
      <div className="modal">
        <div className="modal-content">
          <div className="myProfile">
            <div className="avatar">
              <img src={avatar} alt="" />
            </div>
            <div className="profile-desc">
              <h3 className="fullname">{fullname}</h3>
              <h3 className="username">{username}</h3>
              {/* Use a method for internal navigation within the modal */}
              <Link to="/profile">View Your Channel</Link>
            </div>
          </div>
          <div className="line"></div>
          <div className="logout">
            <button onClick={handleLogout}>Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
