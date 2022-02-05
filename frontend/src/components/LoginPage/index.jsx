import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import HmsIconScreen from "../HmsIconScreen";
import PswdIcon from "../PswdIcon";
import "./LoginPage.css";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { loginUser } from '../../actions/userActions'

function LoginPage(props)  {
  const {
    bottomSemi,
    topQuarter,
    login,
    path124,
    path125,
    logIn,
    inputType1,
    inputPlaceholder1,
    user_1_,
    inputType2,
    inputPlaceholder2,
    inputType3,
    inputPlaceholder3,
    forgotPassword,
    hmsIconScreenProps,
    pswdIconProps,
    location,
    history
  } = props;

  const [email, setEmail] = useState('')
  // const [emailErr, setEmailErr] = useState('')

  const [password, setPassword] = useState('')  
  // const [blank, setBlank] = useState('')
  
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location?.search? location?.search.split('=')[1] : '/'

  //this isto redirect if already logged in
  useEffect(()=> {
    if(userInfo){
      navigate('/login-successful')
    }
  },[history, userInfo, redirect, navigate])

  const submitHandler = (e) => {
      // const form = e.currentTarget;
      // if (form.checkValidity() === false) {
      //   e.preventDefault();
      //   e.stopPropagation();
      // } else {
        console.log(email, password)
        e.preventDefault()
      // //dispatch Login
      dispatch(loginUser(email, password))
      // }

      // setValidated(true);
  }
  

  return (
    <>
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <Loader />}
    <div className="container-center-horizontal">
      <div className="login-page screen">
        <div className="overlap-group2-2">
          <div className="rectangle-1-4"></div>
          <img className="bottom-semi-4" src={bottomSemi} />
          <img className="top-quarter-4" src={topQuarter} />
          <HmsIconScreen pathContainer={hmsIconScreenProps.pathContainer} />
          {/*<Link to="/login-successful">*/}
            <div className="login-button">
              <div className="login montserrat-semi-bold-white-23px" onClick={(e) => submitHandler(e)} >{login}</div>
            </div>
          {/*</Link>*/}
          <div className="login-icon">
            <div className="running">
              <div className="path-container-11">
                <img className="path-124-1" src={path124} />
                <img className="path-125-1" src={path125} />
              </div>
            </div>
            <img className="log-in" src={logIn} />
          </div>
          <div className="rectangle-78"></div>
          <div className="rectangle-79"></div>
          <input
            className="username montserrat-medium-black-18px"
            name="username-8"
            placeholder={inputPlaceholder1}
            type={inputType1}            
            value={email}
            onChange = {(e)=> {
              setEmail(e.target.value)
              console.log(email)
            }} 
            required
          />
          <div className="user-icon">
            <img className="user-_1_" src={user_1_} />
          </div>
          <input
            className="password-1 montserrat-medium-black-18px"
            name="password-10"
            placeholder={inputPlaceholder2}
            type={inputType2}
            value={password}
            onChange = {(e)=> {setPassword(e.target.value)}}
            required
          />
          <input
            className="show-2 montserrat-semi-bold-red-devil-14px"
            name="show11"
            placeholder={inputPlaceholder3}
            type={inputType3}            
            required
          />
          <PswdIcon className={pswdIconProps.className} />
          <Link to="/forgot-password">
            <img className="forgot-password-2" src={forgotPassword} />
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
