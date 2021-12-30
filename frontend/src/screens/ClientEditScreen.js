import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, FloatingLabel, Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPackages } from '../actions/adminActions'
import { getUserDetails, updateUser } from '../actions/userActions'
import { getStatesName, getCity } from '../actions/dropActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const ClientEditScreen = ({match}) => {
	const { id } = useParams()

	const userId = id

	const [ firstName, setFirstName ] = useState('')
	const [ fnErr, setFnErr ] = useState('')

	const [ lastName, setLastName ] = useState('')
	const [ lnErr, setLnErr ] = useState('')

	const [ email, setEmail ] = useState('')
	const [ emailErr, setEmailErr ] = useState('')

	const [ password, setPassword ] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('');


	const [ company, setCompany ] = useState('')
	const [ compErr, setCompErr ] = useState('')

	const [ pack, setPack ] = useState('')
	const [ packErr, setPackErr ] = useState('')	

	const [ role, setRole ] = useState('')
	const [ roleErr, setRoleErr ] = useState('')	

	const [ city, setCity ] = useState('')
	const [ stateName, setStateName ] = useState('')
	
	const [ phone, setPhone ] = useState('')
	const [ phoneErr, setPhoneErr ] = useState('')

	const [ zipcode, setZipcode ] = useState('')
	const [ zipErr, setZipErr ] = useState('')

	const [ gender, setGender ] = useState('')
	const [ address, setAddress ] = useState('')
	const [ dob, setDob ] = useState('')
	const [ isAdmin, setIsAdmin ] = useState(false)
	const [ isClientAdmin, setIsClientAdmin] = useState(false)
	// const [ message, setMessage ] = useState(null)

	const FN = (data) => {
		if(data.length<5 || data.length>50){ setFnErr('Required: 5-50 charcters')} 
			else {setFnErr('')}
	}

	const FN1 = (data) => {
		if(data.length > 50){setFnErr('Should not exceed 50 charcters')}
		 else {
			setFirstName(data)
			// console.log(data)
			setFnErr('')
		}
	}

	const LN = (data) => {
		if(data.length<1 || data.length>15) { setLnErr('Required: 1-15 charcters') } 
			else { setLnErr('') }
	}

	const LN1 = (data) => {
		if(data.length > 15){setLnErr('Should not exceed 15 charcters')}
		 else {
			setLastName(data)
			// console.log(data)
			setLnErr('')
		}
	}

	const CP = (data) => {
		if(data.length<5 || data.length>35) { setCompErr('Required: 5-35 charcters') } 
			else { setCompErr('') }
	}

	const CP1 = (data) => {
		if(data.length > 35){setCompErr('Should not exceed 35 charcters')}
		 else {
			setCompany(data)
			// console.log(data)
			setCompErr('')
		}
	}

	const PK = (data) => {
		if(!data){
			setPackErr('Please Select a package')
		}else{
			setPackErr('')
		}
	}

	const RL = (data) => {
		if(!data){
			setRoleErr('Please Select a Role')
		}else{
			setRoleErr('')
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

	const valPhone = (data) => {		
		if(!new RegExp( /^\d{12}$/).test(data)){			
			setPhoneErr('Required: 2-digit country code and 10-digit phone number')
			console.log(phoneErr)
		}  else {
			setPhoneErr('')
		}		
	}

	const ZP = (data) => {
		if(data.length > 6){setZipErr('Required: 6-digit zipcode')}
		 else {
			setZipcode(data)
			// console.log(data)
			setPhoneErr('')
		}
	}

	const valZip = (data) => {		
		if(!new RegExp( /^\d{6}$/).test(data)){			
			setZipErr('Required: 6-digit zipcode')
			console.log(phoneErr)
		}  else {
			setZipErr('')
		}		
	}

	const PH = (data) => {
		if(data.length > 12){setPhoneErr('Required: 2-digit country code and 10-digit phone number')}
		 else {
			setPhone(data)
			// console.log(data)
			setPhoneErr('')
		}
	}

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const packageList = useSelector(state => state.packageList)
	// const { loading : loadingPackage , error: errorPackage , packages } = packageList
	const { packages } = packageList

	const stateList = useSelector((state) => state.stateList)
	// const { success:stateSuccess , states } = stateList
	const {  states } = stateList

	const cityList = useSelector((state) => state.cityList)
	// const { success:citySuccess , cities } = cityList
	const {  cities } = cityList

	const userUpdate = useSelector((state) => state.userUpdate)
	const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

	useEffect(() => {	
			dispatch(listPackages())
			dispatch(getStatesName())

			if(successUpdate){
				dispatch({ type:USER_UPDATE_RESET })
				if(userInfo.isAdmin){
					navigate('/admin/clientlist')
				} else {
					navigate('/userlist')
				}				
			}

			if(!user.firstName || user._id !== userId )
				{
						dispatch(getUserDetails(userId))				
				} 
				else{
				// console.log(user)
				setFirstName(user.firstName)
				setLastName(user.lastName)
				setEmail(user.email)
				setCompany(user.company)
				setPack(user.package)
				setRole(user.role)
				setCity(user.city)
				setPhone(user.phone)
				setZipcode(user.zipcode)
				setGender(user.gender)
				setDob(user.dob)
				setIsAdmin(user.isAdmin)
				setIsClientAdmin(user.isClientAdmin)		
			}
	},[navigate, dispatch,user, userId, userInfo, successUpdate])

	const callCity = (value) => {		
		// console.log(value)
		dispatch(getCity(value))
	}


	const submitHandler = (e) => {
		e.preventDefault()
		console.log(role)
		
		console.log('dob' + dob)
		console.log('update user by id')
		console.log(user._id)
		dispatch(updateUser({ 
				id: user._id, firstName, lastName, email, password, role, city, state: stateName,
				phone, zipcode, gender, dob, isAdmin, isClientAdmin  
			}))			
		
		// console.log('dob')
		// console.log(dob)
	}

	
	return (
		<>
		
		<Link to='/admin/clientlist' className='btn btn-dark my-3'>Go Back</Link>
		<div>
			<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{ loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
						<Form onSubmit={submitHandler}>
						<Row>
							<Col>
								<Form.Group className="mb-3" controlId='firstName'>
									<FloatingLabel controlId="floatingInput" label="First Name" >
										<Form.Control 	type="name"  placeholder="firstName"
														className={`${fnErr.length>1 ? 'inCorrect' : null}`}
														value={firstName}
														onChange = {(e)=> FN1(e.target.value)}
														onBlur = {(e) => FN(e.target.value)}
														
													/>
									</FloatingLabel>
									{fnErr.length>1 ? (<div className='errMsg'>{fnErr}</div>): null}
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3" controlId='lastName' className="mb-3">
									<FloatingLabel controlId="floatingInput" label="Last Name" >
										<Form.Control 	type="name"  placeholder="lastName"
														className={`${lnErr.length>1 ? 'inCorrect' : null}`}
														value={lastName}
														onChange = {(e)=> LN1(e.target.value)}
														onBlur = {(e) => LN(e.target.value)}
														
													/>
									</FloatingLabel>
									{lnErr.length>1 ? (<div className='errMsg'>{lnErr}</div>): null}
								</Form.Group>
							</Col>				
								
							
						</Row>	
							<Form.Group className="mb-3" controlId='email'>
									<FloatingLabel controlId="floatingInput" label="Email address" >
										<Form.Control 	type="email"  placeholder="name@example.com"
														className={`${emailErr.length>1 ? 'inCorrect' : null}`}													
														value={email}
														onChange = {(e)=> {setEmail(e.target.value)}} 
														onBlur = {(e) => valEmail(e.target.value)}
														
													/>
									</FloatingLabel>
									{emailErr.length>1 ? (<div className='errMsg'>{emailErr}</div>): null}
								</Form.Group>

								<Row>
									<Col>
										<Form.Group className="mb-3" controlId='password'>
											<FloatingLabel controlId="floatingInput" label="Enter password" >
												<Form.Control type= 'password'
																placeholder='Enter password'
																value={password}
																onChange = {(e)=> setPassword(e.target.value)}
																
												>
												</Form.Control>
											</FloatingLabel>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group className="mb-3" controlId='confirmPassword'>
											<FloatingLabel controlId="floatingInput" label="Confirm password" >
												<Form.Control type= 'password'
																placeholder='Confirm password'
																value={confirmPassword}
																onChange = {(e)=> setConfirmPassword(e.target.value)}
																
												>
												</Form.Control>
											</FloatingLabel>
										</Form.Group>
									</Col>
								</Row>

								{ userInfo.isAdmin && (
									<>
									<Row>
										<Col>
											<Form.Group className="mb-3" controlId='company'>
												<FloatingLabel controlId="floatingInput" label="Company Name" >
													<Form.Control 	type="company"  placeholder="Company Name"
																	className={`${compErr.length>1 ? 'inCorrect' : null}`}	
																	value={company}
																	onChange = {(e)=> {CP1(e.target.value)}} 
																	onBlur = {(e) => CP(e.target.value)}
																	disabled 
																/>
												</FloatingLabel>
												{compErr.length>1 ? (<div className='errMsg'>{compErr}</div>): null}
											</Form.Group>
										</Col>
										<Col>
											<Form.Group controlId='package' className="mb-3">
												<FloatingLabel controlId="floatingSelect" label="Package">
													<Form.Control as='select' value={pack}
																  className={`${packErr.length>1 ? 'inCorrect' : null}`} 
																  onChange={(e) => setPack(e.target.value)}
																  onBlur = {(e) => PK(e.target.value)}
																  
																  >
														<option value=''>Select Package</option>
														{packages.map(pack => (
																<option value={pack.packageName} >{pack.packageName}</option>
															))   }
													</Form.Control>
												</FloatingLabel>
												{packErr.length>1 ? (<div className='errMsg'>{packErr}</div>): null}
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col>
											{/*<Form.Group controlId='isAdmin' className="mb-3">
												<Form.Label>Is the user a Admin?</Form.Label>
												<InputGroup >
													    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
													    						aria-label="Checkbox for following text input"
													    						checked={isAdmin}
													    						onChange = { (e) => setIsAdmin(e.target.checked)}
													    						disabled={editHand}
													     />
													 <FormControl aria-label="Text input with checkbox" />
												</InputGroup>
											</Form.Group>*/}
												<Form.Group className="mb-3" controlId='isAdmin' >
											    	<Form.Check type="checkbox" label="Is the user a Admin?"
											    				aria-label="Checkbox for following text input"
													    		checked={isAdmin}
														    	onChange = { (e) => setIsAdmin(e.target.checked)}
														    	
											    	 />
											 </Form.Group>
										</Col>
										<Col>
											{/*<Form.Group controlId='isClientAdmin' className="mb-3">
												<Form.Label>Is the user a Client Admin?</Form.Label>
												<InputGroup >
													    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
													    						checked={isClientAdmin}
													    						onChange = { (e) => setIsClientAdmin(e.target.checked) }
													    						disabled={editHand}
													     />
													 <FormControl aria-label="Text input with checkbox" />
												</InputGroup>
											</Form.Group>*/}
											<Form.Group className="mb-3" id="formGridCheckbox" controlId='isClientAdmin' className="mb-3">
											    	<Form.Check type="checkbox" label="Is the user a Client Admin?"
											    				aria-label="Checkbox for following text input"
													    		checked={isClientAdmin}
													    		onChange = { (e) => setIsClientAdmin(e.target.checked) }
													    		
											    	 />
											 </Form.Group>
										</Col>
									</Row>
									</>
								) }
							
								{ userInfo.isClientAdmin && (
									<>
										{/*<Form.Group className="mb-3" controlId='company'>
											<FloatingLabel controlId="floatingInput" label="Company Name" >
												<Form.Control 	type="company"  placeholder="Company Name"
																value={userInfo.company} disabled
																disabled														
															/>
											</FloatingLabel>
										</Form.Group>
*/}
										{/*<Form.Group controlId='isClientAdmin' className="mb-3">
											<Form.Label>Is the user a Client Admin?</Form.Label>
											<InputGroup >
												    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
												    						checked={isClientAdmin}
												    						onChange = { (e) => setIsClientAdmin(e.target.checked) }
												    						disabled={editHand}
												     />
												 <FormControl aria-label="Text input with checkbox" />
											</InputGroup>
										</Form.Group>*/}

										{/*<Form.Group className="mb-3" id="formGridCheckbox" controlId='isClientAdmin' className="mb-3">
										    	<Form.Check type="checkbox" label="Is the user a Client Admin?"
										    				aria-label="Checkbox for following text input"
												    		checked={isClientAdmin}
												    		onChange = { (e) => setIsClientAdmin(e.target.checked) }
												    		disabled={editHand}
										    	 />
										 </Form.Group>*/}

										<Row>
											<Col>
												<Form.Group controlId='role' className="mb-3">
													<FloatingLabel controlId="floatingSelect" label="Role">
														<Form.Control as='select' value={role} 
															className={`${roleErr.length>1 ? 'inCorrect' : null}`}
															onChange={(e) => setRole(e.target.value)}
															onBlur = {(e) => RL(e.target.value)}
															
															>
															<option value=''>Select Role</option>
															<option value='Role 1'>Role 1</option>
															<option value='Role 2'>Role 2</option>
															<option value='Role 3'>Role 3</option>
														</Form.Control>
													</FloatingLabel>
													{roleErr.length>1 ? (<div className='errMsg'>{roleErr}</div>): null}
											</Form.Group>
											</Col>
											<Col>
												<Form.Group controlId='gender' className="mb-3">
														<FloatingLabel controlId="floatingSelect" label="Gender">
															<Form.Control as='select' value={gender}
															
																onChange={(e) => setGender(e.target.value)}>
																<option value=''>Select Gender</option>
																<option value='Male'>Male</option>
																<option value='Female'>Female</option>
																<option value='Others'>Others</option>
															</Form.Control>
														</FloatingLabel>
												</Form.Group>
											</Col>
										</Row>									

										<Row>
											<Col>
												<Form.Group controlId='state'>
													<FloatingLabel controlId="floatingSelect" label="State">
														<Form.Control as='select' value={stateName} className="mb-3"
															onChange={(e) => {
																setStateName(e.target.value)
																callCity(e.target.value)																
															}}
															
															>
															<option value='option'>Select State</option>
															{states.map(st => (
																<option value={st.name}>{st.name}</option>
															))  }
														</Form.Control>
													</FloatingLabel>
											</Form.Group>
											</Col>
											<Col>
												<Form.Group controlId='city'>
													<FloatingLabel controlId="floatingSelect" label="City">
														<Form.Control as='select' value={city} className="mb-3"
															onChange={(e) => {setCity(e.target.value)}}
															>
															<option value='option'>Select City</option>
															{cities.map(city => (
																<option value={city.name}>{city.name}</option>
															))  }
														</Form.Control>
													</FloatingLabel>
											</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group className="mb-3" controlId='phone'>
													<FloatingLabel controlId="floatingInput" label="Phone" >
														<Form.Control 	type="phone"  placeholder="Phone"
																		className={`${phoneErr.length>1 ? 'inCorrect' : null}`}
																		value={phone}
																		onChange = {(e)=> PH(e.target.value)}
																		onBlur = {(e) => valPhone(e.target.value)}
																		
																	/>
													</FloatingLabel>
													{phoneErr.length>1 ? (<div className='errMsg'>{phoneErr}</div>): null}
												</Form.Group>
											</Col>
											<Col>
												<Form.Group className="mb-3" controlId='zipcode'>
													<FloatingLabel controlId="floatingInput" label="Zipcode" >
														<Form.Control 	type="zipcode"  placeholder="012345"
																		className={`${zipErr.length>1 ? 'inCorrect' : null}`}
																		value={zipcode}
																		onChange = {(e)=> ZP(e.target.value)}
																		onBlur = {(e) => valZip(e.target.value)}
																		
																	/>
													</FloatingLabel>
													{zipErr.length>1 ? (<div className='errMsg'>{zipErr}</div>): null}
												</Form.Group>
											</Col>
											<Col>
												<Form.Group className="mb-3" controlId='dob'>
													<FloatingLabel controlId="floatingInput" label="DOB" >
														<Form.Control 	type="date"  placeholder="dob"
																		value={dob}
																		onChange = {(e)=> setDob(e.target.value)}
																		
																	/>
													</FloatingLabel>
												</Form.Group>
											</Col>
										</Row>

										<Form.Group className='mb-3'>
											<FloatingLabel controlId="floatingTextarea2" label="Address">
											    <Form.Control
											      as="textarea"
											      placeholder="Address"
											      style={{ height: '100px' }}
											      value={address} 
												  onChange={(e) => setAddress(e.target.value)}
											    />
											</FloatingLabel>
										</Form.Group>
									</>
								)}
						
						<Button type='submit' onSubmit={submitHandler} variant='primary'
							className={`${emailErr || fnErr || lnErr || compErr || packErr || roleErr || phoneErr || zipErr ? 'disabled' : ''}  mx-3`}
						>Update</Button>					
													
					</Form>
				) }
				
			</div>
		</>
	)
}



export default ClientEditScreen