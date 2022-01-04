import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'


const LoginScreen = ({ location, history }) => {
	const [validated, setValidated] = useState(false);

	const [email, setEmail] = useState('')
	const [emailErr, setEmailErr] = useState('')

	const [password, setPassword] = useState('')	
	const [blank, setBlank] = useState('')
	
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
	},[history, userInfo, redirect, navigate])

	const isRequired = (data) => {
		if(!data){
			setBlank('This cannot be left blank')
			// setInCorrect(true)
		} else {
			setBlank('')
			// setInCorrect(false)
			// setCorrect(true)
		}
	}

	const valEmail = (email) => {
		// if(email.split('@').length == 1)
		if(!new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){			
			setEmailErr('Email is invalid')
			// setInCorrect(true)
			console.log(emailErr)
		}  else {
			setEmailErr('')
			// setInCorrect(false)
			// setCorrect(true)
		}
		
	}

	
	// const handleSubmit = (event) => {
	//     const form = event.currentTarget;
	//     if (form.checkValidity() === false) {
	//       event.preventDefault();
	//       event.stopPropagation();
	//     }

	//     setValidated(true);
	//   };

	  const submitHandler = (e) => {
	  	const form = e.currentTarget;
	    if (form.checkValidity() === false) {
	      e.preventDefault();
	      e.stopPropagation();
	    } else {
	    	e.preventDefault()
			// //dispatch Login
			dispatch(login(email, password))
	    }

	    setValidated(true);
	}
	

	return(
		<>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			{userInfo ? ('') 
				: (
					<FormContainer>
						<h1>Login</h1>
						<Form onSubmit ={submitHandler} validated={validated} noValidate className="mb-3 validated-form" >
							<Form.Group className="mb-3" controlId='email'>
								<FloatingLabel controlId="floatingInput" label="Email address" >
									<Form.Control 	type="email"  placeholder="name@example.com"
													// className={`${emailErr.length>1 ? 'inCorrect' : null}`}													
													value={email}
													onChange = {(e)=> {
														setEmail(e.target.value)
													}} 
													onBlur = {(e) => valEmail(e.target.value)}
													required
													isInvalid={!!emailErr}
												/>
								</FloatingLabel>
								{emailErr.length>1 ? (<div className='errMsg'>{emailErr}</div>): null}
							</Form.Group>
							<Form.Group className="mb-3" controlId='password'>
							  	<FloatingLabel controlId="floatingPassword" label="Password">
							    	<Form.Control 	type="password" placeholder="Password"
													// className={`${blank.length>1 ? 'inCorrect' : null}`}
							    					value={password}
													onChange = {(e)=> {setPassword(e.target.value)}}
													onBlur = {(e) => isRequired(e.target.value)}
													required
													isInvalid={!!blank}
							    	 />
							  	</FloatingLabel>
								{blank.length>1 ? (<div className='errMsg'>{blank}</div>): null}
							</Form.Group>
							
							<Button type='submit' variant='secondary' className={`${emailErr || blank ? 'disabled' : ''}`} >
								Login
							</Button>
						</Form>
					</FormContainer>
					)}	
			</>	
		)
}

export default LoginScreen