import React from "react";
import { Link } from "react-router-dom";
import HmsIconScreen from "../HmsIconScreen";
import PswdIcon from "../PswdIcon";
import "./ResetPassword.css";

function ResetPassword(props) {
  const {
    bottomSemi,
    topQuarter,
    submit,
    inputType1,
    inputPlaceholder1,
    inputType2,
    inputPlaceholder2,
    path143,
    path144,
    path145,
    path146,
    resetPassword,
    inputType3,
    inputPlaceholder3,
    inputType4,
    inputPlaceholder4,
    cancel,
    hmsIconScreenProps,
    pswdIconProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="reset-password screen">
        <div className="overlap-group2">
          <div className="rectangle-1-1"></div>
          <img className="bottom-semi-1" src={bottomSemi} />
          <img className="top-quarter-1" src={topQuarter} />
          <HmsIconScreen pathContainer={hmsIconScreenProps.pathContainer} />
          <Link to="/login-page">
            <div className="send-otp">
              <div className="submit montserrat-semi-bold-white-23px">{submit}</div>
            </div>
          </Link>
          <div className="email-bg"></div>
          <input
            className="confirm-new-password montserrat-medium-black-18px"
            name="confirm-new-password6"
            placeholder={inputPlaceholder1}
            type={inputType1}
            required
          />
          <div className="mobile-bg-2"></div>
          <input
            className="new-password montserrat-medium-black-18px"
            name="new-password8"
            placeholder={inputPlaceholder2}
            type={inputType2}
            required
          />
          <PswdIcon />
          <PswdIcon className={pswdIconProps.className} />
          <div className="reset-password-title">
            <div className="reset">
              <div className="path-container-8">
                <img className="path-143" src={path143} />
                <img className="path-144" src={path144} />
                <img className="path-145" src={path145} />
              </div>
              <img className="path-146" src={path146} />
            </div>
            <img className="reset-password-1" src={resetPassword} />
          </div>
          <input
            className="show montserrat-semi-bold-red-devil-14px"
            name="show12"
            placeholder={inputPlaceholder3}
            type={inputType3}
            required
          />
          <input
            className="show-1 montserrat-semi-bold-red-devil-14px"
            name="show13"
            placeholder={inputPlaceholder4}
            type={inputType4}
            required
          />
          <Link to="/login-page">
            <div className="cancel-1 montserrat-semi-bold-black-16px">{cancel}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
