import React, { useState, useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Button, Form, FloatingLabel} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import FormContainer from '../components/FormContainer'
import { getCountry} from '../actions/dropActions'
import {getManufacturerDetails, updateManufacturer } from '../actions/otherActions'
import { MANUFACTURER_UPDATE_RESET } from '../constants/otherConstants'


const ManufacturerEditScreen = () => {
	const [validated, setValidated] = useState(false);

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	const manufacturerId = id
	
	const [name, setName] = useState('')
	const [nameErr, setNameErr] = useState('')

	const [shortName, setShortName] = useState('')
	const [shortNameErr, setShortNameErr] = useState('')

	const [country, setCountry] = useState('')
	const [countryErr, setCountryErr] = useState('')

	const nameCheck = (data) => {
		if(data.length<5 || data.length>50){ setNameErr('Required: 5-50 charcters')} 
			else {setNameErr('')}
	}

	const nameCheck1 = (data) => {
		if(data.length > 50){setNameErr('Should not exceed 50 charcters')}
		 else {
			setName(data)
			console.log(data)
			setNameErr('')
		}
	}

	const SN = (data) => {
		if(data.length<2 || data.length>5) { setShortNameErr('Required: 2-5 charcters') } 
			else { setShortNameErr('') }
	}

	const SN1 = (data) => {
		if(data.length > 5){setShortNameErr('Should not exceed 5 charcters')}
		 else {
			setShortName(data)
			console.log(data)
			setShortNameErr('')
		}
	}

	const CN = (data) => {
		if(!data){
			setCountryErr('Please Select a Country')
		}else{
			setCountryErr('')
		}
	}


	const manufacturerDetails = useSelector((state) => state.manufacturerDetails)
	const { loading, error, manufacturer } = manufacturerDetails

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const countryList = useSelector((state) => state.countryList)
	const { countries } = countryList

	const manufacturerUpdate = useSelector((state) => state.manufacturerUpdate)
	const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = manufacturerUpdate

	
	useEffect(() => {
		
			if(!userInfo){
				navigate('/login')
			} 
			setValidated(null)
			if(successUpdate){
				dispatch({ type:MANUFACTURER_UPDATE_RESET })
				navigate('/manufacturers')						
			}
						
			if(!manufacturer.name || manufacturer._id !== manufacturerId ){
				console.log('dispatch')
				dispatch(getManufacturerDetails(manufacturerId))
				dispatch(getCountry())

			} else {
				setName(manufacturer.name)
				setShortName(manufacturer.shortName)
				setCountry(manufacturer.country)			
			}
	},[dispatch, userInfo, manufacturer, manufacturerId, navigate, successUpdate])

	const submitHandler = (e) =>{
		const form = e.currentTarget;
	    if (form.checkValidity() === false) {
	      	e.preventDefault();
	      	e.stopPropagation();
	    } else {
	    	setValidated(true);
			e.preventDefault()
			console.log(name + shortName + country)
			dispatch(updateManufacturer({ id:manufacturer._id, name, shortName, country }))
	    }

	    

		}

	
	return(
		<>
		<Link to='/manufacturers' className='btn btn-dark my-3'>Go Back</Link>
		<h1>Edit Manufacturers</h1>
		{loadingUpdate && <Loader />}
		{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
		{
			loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
				<Form onSubmit={submitHandler} validated={validated} noValidate>
					<Row className='my-3' >
						<Col md={6}>
							<Form.Group className="mb-3" controlId='name'>
								<FloatingLabel controlId="floatingInput" label="Manufacturer Name" >
									<Form.Control 	type="name"  placeholder="name"
													className={`${nameErr.length>1 ? 'inCorrect' : null}`}
													value={name}
													onChange = {(e)=> nameCheck1(e.target.value)}
													onBlur = {(e) => nameCheck(e.target.value)} 
													required
												/>
								</FloatingLabel>
								{nameErr.length>1 ? (<div className='errMsg'>{nameErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId='shortName'>
								<FloatingLabel controlId="floatingInput" label="Short Name" >
									<Form.Control 	type="name"  placeholder="shortName"
													className={`${shortNameErr.length>1 ? 'inCorrect' : null}`}
													value={shortName}
													onChange = {(e)=> SN1(e.target.value)}
													onBlur = {(e) => SN(e.target.value)} 
													required
												/>
								</FloatingLabel>
								{shortNameErr.length>1 ? (<div className='errMsg'>{shortNameErr}</div>): null}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId='country'>
								<FloatingLabel controlId="floatingSelect" label="Country">
									<Form.Control as='select' value={country} className="mb-3"
											onChange={(e) => setCountry(e.target.value)}
											className={`${countryErr.length>1 ? 'inCorrect' : null}`}
											onBlur = {(e) => CN(e.target.value)}
											required
											>
											<option value='option'>Select Country</option>
											{countries.map(ct => (
											<option value={ct.name}>{ct.name}</option>
											))  }
										</Form.Control>
									</FloatingLabel>
									{countryErr.length>1 ? (<div className='errMsg'>{countryErr}</div>): null}
							</Form.Group>
						</Col>
						
					</Row>
					<Button type='submit' variant='primary'
						className={`${nameErr || countryErr || shortNameErr ? 'disabled' : null }`}>
							Update
						</Button>
				</Form>	
			)
		}
		
		
		</>
		)
}


export default ManufacturerEditScreen