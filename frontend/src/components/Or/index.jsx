import React from "react";
import "./Or.css";

function Or(props) {
  const { className } = props;

  return (
    <div className={`or ${className || ""}`}>
      <div className="rectangle-80 border-1px-dove-gray"></div>
      <img className="or-1" src="/img/or-1@1x.png" />
      <div className="rectangle-81 border-1px-dove-gray"></div>
    </div>
  );
}

export default Or;
