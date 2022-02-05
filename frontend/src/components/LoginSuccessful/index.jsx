import React from "react";
import { Link } from "react-router-dom";
import HmsIconScreen from "../HmsIconScreen";
import { useDispatch, useSelector } from 'react-redux'
import "./LoginSuccessful.css";
import { logout } from '../../actions/userActions'

function LoginSuccessful(props) {
  const { bottomSemi, topQuarter, path124, path125, loginSuccessful, logOut, hmsIconScreenProps } = props;

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className="container-center-horizontal">
      <div className="login-successful screen">
        <div className="overlap-group3-1">
          <div className="rectangle-1-3"></div>
          <img className="bottom-semi-3" src={bottomSemi} />
          <img className="top-quarter-3" src={topQuarter} />
          <HmsIconScreen pathContainer={hmsIconScreenProps.pathContainer} />
          <div className="path-container-10">
            <img className="path-124" src={path124} />
            <img className="path-125" src={path125} />
          </div>
          <img className="login-successful-1" src={loginSuccessful} />
          {/*<Link to="/login-page">*/}
            <div className="log-out montserrat-semi-bold-black-16px" onClick={logoutHandler}>{logOut}</div>
          {/*</Link>*/}
        </div>
      </div>
    </div>
  );
}

export default LoginSuccessful;
