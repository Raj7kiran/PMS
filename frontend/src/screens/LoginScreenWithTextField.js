import React, { useState } from 'react'
import TextField from '../components/textfield'

function isRequired(val) {
	return val.length > 0 ? '' : 'cannot be blank'
}

function isEmail(val) {
	const ai = val.indexOf('@');
	const gdi = val.split('').reduce((acc, char, i) => (char === '.' ? i : acc ),0);
	return ai > -1 && gdi > ai ? '' : 'must be an email'
}

const defaultValues = {
		name: '',
		email: ''
	}

const defaultErrors = {
		name: [],
		email: []
	}

const LoginScreen = () => {
	const [values, setValues] = useState(defaultValues)
	const [errors, setErrors] = useState(defaultErrors)

	return (
		<div className='container'>
			<TextField
				label = 'Name'
				name='name'
				value = { values.name }
				onChange = {(val) => {
					const name = val
					setValues(prev => ({
								...prev,
								name
							}))
				}}
				validations = {[isRequired]}
				errors = {errors.name}
				setErrors = {setErrors}
			/>
			<TextField
				label = 'Email'
				name='email'
				value = { values.email }
				onChange = {(val) => {
					const email = val
					setValues(prev => ({
								...prev,
								email
							}))
				}}
				validations = {[isRequired, isEmail]}
				errors = {errors.email}
				setErrors = {setErrors}
			/>
		</div>
		)
	
}


export default LoginScreen