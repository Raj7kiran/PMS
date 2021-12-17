import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'


const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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

	const submitHandler = (e) => {
		e.preventDefault()
		//dispatch Login
		dispatch(login(email, password))
	}

	return(
		<>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			{userInfo ? ('') 
				: (
					<FormContainer>
						<h1>Login</h1>
						<Form onSubmit ={submitHandler}>
							<Form.Group className="mb-3" controlId='email'>
								<FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
									<Form.Control 	type="email"  placeholder="name@example.com"
													value={email}
													onChange = {(e)=> setEmail(e.target.value)} 
												/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group className="mb-3" controlId='password'>
							  	<FloatingLabel controlId="floatingPassword" label="Password">
							    	<Form.Control 	type="password" placeholder="Password"
							    					value={password}
													onChange = {(e)=> setPassword(e.target.value)}
							    	 />
							  	</FloatingLabel>
							</Form.Group>
							<Button type='submit' variant='secondary'>
								Login
							</Button>
						</Form>
					</FormContainer>
					)}	
			</>	
		)
}

export default LoginScreen