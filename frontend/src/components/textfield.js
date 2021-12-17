import React, { useState, useRef } from 'react'

const TextField  = ({name, label,value, onChange, validations, errors, setErrors}) =>{
	const [focused, setFocused] = useState(false)
	const ref = useRef(null)

	function validate(validations) {
		setErrors((prev) => ({
				...prev,
				[name] : validations.map((errorsFor) => errorsFor(value)).filter(errorMsg => errorMsg.length>0)			
				
				}))
	}

	return (
			<div>
				<div className={`form-field ${focused ? 'is-focused' : ''} ${value.length > 0 ? 'has-value' : '' }`} >
					<div className='control'>
						<label onClick={() => ref.current.focus()} >{label}</label>
						<input
							ref={ref} 	
							type='text'
							value={value}
							onChange={(e) => onChange(e.target.value)}
							onFocus={() => setFocused(true) }
							onBlur = {() => {
								setFocused(false)
								validate(validations)
							}}
						/>
					</div>
					{
						errors.length > 0 
						? <div className='has-error'>{errors.join(', ')}</div>
						: null
					}
				</div>
			</div>
		)
}


export default TextField