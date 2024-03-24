import React, { useState } from "react";
// import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import Notification from "../notification/Notification.jsx";
import useAxiosPrivate from "../customHooks/useAxiosPrivate.js";
import { useDispatch } from "react-redux";
// import { logout } from "../../store/AuthSlice.js";
import { IoIosClose } from "react-icons/io";
import { GoVideo } from "react-icons/go";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { logout } from "../../store/slices/AuthSlice.js";
import UploadVideo from "../UploadVideo.jsx";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const avatar = useSelector((state) => state.auth?.userData?.user?.avatar);
  const fullname = useSelector((state) => state.auth?.userData?.user?.fullName);
  const username = useSelector((state) => state.auth?.userData?.user?.username);
  const userdata = useSelector((state) => state.auth?.userData?.user);
  // console.log(userdata);

  const [createPopupOpen, setCreatePopupOpen] = useState(false); // State for create popup
  const [profilePopup, setProfilePopup] = useState(false); // State for create popup
  const [uploadVideoPopup, setUploadVideoPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const navItems = [
    {
      name: "Sign in",
      slug: "/login",
      active: !authStatus,
    },
    // {
    //   name: "Notification",
    //   active: authStatus,
    //   component: <Notification />,
    // },
    {
      name: "Create",
      active: authStatus,
      component: (
        <button
          onClick={() => setCreatePopupOpen(true)}
          className="text-gray-700 hover:bg-gray-200 rounded-full w-8 h-8 relative group flex items-center justify-center"
        >
          <MdOutlineCreateNewFolder className="w-6 h-6" />

          <span className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-400 px-2 text-white rounded">
            Create
          </span>
        </button>
      ),
    },
    {
      name: "Profile",
      active: authStatus,
      component: (
        <button
          onClick={() => setProfilePopup(true)}
          className="text-gray-700 hover:bg-gray-200 rounded-full w-8 h-8 relative group flex items-center justify-center"
        >
          <img src={avatar} alt="" className="w-6 h-6 rounded-full" />
          <span className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-400 px-2 text-white rounded">
            Create
          </span>
        </button>
      ),
    },
  ];

  const handleLogout = async () => {
    try {
      const res = await axiosPrivate.post("/api/v1/users/logout");
      // console.log(res.status);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="main-nav px-2 py-2 md:px-10 h-16 flex justify-between items-center bg-white sticky top-0 z-10">
      <div className="nav-left flex items-center gap-20">
        <div className="menu">
          <Link to="/">
            <img src="download.png" alt="" className="w-9" />
          </Link>
        </div>
        <div className="logo">
          <Link to="/">
            <img src="logo.jpg" alt="" className="w-10" />
          </Link>
        </div>
      </div>
      <div className="nav-middle ">
        <div className="flex search-box border border-solid border-gray-300 rounded-full mr-4 px-3 py-2">
          <input
            type="text"
            placeholder="search"
            className="ml-8 w-400 border-none outline-none bg-transparent"
          />
          <img src="search.png" alt="" className="w-4 h-4 mt-1" />
        </div>
      </div>
      <div className="nav-right">
        <div className="far-right flex">
          {!authStatus && (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </button>
          )}
          {authStatus &&
            navItems
              .filter((item) => item.active)
              .map((item) => (
                <div key={item.name} className="dropdown">
                  {<div>{item.component}</div>}
                </div>
              ))}
        </div>

        {/* Create popup */}
        {createPopupOpen && (
          <div className="create-popup fixed bg-white shadow-md rounded-md right-5 top-5 w-48">
            <button
              onClick={() => setCreatePopupOpen(false)}
              className="flex absolute top-0 right-0 hover:bg-gray-100 rounded-md rounded-t-none"
            >
              <IoIosClose className="h-7 w-7 text-gray-400" />
            </button>
            <div className="flex flex-col p-4">
              <div>
                <button
                  onClick={() => setUploadVideoPopup((prev) => !prev)}
                  className="w-full text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 flex items-center p-2 gap-2"
                >
                  <GoVideo className="h-6 w-6 mr-2 flex-none" />
                  <span className="text-[15px]">Upload video</span>
                </button>
                {uploadVideoPopup && (
                  <UploadVideo setUploadVideoPopup={setUploadVideoPopup} />
                )}
              </div>
              <Link to="/createpost">
                <button className="w-full py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300">
                  Create Post
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Profile popup */}
        {profilePopup && (
          <div className="create-popup fixed bg-white shadow-md rounded-md right-5 top-5 w-52">
            <button
              onClick={() => setProfilePopup(false)}
              className="flex absolute top-0 right-0 hover:bg-gray-100 rounded-md rounded-t-none"
            >
              <IoIosClose className="h-7 w-7 text-gray-400" />
            </button>
            <div className="flex flex-col p-4">
              <div className="flex gap-3 items-center justify-center">
                <div className="avatar">
                  <img src={avatar} alt="" className="w-7 h-7 rounded-full" />
                </div>
                <div className="flex flex-col ">
                  <h3 className="">{fullname}</h3>
                  <h3 className="mb-2">{"@" + username}</h3>
                  {/* Use a method for internal navigation within the modal */}
                  <Link
                    to="/profile"
                    onClick={() => {
                      setProfilePopup(false);
                    }}
                    className="text-sm text-cyan-600"
                  >
                    View Your Channel
                  </Link>
                </div>
              </div>
              <div className="h-px bg-gray-700 my-4 w-full"></div>
              <button
                onClick={() => {
                  handleLogout();
                  setProfilePopup(false);
                }}
                className="w-full py-2 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
