import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'


const AnotherLoginScreen = ({ location, history }) => {
	const [ form, setForm ] = useState({})
	const [ errors, setErrors ] = useState({})

	const setField = (field, value) => {
	    setForm({
	      ...form,
	      [field]: value
	    })
	  }

	 const findFormErrors = () => {
	 	const { email, password } = form
	 	console.log(form)
    	const newErrors = {}

    	
    	if(!email || email === '') {
    		console.log('one')
    		newErrors.email = 'Cant be blank'
    	}
    	
    	if ( !password || password === '' ) {
    		console.log('three')
    		newErrors.password = 'Cant be blank'
    	}

    	return newErrors
	 }

	 const checkError = () => {

		const newErrors = findFormErrors()
		console.log(newErrors)
	    // Conditional logic:
	    if ( Object.keys(newErrors).length > 0 ) {
	      // We got errors!
	      setErrors(newErrors)
	    } else {
	      setErrors('')
	    }
	 }



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
		dispatch(login(form.email, form.password))

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
							<Form.Group className="mb-3" controlId='email' className="mb-3">
								<FloatingLabel controlId="floatingInput" label="Email address" >
									<Form.Control 	type="email"  placeholder="name@example.com"
													className={`${errors.email ? 'inCorrect' : null}`}																									
													value={form.email}
													onChange={ e => setField('email', e.target.value) } 
													onBlur = {(e) => checkError(e.target.value)}
													// isInvalid={ !!errors.email }
												/>
								</FloatingLabel>
								{errors.email ? (<div className='errMsg'>{errors.email}</div>): null}
							</Form.Group>
							<Form.Group className="mb-3" controlId='password'>
							  	<FloatingLabel controlId="floatingPassword" label="Password">
							    	<Form.Control 	type="password" placeholder="Password"
													className={`${errors.password ? 'inCorrect' : null}`}													
							    					value={form.password}
													onChange={ e => setField('password', e.target.value) }
													onBlur = {(e) => checkError(e.target.value)}
													// isInvalid={ !!errors.password }
							    	 />
							  	</FloatingLabel>
									{errors.password? (<div className='errMsg'>{errors.password}</div>): null}
							</Form.Group>

							<Button type='submit' variant='secondary' className={`${errors.length>0 ? 'disabled' : null}`} >
								Login
							</Button>
						</Form>
					</FormContainer>
					)}	
			</>	
		)
}

export default AnotherLoginScreen