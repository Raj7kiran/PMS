import React from "react";
import { Link } from "react-router-dom";
import HmsIconScreen from "../HmsIconScreen";
import Or from "../Or";
import "./ForgotPassword.css";

function ForgotPassword(props) {
  const {
    bottomSemi,
    topQuarter,
    sendOtp,
    path127,
    path128,
    path129,
    path130,
    inputType1,
    inputPlaceholder1,
    padlock,
    inputType2,
    inputPlaceholder2,
    path131,
    path132,
    forgotPassword,
    cancel,
    hmsIconScreenProps,
    orProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="forgot-password screen">
        <div className="overlap-group2-1">
          <div className="rectangle-1-2"></div>
          <img className="bottom-semi-2" src={bottomSemi} />
          <img className="top-quarter-2" src={topQuarter} />
          <HmsIconScreen pathContainer={hmsIconScreenProps.pathContainer} />
          <Link to="/otp-verification">
            <div className="send-otp-1">
              <div className="send-otp-2 montserrat-semi-bold-white-23px">{sendOtp}</div>
            </div>
          </Link>
          <div className="email-bg-1"></div>
          <div className="email-icon">
            <div className="email-_1_">
              <div className="path-container-9">
                <img className="path-127" src={path127} />
                <img className="path-128" src={path128} />
                <img className="path-129" src={path129} />
                <img className="path-130" src={path130} />
              </div>
            </div>
          </div>
          <input
            className="enter-email montserrat-medium-black-18px"
            name="enter-email-7"
            placeholder={inputPlaceholder1}
            type={inputType1}
            required
          />
          <Or className={orProps.className} />
          <div className="mobile-bg-3"></div>
          <div className="mobile-icon">
            <img className="padlock" src={padlock} />
          </div>
          <input
            className="enter-mobile-number montserrat-medium-black-18px"
            name="enter-mobile-number-11"
            placeholder={inputPlaceholder2}
            type={inputType2}
            required
          />
          <div className="forgot-password-title">
            <div className="forgot-password-_1_">
              <img className="path-131" src={path131} />
              <img className="path-132" src={path132} />
            </div>
            <img className="forgot-password-1" src={forgotPassword} />
          </div>
          <Link to="/login-page">
            <div className="cancel-2 montserrat-semi-bold-black-16px">{cancel}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
