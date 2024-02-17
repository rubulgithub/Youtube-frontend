import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Notification.css";
import { IoMdNotificationsOutline } from "react-icons/io";

const Notification = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="create">
      <Link className="btn-modal" onClick={toggleModal}>
        <IoMdNotificationsOutline className="create-icon" />
      </Link>
      {modal && (
        <div className="modal-wrapper">
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Hello Modal</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
