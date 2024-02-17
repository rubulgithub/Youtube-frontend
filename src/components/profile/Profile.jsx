import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./Profile.css";
import ProfileModal from "../modal/ProfileModal.jsx";

const Profile = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="profile">
      <Link onClick={() => setModal(true)}>
        {" "}
        {/* Use `to` prop for accessibility */}
        <CgProfile className="create-icon" />
      </Link>
      {modal && <ProfileModal toggleModal={() => setModal(false)} />}
    </div>
  );
};

export default Profile;
