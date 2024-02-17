import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "../notification/Notification.jsx";
import Create from "../create/Create.jsx";
import Profile from "../profile/Profile.jsx";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Sign in",
      slug: "/signin",
      active: !authStatus,
    },
    {
      name: "Notification",
      active: authStatus,
      component: <Notification />,
    },
    {
      name: "Create",
      active: authStatus,
      component: <Create />,
    },
    {
      name: "Profile",
      active: authStatus,
      component: <Profile />,
    },
  ];
  return (
    <nav className="main-nav">
      <div className="nav-left">
        <div className="menu">
          <Link to="/">
            <img src="download.png" alt="" />
          </Link>
        </div>
        <div className="logo">
          <Link to="/">
            <img src="logo.jpg" alt="" />
          </Link>
        </div>
      </div>
      <div className="nav-middle">
        <div className="search-box">
          <input type="text" placeholder="search" />
          <img src="search.png" alt="" />
        </div>
      </div>
      <div className="nav-right">
        <div className="far-right">
          <div className="far-right">
            {!authStatus && (
              <button
                onClick={() => {
                  navigate("/signin");
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
        </div>
      </div>
    </nav>
  );
};

export default Header;
