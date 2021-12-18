import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import './loginapp.css'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'


const NewLoginScreen = ({location}) => {
	const [values, setValues] = useState({
		email: "",
		password:""    	
	})

	let navigate = useNavigate()
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location?.search? location?.search.split('=')[1] : '/'

	//this isto redirect if already logged in
	useEffect(()=> {
		if(userInfo){
			navigate(redirect)
		}
	},[userInfo, redirect, navigate])

	const inputs = [
		{
	      	id: 1,
	      	name: "email",
	      	type: "email",
	      	placeholder: "Email",
	      	errorMessage: "Enter a valid email address!",
	      	label: "Email",
	      	required: true,
	    },
	    {
	      id: 2,
	      name: "password",
	      type: "password",
	      placeholder: "Password",
	      errorMessage:
	        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
	      label: "Password",
	      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
	      required: true,
	    },		
	]

	const submitHandler = (e) => {
		e.preventDefault()
		//console.log(values.email, values.password)
		dispatch(login(values.email, values.password))
	}

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	return(
		<>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			{userInfo ? ('') 
				: (
				<div className='logapp'>
					<form className='loginform' onSubmit = {submitHandler}>
						<h1>Login</h1>
						{inputs.map((input) => (
							<FormInput 
								key={input.id}
								{...input}
								value={values[input.name]}
								onChange={onChange}
							/>
							))}
							<button className='loginbutton'>Login</button>
					</form>
				</div>
				)}	
		</>	
		)
}


export default NewLoginScreen