import React, { useState, useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listManufacturers, getProductDetails, updateProduct } from '../actions/otherActions'
import { PRODUCT_UPDATE_RESET } from '../constants/otherConstants'

const ProductEditScreen = ({ history}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { id } = useParams()
	const productId = id
	

	const [medicineName, setMedicineName] = useState('')
	const [medNameErr, setMedNameErr] = useState('')

	const [genericName, setGenericName] = useState('')
	const [genNameErr, setGenNameErr] = useState('')

	const [category, setCategory] = useState('')
	const [categoryErr, setCategoryErr] = useState('')

	const [type, setType] = useState('')
	const [typeErr, setTypeErr] = useState('')

	const [manufacturer, setManufacturer] = useState('')
	const [manufacturerErr, setManufacturerErr] = useState('')

	const [marketedBy, setMarketedBy] = useState('')
	const [marketedByErr, setMarketedByErr] = useState('')

	const [scheduledCategory, setScheduledCategory] = useState('')
	const [scheduledCategoryErr, setScheduledCategoryErr] = useState('')

	const [hsnCode, setHsnCode] = useState('')
	const [hsnCodeErr, setHsnCodeErr] = useState('')

	const [pack, setPack] = useState('')
	const [packErr, setPackErr] = useState('')

	const [mrp, setMrp] = useState('')
	const [mrpErr, setMrpErr] = useState('')

	const [purchasePrice, setPurchasePrice] = useState('')
	const [purchasePriceErr, setPurchasePriceErr] = useState('')

	const [dose, setDose] = useState('')
	const [doseErr, setDoseErr] = useState('')

	const [route, setRoute] = useState('')
	const [routeErr, setRouteErr] = useState('')

	const [timing, setTiming] = useState('')
	const [timingErr, setTimingErr] = useState('')

	const [preference, setPreference] = useState('')
	const [preferenceErr, setPreferenceErr] = useState('')

	const [indication, setIndication] = useState('')
	const [className, setClassName] = useState('')
	const [group, setGroup] = useState('')
	const [subGroup, setSubGroup] = useState('')
	const [storageTemp, setStorageTemp] = useState('')
	const [storageTempErr, setStorageTempErr] = useState('')

	const [binLocation, setBinLocation] = useState('')
	const [binLocationErr, setBinLocationErr] = useState('')

	const [validated, setValidated] = useState(false);



	const medName = (data) => {
		if(data.length<1 || data.length>50){ setMedNameErr('Required: 1-50 charcters')} 
			else {setMedNameErr('')}
	}

	const medName1 = (data) => {
		if(data.length > 50){setMedNameErr('Should not exceed 50 charcters')}
		 else {
			setMedicineName(data)
			console.log(data)
			setMedNameErr('')
		}
	}

	const genNameCheck = (data) => {
		if(data.length<1 || data.length>50){ setGenNameErr('Required: 1-50 charcters')} 
			else {setGenNameErr('')}
	}

	const genNameCheck1 = (data) => {
		if(data.length > 50){setGenNameErr('Should not exceed 50 charcters')}
		 else {
			setGenericName(data)
			console.log(data)
			setGenNameErr('')
		}
	}

	const categoryVal = (data) => {
		if(!data){
			setCategoryErr('Please select a category')
		}else{
			setCategoryErr('')
		}
	}

	const typeVal = (data) => {
		if(!data){
			setTypeErr('Please select a type')
		}else{
			setTypeErr('')
		}
	}

	const manufacturerCheck = (data) => {
		if(!data){
			setManufacturerErr('Please select a manufacturer')
		}else{
			setManufacturerErr('')
		}
	}

	const marketedByCheck = (data) => {
		if(data.length<1 || data.length>10){ setMarketedByErr('Required: 1-10 charcters')} 
			else {setMarketedByErr('')}
	}

	const marketedByCheck1 = (data) => {
		if(data.length > 10){setMarketedByErr('Should not exceed 10 charcters')}
		 else {
			setMarketedBy(data)
			console.log(data)
			setMarketedByErr('')
		}
	}

	const scheduledCategoryCheck = (data) => {
		if(data.length<1 || data.length>10){ setScheduledCategoryErr('Required: 1-10 charcters')} 
			else {setScheduledCategoryErr('')}
	}

	const scheduledCategoryCheck1 = (data) => {
		if(data.length > 10){setScheduledCategoryErr('Should not exceed 10 charcters')}
		 else {
			setScheduledCategory(data)
			console.log(data)
			setScheduledCategoryErr('')
		}
	}

	const hsnCodeCheck = (data) => {
		if(data.length<1 || data.length>10){ setHsnCodeErr('Required: 1-10 charcters')} 
			else {setHsnCodeErr('')}
	}

	const hsnCodeCheck1 = (data) => {
		if(data.length > 10){setHsnCodeErr('Should not exceed 10 charcters')}
		 else {
			setHsnCode(data)
			console.log(data)
			setHsnCodeErr('')
		}
	}

	const packCheck = (data) => {
		if(!new RegExp( /^\d{3}$/).test(data)){ setPackErr('Required: 3-digits')} 
			else {setPackErr('')}
	}

	const packCheck1 = (data) => {
		if(data.length>3){setPackErr('Should not exceed 3 digits')}
		 else {
			setPack(data)
			console.log(data)
			setPackErr('')
		}
	}

	const mrpCheck = (data) => {
		if(!new RegExp( /^\d/).test(data)){ setMrpErr('Required: Numbers')} 
			else {setMrpErr('')}
	}

	const mrpCheck1 = (data) => {
		if(!new RegExp( /^\d/).test(data)){setMrpErr('Required: Numbers')}
		 else {
			setMrp(data)
			console.log(data)
			setMrpErr('')
		}
	}

	const purchasePriceCheck = (data) => {
		if(!new RegExp( /^\d/).test(data)){ setPurchasePriceErr('Required: Numbers')} 
			else {setPurchasePriceErr('')}

	}

	const purchasePriceCheck1 = (data) => {
		if(!new RegExp( /^\d/).test(data)){setPurchasePriceErr('Required: Numbers')}
		 else {
			setPurchasePrice(data)
			console.log(data)
			setPurchasePriceErr('')
		}
	}

	const doseVal = (data) => {
		if(!data){
			setDoseErr('Please select a dose')
		}else{
			setDoseErr('')
		}
	}

	const routeVal = (data) => {
		if(!data){
			setRouteErr('Please select a route')
		}else{
			setRouteErr('')
		}
	}

	const timingVal = (data) => {
		if(!data){
			setTimingErr('Please select a timing')
		}else{
			setTimingErr('')
		}
	}

	const preferenceVal = (data) => {
		if(!data){
			setPreferenceErr('Please select a preferred timing')
		}else{
			setPreferenceErr('')
		}
	}

	const tempCheck = (data) => {
		if(!new RegExp( /^\d/).test(data)){ setStorageTempErr('Required: Numbers')} 
			else {setStorageTempErr('')}
	}

	const tempCheck1 = (data) => {
		if(!new RegExp( /^\d/).test(data)){setStorageTempErr('Required: Numbers')}
		 else {
			setStorageTemp(data)
			console.log(data)
			setStorageTempErr('')
		}
	}

	const binCheck = (data) => {
		if(data.length<1 || data.length>20){ setBinLocationErr('Required: 1-20 charcters')} 
			else {setBinLocationErr('')}
	}

	const binCheck1 = (data) => {
		if(data.length > 20){setBinLocationErr('Should not exceed 20 charcters')}
		 else {
			setBinLocation(data)
			console.log(data)
			setBinLocationErr('')
		}
	}

	const productDetails = useSelector( state => state.productDetails )
	const { loading, success, product } = productDetails

	const manufacturerList = useSelector( state => state.manufacturerList )
	const { manufacturers } = manufacturerList
	
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const productUpdate = useSelector((state) => state.productUpdate)
	const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate


	useEffect(() => {
		
		if(!userInfo){
			navigate('/login')
		}
		setValidated(null)
		dispatch(listManufacturers())

		if(successUpdate){
				dispatch({ type:PRODUCT_UPDATE_RESET })
				navigate('/productlist')						
			}

		if(!product.medicineName || product._id !== productId ){
				console.log('dispatch')
				dispatch(getProductDetails(productId))
			} else {
				setMedicineName(product.medicineName)			
				setGenericName(product.genericName)			
				setCategory(product.category)			
				setType(product.type)			
				setManufacturer(product.manufacturer)			
				setMarketedBy(product.marketedBy)			
				setScheduledCategory(product.scheduledCategory)			
				setHsnCode(product.hsnCode)			
				setPack(product.pack)			
				setMrp(product.mrp)			
				setPurchasePrice(product.purchasePrice)			
				setDose(product.dose)			
				setRoute(product.route)			
				setTiming(product.timing)			
				setPreference(product.preference)			
				setIndication(product.indication)			
				setClassName(product.className)			
				setGroup(product.group)			
				setSubGroup(product.subGroup)			
				setStorageTemp(product.storageTemp)			
				setBinLocation(product.binLocation)			
			}

	},[dispatch, navigate, successUpdate, userInfo, product])

	const submitHandler = (e) => {
		const form = e.currentTarget;
	    if (form.checkValidity() === false) {
	      e.preventDefault();
	      e.stopPropagation();
	    } else {

	    	e.preventDefault()
	    	
			dispatch(updateProduct({
				id: product._id,
				medicineName,
				genericName,
				category,
				type,
				manufacturer,
				marketedBy,
				scheduledCategory,
				hsnCode,
				pack,
				mrp,
				purchasePrice,
				dose,
				route,
				timing,
				preference,
				indication,
				className,
				group,
				subGroup,
				storageTemp,
				binLocation,
			}))
	    }
	    setValidated(true);
	  }
	 

	

	return(
		<>
			
			<Link to='/productlist' className='btn btn-dark my-3'>Go Back</Link>
			<h2>Edit Product</h2>
			{loadingUpdate && <Loader />}
			{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
			{/*{createSuccess && <Message variant='info'>Product Created</Message>}*/}
			<Form onSubmit={submitHandler} validated={validated} noValidate>
			<Row>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='medName'>
						<FloatingLabel controlId="floatingInput" label="Medicine Name" >
							<Form.Control 	type="name"  placeholder="medicine name"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={medicineName}
											onChange = {(e)=> medName1(e.target.value)}
											onBlur = {(e) => medName(e.target.value)} 
											required
											isInvalid={!!medNameErr}
											/>
							</FloatingLabel>
							{medNameErr.length>1 ? (<div className='errMsg'>{medNameErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='name'>
						<FloatingLabel controlId="floatingInput" label="Generic Name" >
							<Form.Control 	type="name"  placeholder="Generic Name"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={genericName}
											onChange = {(e)=> genNameCheck1(e.target.value)}
											onBlur = {(e) => genNameCheck(e.target.value)} 
											required
											isInvalid={!!genNameErr}
											/>
							</FloatingLabel>
							{genNameErr.length>1 ? (<div className='errMsg'>{genNameErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='role' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Category">
								<Form.Control as='select' value={category} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setCategory(e.target.value)}
									onBlur = {(e) => categoryVal(e.target.value)}
									isInvalid={!!categoryErr}	
									required								
									>
									<option value=''>Category</option>
									<option value='Food'>Food</option>
									<option value='Drug'>Drug</option>
									<option value='Supplement'>Supplement</option>
								</Form.Control>
							</FloatingLabel>
							{categoryErr.length>1 ? (<div className='errMsg'>{categoryErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Type">
								<Form.Control as='select' value={type} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setType(e.target.value)}
									onBlur = {(e) => typeVal(e.target.value)}
									isInvalid={!!typeErr}	
									required								
									>
									<option value=''>Type</option>
									<option value='Tablet'>Tablet</option>
									<option value='Capsule'>Capsule</option>
									<option value='Tonic'>Tonic</option>
								</Form.Control>
							</FloatingLabel>
							{typeErr.length>1 ? (<div className='errMsg'>{typeErr}</div>): null}
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<Form.Group controlId='manufacturer' className='mb-3'>
						<FloatingLabel controlId="floatingSelect" label="Manufacturer">
							<Form.Control as='select' value={manufacturer}
									onChange={(e) => setManufacturer(e.target.value)}
									// className={`${manufacturerErr.length>1 ? 'inCorrect' : null}`}
									onBlur = {(e) => manufacturerCheck(e.target.value)}
									required
									isInvalid={!!manufacturerErr}
									>
									<option value=''>Select manufacturer</option>
									{manufacturers.map(manufacturer => (
										<option value={manufacturer.name}>{manufacturer.name}</option>
									))  }
								</Form.Control>
							</FloatingLabel>
							{manufacturerErr.length>1 ? (<div className='errMsg'>{manufacturerErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='marketedBy'>
						<FloatingLabel controlId="floatingInput" label="Marketed by" >
							<Form.Control 	type="name"  placeholder="Marketed by"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={marketedBy}
											onChange = {(e)=> marketedByCheck1(e.target.value)}
											onBlur = {(e) => marketedByCheck(e.target.value)} 
											required
											isInvalid={!!marketedByErr}
											/>
							</FloatingLabel>
							{marketedByErr.length>1 ? (<div className='errMsg'>{marketedByErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='scheduledCategory'>
						<FloatingLabel controlId="floatingInput" label="Scheduled Category" >
							<Form.Control 	type="name"  placeholder="Scheduled Category"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={scheduledCategory}
											onChange = {(e)=> scheduledCategoryCheck1(e.target.value)}
											onBlur = {(e) => scheduledCategoryCheck(e.target.value)} 
											required
											isInvalid={!!scheduledCategoryErr}
											/>
							</FloatingLabel>
							{scheduledCategoryErr.length>1 ? (<div className='errMsg'>{scheduledCategoryErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='hsnCode'>
						<FloatingLabel controlId="floatingInput" label="HSN Code" >
							<Form.Control 	type="name"  placeholder="HSN Code"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={hsnCode}
											onChange = {(e)=> hsnCodeCheck1(e.target.value)}
											onBlur = {(e) => hsnCodeCheck(e.target.value)} 
											required
											isInvalid={!!hsnCodeErr}
											/>
							</FloatingLabel>
							{hsnCodeErr.length>1 ? (<div className='errMsg'>{hsnCodeErr}</div>): null}
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='pack'>
						<FloatingLabel controlId="floatingInput" label="Pack" >
							<Form.Control 	type="name"  placeholder="Pack"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={pack}
											onChange = {(e)=> packCheck1(e.target.value)}
											onBlur = {(e) => packCheck(e.target.value)} 
											required
											isInvalid={!!packErr}
											/>
							</FloatingLabel>
							{packErr.length>1 ? (<div className='errMsg'>{packErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='mrp'>
						<FloatingLabel controlId="floatingInput" label="MRP" >
							<Form.Control 	type="name"  placeholder="MRP"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={mrp}
											onChange = {(e)=> mrpCheck1(e.target.value)}
											onBlur = {(e) => mrpCheck(e.target.value)} 
											required
											isInvalid={!!mrpErr}
											/>
							</FloatingLabel>
							{mrpErr.length>1 ? (<div className='errMsg'>{mrpErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='purchasePrice'>
						<FloatingLabel controlId="floatingInput" label="Purchase Price" >
							<Form.Control 	type="name"  placeholder="Purchase Price"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={purchasePrice}
											onChange = {(e)=> purchasePriceCheck1(e.target.value)}
											onBlur = {(e) => purchasePriceCheck(e.target.value)} 
											required
											isInvalid={!!purchasePriceErr}
											/>
							</FloatingLabel>
							{purchasePriceErr.length>1 ? (<div className='errMsg'>{purchasePriceErr}</div>): null}
					</Form.Group>
				</Col>
			</Row>
			<h3>Prescription</h3>
			<Row>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Dose">
								<Form.Control as='select' value={dose} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setDose(e.target.value)}
									onBlur = {(e) => doseVal(e.target.value)}
									isInvalid={!!doseErr}	
									required								
									>
									<option value=''>Dose</option>
									<option value='300 mg'>300 mg</option>
									<option value='500 mg'>500 mg</option>
									<option value='750 mg'>750 mg</option>
								</Form.Control>
							</FloatingLabel>
							{doseErr.length>1 ? (<div className='errMsg'>{doseErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Route">
								<Form.Control as='select' value={route} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setRoute(e.target.value)}
									onBlur = {(e) => routeVal(e.target.value)}
									isInvalid={!!routeErr}	
									required								
									>
									<option value=''>Route</option>
									<option value='Oral'>Oral</option>
									<option value='Skin'>Skin</option>
									<option value='Nasal'>Nasal</option>
								</Form.Control>
							</FloatingLabel>
							{routeErr.length>1 ? (<div className='errMsg'>{routeErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Timing">
								<Form.Control as='select' value={timing} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setTiming(e.target.value)}
									onBlur = {(e) => timingVal(e.target.value)}
									isInvalid={!!timingErr}	
									required								
									>
									<option value=''>Timing</option>
									<option value='1-0-0-0'>1-0-0-0</option>
									<option value='1-0-1-0'>1-0-1-0</option>
									<option value='1-1-1-1'>1-1-1-1</option>
								</Form.Control>
							</FloatingLabel>
							{timingErr.length>1 ? (<div className='errMsg'>{timingErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Timing Preference">
								<Form.Control as='select' value={preference} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setPreference(e.target.value)}
									onBlur = {(e) => preferenceVal(e.target.value)}
									isInvalid={!!preferenceErr}	
									required								
									>
									<option value=''>Timing Preference</option>
									<option value='Before Food'>Before Food</option>
									<option value='After Food'>After Food</option>
								</Form.Control>
							</FloatingLabel>
							{preferenceErr.length>1 ? (<div className='errMsg'>{preferenceErr}</div>): null}
					</Form.Group>
				</Col>
			</Row>
		<h3>Classification</h3>
		<Row>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Indication">
								<Form.Control as='select' value={indication} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setIndication(e.target.value)}
									// onBlur = {(e) => doseVal(e.target.value)}
									// isInvalid={!!doseErr}	
									required								
									>
									<option value=''>Indication</option>
									<option value='Indication 1'>Indication 1</option>
									<option value='Indication 2'>Indication 2</option>
									<option value='Indication 3'>Indication 3</option>
								</Form.Control>
							</FloatingLabel>
							{/*{doseErr.length>1 ? (<div className='errMsg'>{doseErr}</div>): null}*/}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Class">
								<Form.Control as='select' value={className} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setClassName(e.target.value)}
									// onBlur = {(e) => routeVal(e.target.value)}
									// isInvalid={!!routeErr}	
									required								
									>
									<option value=''>Class</option>
									<option value='Class 1'>Class 1</option>
									<option value='Class 2'>Class 2</option>
									<option value='Class 3'>Class 3</option>
								</Form.Control>
							</FloatingLabel>
							{/*{routeErr.length>1 ? (<div className='errMsg'>{routeErr}</div>): null}*/}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Group">
								<Form.Control as='select' value={group} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setGroup(e.target.value)}
									// onBlur = {(e) => timingVal(e.target.value)}
									// isInvalid={!!timingErr}	
									required								
									>
									<option value=''>Group</option>
									<option value='Group 1'>Group 1</option>
									<option value='Group 2'>Group 2</option>
									<option value='Group 3'>Group 3</option>
								</Form.Control>
							</FloatingLabel>
							{/*{timingErr.length>1 ? (<div className='errMsg'>{timingErr}</div>): null}*/}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='type' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Sub group/Classification">
								<Form.Control as='select' value={subGroup} 
									// className={`${categoryErr.length>1 ? 'inCorrect' : null}`}
									onChange={(e) => setSubGroup(e.target.value)}
									// onBlur = {(e) => timingPreferenceVal(e.target.value)}
									// isInvalid={!!timingPreferenceErr}	
									required								
									>
									<option value=''>Sub group/Classification</option>
									<option value='Sub Group 1'>Sub Group 1</option>
									<option value='Sub Group 2'>Sub Group 2</option>
									<option value='Sub Group 3'>Sub Group 3</option>
								</Form.Control>
							</FloatingLabel>
							{/*{timingPreferenceErr.length>1 ? (<div className='errMsg'>{timingPreferenceErr}</div>): null}*/}
					</Form.Group>
				</Col>
			</Row>

			<h3>Storage</h3>
			<Row>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='storageTemperature'>
						<FloatingLabel controlId="floatingInput" label="Storage Temprature" >
							<Form.Control 	type="name"  placeholder="Storage Temprature"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={storageTemp}
											onChange = {(e)=> tempCheck1(e.target.value)}
											onBlur = {(e) => tempCheck(e.target.value)} 
											required
											isInvalid={!!storageTempErr}
											/>
							</FloatingLabel>
							{storageTempErr.length>1 ? (<div className='errMsg'>{storageTempErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='binLocation'>
						<FloatingLabel controlId="floatingInput" label="Bin Location" >
							<Form.Control 	type="name"  placeholder="Bin Location"
											// className={`${medNameErr.length>1 ? 'inCorrect' : null}`}
											value={binLocation}
											onChange = {(e)=> binCheck1(e.target.value)}
											onBlur = {(e) => binCheck(e.target.value)} 
											required
											isInvalid={!!binLocationErr}
											/>
							</FloatingLabel>
							{binLocationErr.length>1 ? (<div className='errMsg'>{binLocationErr}</div>): null}
					</Form.Group>
				</Col>
			</Row>


			<Button type='submit' variant='primary' 
			className={`mt-3 btn-sm ${medNameErr || genNameErr || categoryErr || typeErr || marketedByErr || scheduledCategoryErr || hsnCodeErr || mrpErr || purchasePriceErr || storageTempErr || binLocationErr ? 'disabled' : null} `}>
				Update
			</Button>
		</Form>
		</>	
		)
}



export default ProductEditScreen