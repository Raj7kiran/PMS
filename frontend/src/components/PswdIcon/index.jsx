import React from "react";
import "./PswdIcon.css";

function PswdIcon(props) {
  const { className } = props;

  return (
    <div className={`pswd-icon ${className || ""}`}>
      <div className="lock-_2"></div>
    </div>
  );
}

export default PswdIcon;
