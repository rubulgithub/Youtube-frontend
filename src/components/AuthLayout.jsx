import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup.jsx";

function AuthLayout({ children, authentication }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth?.status);

  useEffect(() => {
    if (!authentication && authStatus !== authentication) {
      return;
    }
  }, [authStatus, authentication, navigate]);

  if (authentication && authStatus !== authentication) {
    return <LoginPopup />;
  }

  return children;
}

export default AuthLayout;
