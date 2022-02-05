import React from "react";
import { Link } from "react-router-dom";
import HmsIconScreen from "../HmsIconScreen";
import Or from "../Or";
import "./OtpVerification.css";

function OtpVerification(props) {
  const {
    bottomSemi,
    topQuarter,
    verify,
    path147,
    path148,
    path149,
    path150,
    path151,
    path152,
    path153,
    path154,
    path155,
    otpVerification,
    youWillGetAOtpViaMobileNumber,
    phone,
    path156,
    path157,
    enterOtp,
    didnTReceivedOtp,
    resendOtp,
    inputType1,
    inputPlaceholder1,
    inputType2,
    inputPlaceholder2,
    inputType3,
    inputPlaceholder3,
    inputType4,
    inputPlaceholder4,
    cancel,
    hmsIconScreenProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="otp-verification screen">
        <div className="overlap-group3">
          <div className="rectangle-1"></div>
          <img className="bottom-semi" src={bottomSemi} />
          <img className="top-quarter" src={topQuarter} />
          <HmsIconScreen pathContainer={hmsIconScreenProps.pathContainer} />
          <Link to="/reset-password">
            <div className="verify">
              <div className="verify-1 montserrat-semi-bold-white-23px">{verify}</div>
            </div>
          </Link>
          <div className="enter-otp">
            <div className="mobile-bg-1"></div>
            <div className="mobile-bg"></div>
            <div className="mobile-bg"></div>
            <div className="mobile-bg"></div>
          </div>
          <div className="otp-verify-title">
            <div className="password">
              <div className="flex-col">
                <img className="path-147" src={path147} />
                <div className="path-container">
                  <img className="path-148" src={path148} />
                  <img className="path-1" src={path149} />
                  <img className="path-1" src={path150} />
                  <img className="path-151" src={path151} />
                </div>
              </div>
              <div className="path-container-1">
                <img className="path-152" src={path152} />
                <img className="path-153" src={path153} />
                <img className="path-154" src={path154} />
                <img className="path-155" src={path155} />
              </div>
            </div>
            <img className="otp-verification-1" src={otpVerification} />
          </div>
          <p className="you-will-get-a-otp-via-mobile-number montserrat-semi-bold-black-16px">
            {youWillGetAOtpViaMobileNumber}
          </p>
          <div className="phone-number">
            <div className="phone">{phone}</div>
            <div className="pencil-_1_">
              <div className="path-container-2">
                <img className="path-156" src={path156} />
                <img className="path-157" src={path157} />
              </div>
            </div>
          </div>
          <div className="enter-otp-1 montserrat-semi-bold-black-16px">{enterOtp}</div>
          <div className="d-otp-container">
            <div className="didnt-received-otp montserrat-semi-bold-black-16px">{didnTReceivedOtp}</div>
            <div className="resend-otp montserrat-semi-bold-red-devil-20px">{resendOtp}</div>
          </div>
          <input
            className="x0 montserrat-semi-bold-red-devil-20px"
            name="0-11"
            placeholder={inputPlaceholder1}
            type={inputType1}
            required
          />
          <input
            className="x0-1 montserrat-semi-bold-red-devil-20px"
            name="0-12"
            placeholder={inputPlaceholder2}
            type={inputType2}
            required
          />
          <input
            className="x0-2 montserrat-semi-bold-red-devil-20px"
            name="0-13"
            placeholder={inputPlaceholder3}
            type={inputType3}
            required
          />
          <input
            className="x0-3 montserrat-semi-bold-red-devil-20px"
            name="0-14"
            placeholder={inputPlaceholder4}
            type={inputType4}
            required
          />
          <Link to="/login-page">
            <div className="cancel montserrat-semi-bold-black-16px">{cancel}</div>
          </Link>
          <Or />
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
