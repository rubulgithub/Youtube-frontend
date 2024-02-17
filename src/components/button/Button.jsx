import React from "react";
import "./Button.css";
export default function Button({ children, ...props }) {
  return (
    <div className="button-class">
      <button {...props}>{children}</button>
    </div>
  );
}
