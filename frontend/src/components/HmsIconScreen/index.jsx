import React from "react";
import "./HmsIconScreen.css";

function HmsIconScreen(props) {
  const { pathContainer } = props;

  return (
    <div className="hms-icon-screen">
      <div className="overlap-group1">
        <div className="rectangle-77"></div>
        <img className="path-63" src="/img/path-63@1x.png" />
        <div className="hospital-sign">
          <div className="path-container-3" style={{ backgroundImage: `url(${pathContainer})` }}>
            <img className="path-37" src="/img/path-37@1x.png" />
            <img className="path-38" src="/img/path-38@1x.png" />
          </div>
        </div>
        <h1 className="title montserrat-semi-bold-white-40px">Healthiocre</h1>
      </div>
    </div>
  );
}

export default HmsIconScreen;
