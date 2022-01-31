import React, { useState, useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getSupplierDetails, updateSupplier} from '../actions/otherActions'
import { SUPPLIER_UPDATE_RESET } from '../constants/otherConstants'


const SupplierEditScreen = () => {
	const [validated, setValidated] = useState(false);

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	const supplierId = id


	const [supplierName, setSupplierName] = useState('')
	const [snErr, setSnErr] = useState('')

	const [supplierContact, setSupplierContact] = useState('')
	const [scErr, setScErr] = useState('')

	const [position, setPosition] = useState('')
	const [positionErr, setPositionErr] = useState('')

	const [email, setEmail] = useState('')
	const [emailErr, setEmailErr] = useState('')

	const [contactNumber, setContactNumber] = useState('')
	const [contactNumberErr, setContactNumberErr] = useState('')

	const [altContactNumber, setAltContactNumber] = useState('')
	const [altContactNumberErr, setAltContactNumberErr] = useState('')

	const [credit, setCredit] = useState('')
	const [creditErr, setCreditErr] = useState('')

	const [category, setCategory] = useState('')
	const [categoryErr, setCategoryErr] = useState('')

	const [address, setAddress] = useState('')
	const [houseno,setHouseno] = useState('')
	const [housenoErr,setHousenoErr] = useState('')

	const [street,setStreet] = useState('')
	const [streetErr,setStreetErr] = useState('')

	const [area,setArea] = useState('')
	const [areaErr,setAreaErr] = useState('')

	const SN = (data) => {
		if(data.length<5 || data.length>20){ setSnErr('Required: 5-20 charcters')} 
			else {setSnErr('')}
	}

	const SN1 = (data) => {
		if(data.length > 20){setSnErr('Should not exceed 20 charcters')}
		 else {
			setSupplierName(data)
			// console.log(data)
			setSnErr('')
		}
	}

	const SC = (data) => {
		if(data.length<5 || data.length>50){ setScErr('Required: 5-50 charcters')} 
			else {setScErr('')}
	}

	const SC1 = (data) => {
		if(data.length > 50){setScErr('Should not exceed 50 charcters')}
		 else {
			setSupplierContact(data)
			// console.log(data)
			setScErr('')
		}
	}

	const PO = (data) => {
		if(!data){
			setPositionErr('Please select a position')
		}else{
			setPositionErr('')
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

	const valContact = (data) => {		
		if(!new RegExp( /^\d{12}$/).test(data)){			
			setContactNumberErr('Required: 2-digit country code and 10-digit phone number')
			// console.log(phoneErr)
		}  else {
			setContactNumberErr('')
		}		
	}

	const contactCheck = (data) => {
		if(data.length > 12){setContactNumberErr('Required: 2-digit country code and 10-digit phone number')}
		 else {
			setContactNumber(data)
			// console.log(data)
			setContactNumberErr('')
		}
	}

	const valContact1 = (data) => {		
		if(!new RegExp( /^\d{12}$/).test(data)){			
			setAltContactNumberErr('Required: 2-digit country code and 10-digit phone number')
			// console.log(phoneErr)
		}  else {
			setAltContactNumberErr('')
		}		
	}

	const contactCheck1 = (data) => {
		if(data.length > 12){setAltContactNumberErr('Required: 2-digit country code and 10-digit phone number')}
		 else {
			setAltContactNumber(data)
			// console.log(data)
			setAltContactNumberErr('')
		}
	}

	const creditVal = (data) => {
		if(!data){
			setCreditErr('Please select a credit')
		}else{
			setCreditErr('')
		}
	}

	const categoryVal = (data) => {
		if(!data){
			setCategoryErr('Please select a category')
		}else{
			setCategoryErr('')
		}
	}

	const houseVal = (data) => {
		if(data.length<1 || data.length>10){ setHousenoErr('Required: 1-10 charcters')} 
			else {setHousenoErr('')}
	}

	const houseVal1 = (data) => {
		if(data.length > 10){setHousenoErr('Should not exceed 10 charcters')}
		 else {
			setHouseno(data)
			// console.log(data)
			setHousenoErr('')
		}
	}

	const streetVal = (data) => {
		if(data.length<5 || data.length>20){ setStreetErr('Required: 5-20 charcters')} 
			else {setStreetErr('')}
	}

	const streetVal1 = (data) => {
		if(data.length > 20){setStreetErr('Should not exceed 20 charcters')}
		 else {
			setStreet(data)
			// console.log(data)
			setStreetErr('')
		}
	}

	const areaVal = (data) => {
		if(data.length<5 || data.length>20){ setAreaErr('Required: 5-20 charcters')} 
			else {setAreaErr('')}
	}

	const areaVal1 = (data) => {
		if(data.length > 20){setAreaErr('Should not exceed 20 charcters')}
		 else {
			setArea(data)
			// console.log(data)
			setAreaErr('')
		}
	}

	
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const supplierDetails = useSelector((state) => state.supplierDetails)
	const { loading, error, supplier } = supplierDetails

	const supplierUpdate = useSelector((state) => state.supplierUpdate)
	const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = supplierUpdate
	
	// useEffect(()=>{
	// 	   setData(suppliers)
	// 	},[suppliers])	

	useEffect(() => {
		
		if(!userInfo){
			navigate('/login')
		} 
		setValidated(null)
			
		if(successUpdate){
			dispatch({ type:SUPPLIER_UPDATE_RESET })
			navigate('/supplier')						
		}

		if(!supplier.supplierName || supplier._id !== supplierId ){
				console.log('dispatch')
				dispatch(getSupplierDetails(supplierId))
			} else {
				setSupplierName(supplier.supplierName)			
				setSupplierContact(supplier.supplierContact)			
				setPosition(supplier.position)			
				setEmail(supplier.email)			
				setCredit(supplier.credit)			
				setCategory(supplier.category)			
				setContactNumber(supplier.contactNumber)			
				setAltContactNumber(supplier.altContactNumber)			
				setHouseno(supplier.houseno)			
				setStreet(supplier.street)			
				setArea(supplier.area)			
			}
	},[dispatch, navigate, supplier, supplierId, successUpdate, userInfo])

	const submitHandler = (e) => {		
		// setAddress(`${houseno}, ${street}, ${area}`)
		// console.log(`adress: ${address}`)

		const form = e.currentTarget;
	    if (form.checkValidity() === false) {
	      e.preventDefault();
	      e.stopPropagation();
	    } else {
	    	setValidated(true);
			e.preventDefault()
			console.log(houseno)
			dispatch(updateSupplier({
				id: supplier._id,
				supplierName,
				supplierContact,
				position,
				email,
				contactNumber,
				altContactNumber,
				credit,
				category,
				houseno,
				street,
				area
			}))
	    }

	 } 

	return(
		<>
		<Link to='/supplier' className='btn btn-dark my-3'>Go Back</Link>
		<h3>Update Supplier</h3>
		<div>
		{loadingUpdate && <Loader />}
		{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
		{ loading ? <Loader />
			: error ? <Message variant='danger'>{error}</Message>
			: (
				<Form onSubmit={submitHandler}>
					<Row >			
						<Col>
							<Form.Group className="mb-3" controlId='firstName'>
								<FloatingLabel controlId="floatingInput" label="Company Name" >
									<Form.Control 	type="name"  placeholder="company"
													// className={`${snErr.length>1 ? 'inCorrect' : null}`}
													value={supplierName}
													onChange = {(e)=> SN1(e.target.value)}
													onBlur = {(e) => SN(e.target.value)}
													isInvalid={!!snErr}
												/>
								</FloatingLabel>
								{snErr.length>1 ? (<div className='errMsg'>{snErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId='supplierContact'>
								<FloatingLabel controlId="floatingInput" label="Contact Person" >
									<Form.Control 	type="name"  placeholder="supplierContact"
													// className={`${scErr.length>1 ? 'inCorrect' : null}`}
													value={supplierContact}
													onChange = {(e)=> SC1(e.target.value)}
													onBlur = {(e) => SC(e.target.value)}
													isInvalid={!!scErr}
												/>
								</FloatingLabel>
								{scErr.length>1 ? (<div className='errMsg'>{scErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId='role' className="mb-3">
									<FloatingLabel controlId="floatingSelect" label="Role">
										<Form.Control as='select' value={position} 
											// className={`${positionErr.length>1 ? 'inCorrect' : null}`}
											onChange={(e) => setPosition(e.target.value)}
											onBlur = {(e) => PO(e.target.value)}
											isInvalid={!!positionErr}									
											>
											<option value=''>Select Position</option>
											<option value='Position 1'>Position 1</option>
											<option value='Position 2'>Position 2</option>
											<option value='Position 3'>Position 3</option>
										</Form.Control>
									</FloatingLabel>
									{positionErr.length>1 ? (<div className='errMsg'>{positionErr}</div>): null}
							</Form.Group>
						</Col>
					</Row>
					<Row>			
						<Col>
							<Form.Group className="mb-3" controlId='email'>
								<FloatingLabel controlId="floatingInput" label="Email address" >
									<Form.Control 	type="email"  placeholder="name@example.com"
													className={`${emailErr.length>1 ? 'inCorrect' : null}`}													
													value={email}
													onChange = {(e)=> {setEmail(e.target.value)}} 
													onBlur = {(e) => valEmail(e.target.value)}
													isInvalid={!!emailErr}
												/>
								</FloatingLabel>
								{emailErr.length>1 ? (<div className='errMsg'>{emailErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId='phone'>
								<FloatingLabel controlId="floatingInput" label="Contact Number" >
									<Form.Control 	type="phone"  placeholder="Contact Number"
													// className={`${contactNumberErr.length>1 ? 'inCorrect' : null}`}
													value={contactNumber}
													onChange = {(e)=> contactCheck(e.target.value)}
													onBlur = {(e) => valContact(e.target.value)}
													isInvalid={!!contactNumberErr} 
												/>
								</FloatingLabel>
								{contactNumberErr.length>1 ? (<div className='errMsg'>{contactNumberErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId='supplierContact'>
								<FloatingLabel controlId="floatingInput" label="Alt. Contact Number" >
									<Form.Control 	type="phone"  placeholder="alt Contact Number"
													// className={`${altContactNumberErr.length>1 ? 'inCorrect' : null}`}
													value={altContactNumber}
													onChange = {(e)=> contactCheck1(e.target.value)}
													onBlur = {(e) => valContact1(e.target.value)}
													isInvalid={!!altContactNumberErr} 
												/>
								</FloatingLabel>
								{altContactNumberErr.length>1 ? (<div className='errMsg'>{altContactNumberErr}</div>): null}
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId='role' className="mb-3">
									<FloatingLabel controlId="floatingSelect" label="Credit">
										<Form.Control as='select' value={credit} 
											// className={`${creditErr.length>1 ? 'inCorrect' : null}`}
											onChange={(e) => setCredit(e.target.value)}
											onBlur = {(e) => creditVal(e.target.value)}
											isInvalid={!!creditErr}									
											>
											<option value=''>Credit</option>
											<option value='30 days'>30 days</option>
											<option value='60 days'>60 days</option>
										</Form.Control>
									</FloatingLabel>
									{creditErr.length>1 ? (<div className='errMsg'>{creditErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId='role' className="mb-3">
									<FloatingLabel controlId="floatingSelect" label="Category">
										<Form.Control as='select' value={category} 
											// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
											onChange={(e) => setCategory(e.target.value)}
											onBlur = {(e) => categoryVal(e.target.value)}
											isInvalid={!!categoryErr}									
											>
											<option value=''>Category</option>
											<option value='Category 1'>Category 1</option>
											<option value='Category 2'>Category 2</option>
											<option value='Category 3'>Category 3</option>
										</Form.Control>
									</FloatingLabel>
									{categoryErr.length>1 ? (<div className='errMsg'>{categoryErr}</div>): null}
							</Form.Group>
						</Col>
					</Row>
					<Row>	
							{/*<Form.Group controlId='address'>*/}
								<Form.Label>Address</Form.Label>
								{/*<div className='address' >
									<Form.Control type='text' placeholder='House #' className='mx-2'
											  value={houseno} onChange={e => setHouseno(e.target.value)}
											/>
									<Form.Control type='text' placeholder='Street' className='mx-2'
											  value={street} onChange={e => setStreet(e.target.value)}
											/>
									<Form.Control type='text' placeholder='Area' className='mx-2'
											  value={area} onChange={e => setArea(e.target.value)}
											/>
								</div>
							</Form.Group>*/}

							
						<Col>						
							<Form.Group className="mb-3" controlId='houseno'>
								<FloatingLabel controlId="floatingInput" label="House #" >
									<Form.Control 	type="name"  placeholder="houseno"
													// className={`${housenoErr.length>1 ? 'inCorrect' : null}`}
													value={houseno}
													onChange = {(e)=> houseVal1(e.target.value)}
													onBlur = {(e) => houseVal(e.target.value)}
													isInvalid={!!housenoErr}
												/>
								</FloatingLabel>
								{housenoErr.length>1 ? (<div className='errMsg'>{housenoErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId='street'>
								<FloatingLabel controlId="floatingInput" label="Street" >
									<Form.Control 	type="name"  placeholder="street"
													// className={`${streetErr.length>1 ? 'inCorrect' : null}`}
													value={street}
													onChange = {(e)=> streetVal1(e.target.value)}
													onBlur = {(e) => streetVal(e.target.value)}
													isInvalid={!!streetErr}
												/>
								</FloatingLabel>
								{streetErr.length>1 ? (<div className='errMsg'>{streetErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId='area'>
								<FloatingLabel controlId="floatingInput" label="Area" >
									<Form.Control 	type="name"  placeholder="area"
													// className={`${areaErr.length>1 ? 'inCorrect' : null}`}
													value={area}
													onChange = {(e)=> areaVal1(e.target.value)}
													onBlur = {(e) => areaVal(e.target.value)}
													isInvalid={!!areaErr}
												/>
								</FloatingLabel>
								{areaErr.length>1 ? (<div className='errMsg'>{areaErr}</div>): null}
							</Form.Group>
						</Col>				
					</Row>
					<Button type='submit' variant='primary' 
					className={`mt-3 btn-sm ${snErr || scErr || positionErr || emailErr || contactNumberErr || altContactNumberErr || creditErr || categoryErr || housenoErr || streetErr || areaErr ? 'disabled' : null} `}>
						Save
					</Button>

				</Form>
			)
		}
		
		</div>

		</>
		)
}


export default SupplierEditScreen