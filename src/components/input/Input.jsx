import React from "react";
import "./Input.css";

const Input = ({ label, type = "text", className = "", ...props }) => {
  return (
    <div className="container">
      {label && <label className="label-class">{label}</label>}
      <input type={type} className={`input-class`} {...props} />
    </div>
  );
};

export default Input;
