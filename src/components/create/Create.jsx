import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Create.css";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const Create = () => {
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
        <MdOutlineCreateNewFolder className="create-icon" />
      </Link>
      {modal && (
        <div className="modal-wrapper">
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
