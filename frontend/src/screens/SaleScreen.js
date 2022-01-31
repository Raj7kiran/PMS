import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Card,ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import SaleSteps from '../components/SaleSteps'
import {listProducts} from '../actions/otherActions'
import { createSale } from '../actions/saleActions'
import { listDoctors} from '../actions/userActions'
import { SALE_CREATE_RESET } from '../constants/saleConstants'

const SaleScreen = () =>{
	let count=1;
	let count1=1;
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const [validated, setValidated] = useState(false);

	const [ title, setTitle ] = useState('')

	const [ name, setName ] = useState('')
	const [ nameErr, setNameErr ] = useState('')

	const [ age, setAge ] = useState('')
	const [ ageErr, setAgeErr ] = useState('')

	const [ gender, setGender ] = useState('')

	const [ phone, setPhone ] = useState('')
	const [ phoneErr, setPhoneErr ] = useState('')

	const [ doctor, setDoctor ] = useState('')

	const [ purpose, setPurpose ] = useState('')

	const [ frequency, setFrequency ] = useState('')

	// const [ productTotal, setProductTotal ] = useState('')
	
	const [medicineName, setMedicineName] = useState('')
	const [quantity, setQuantity] = useState('')
	const [quantityErr, setQuantityErr] = useState('')

	const [remarks, setRemarks] = useState('')

	const [tableData, setTableData] = useState([])

	const nameCheck = (data) => {
		if(data.length<3 || data.length>50){ setNameErr('Required: 5-50 charcters')}
		else {setNameErr('')}
	}

	const nameCheck1 = (data) => {
		if(data.length > 50){ setNameErr('Should not exceed 50 charcters')}
		// else if(!new RegExp( /^([a-zA-Z_ ])*$/ ).test(data))  {'Required only aplhabets'} 
		 else {
			setName(data)
			console.log(data)
			setNameErr('')
		}
	}

	const ageCheck = (data) => {
		if(data < 0 || data > 120){ setAgeErr('Age should be between 0-120')}
		else {
			setAge(data)
			setAgeErr('')
		}
	}

	const PH = (data) => {
		if(data.length > 10){setPhoneErr('Required: 10-digit phone number')}
		else if(data <0) {setPhoneErr('It should not be negative')}
		 else {
			setPhone(data)
			console.log(data)
			setPhoneErr('')
		}
	}

	const valPhone = (data) => {		
		if(!new RegExp( /^\d{10}$/).test(data)){			
			setPhoneErr('Required: 10-digit phone number')
			console.log(phoneErr)
		}  else {
			setPhoneErr('')
		}		
	}

	const qtyCheck = (data) => {
		if(data > 100000){ 
			setQuantityErr('Quatity max. has been reached')
		} else if (data < 0) {
			setQuantityErr('Should not be negative')
		}
		else {
			setQuantity(data)
			setQuantityErr('')}
	}

	
	const productList = useSelector( state => state.productList )
	const { loading, error, products } = productList

	const doctorList = useSelector(state => state.doctorList)
	const { loading: loadingDoctor, error: errorDoctor, doctors } = doctorList
	
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const saleCreate = useSelector(state => state.saleCreate)
	const { loading: createLoading, error: createError, success:createSuccess } = saleCreate

	const [dropDownData, setDropDownData] = useState(products)

	let addDecimals = (num) => {
			return (Math.round(num*100)/100).toFixed(2)
		}

	useEffect(()=>{
		   setDropDownData(products)
		},[products])

	useEffect(() => {

		if(!userInfo || !(userInfo.role === '7' || userInfo.role === '9')){
			navigate('/')
		}

		dispatch(listDoctors())

		dispatch(listProducts())

		if(createSuccess){
			dispatch({type: SALE_CREATE_RESET})
			setTableData([])

			navigate('/mysales')
		}
			
		
		// setValidated(null);

	},[dispatch, navigate, userInfo, createSuccess])

	const addToTableHandler = (e) => {
				e.preventDefault()
				
				const productToAdd = dropDownData.find((product) =>
				   product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1);
				console.log(productToAdd)

				let totalPrice = Number(addDecimals(productToAdd.mrp*quantity))

				const rowToAdd = {product: productToAdd, quantity: quantity, totalPrice: totalPrice};				
				setTableData(tableData => [...tableData, rowToAdd])
				console.log(tableData)

				const arr2 = dropDownData.filter((product) => 
					product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()))				
				setDropDownData(arr2)				
				setQuantity('')		
	}

	const deleteHandler = (medicineName) => {
		
		tableData.splice(tableData.findIndex(row => row.product.medicineName === medicineName), 1)
    	

		const productBack = products.find((product) =>
		   product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1);

    	setDropDownData(dropDownData => [...dropDownData, productBack])

	}

		let itemTotalPrice = tableData.reduce((acc, row) => acc + (((row.product.tax/100) * row.totalPrice)+ row.totalPrice), 0).toFixed(2)
		let itemTotalPriceWithoutTax = tableData.reduce((acc, row) => acc + row.totalPrice, 0).toFixed(2)
		let totalSGST = tableData.reduce((acc, row) => acc + (((row.product.tax/2)/100)*row.totalPrice), 0).toFixed(2)
		let totalGST = tableData.reduce((acc, row) => acc + ((row.product.tax/100) * row.totalPrice), 0).toFixed(2)
		let discountPrice = (Number(itemTotalPriceWithoutTax) - Number(itemTotalPriceWithoutTax*0.05)).toFixed(2)
		let saleTotal = (Number(discountPrice)+Number(totalGST)).toFixed(2)
		let totalQty = tableData.reduce((acc, row) => acc + Number(row.quantity), 0)

  	const changeQuantity = (medicineName, quantity) => {
			const newArr = tableData.map(row => {
				  if (row.product.medicineName === medicineName) {
				        row.quantity = Number(quantity)
				        row.totalPrice = Number(addDecimals(row.product.mrp*quantity))
					  }
				  return row
				})


			// console.log(newArr)
			setTableData(newArr)
		}
  	
  	
	const clearHandler = () => {
		setTableData([])
		setDropDownData(products)
	}

	const saveHandler = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
		      e.preventDefault();
		      e.stopPropagation();
	    } else {
	    	e.preventDefault()
			let saleItems = []

			tableData.map(row => {
				
				const newItem =  {
					name: row.product.medicineName,
					qty: row.quantity,
					productId: row.product._id,
					price: row.product.purchasePrice,
					totalPrice: row.totalPrice,
					frequency
				}
				// console.log(newItem)
			
				saleItems = [...saleItems, newItem]
			})

				dispatch(createSale({title, name, age, gender, phoneNumber: phone, doctorID: doctor, purpose, saleItems, totalQty, itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, remarks, isSaved: true, frequency }))
	    }

	    setValidated(true);
	}

	const submitHandler = (e) => {
		const form = e.currentTarget;
	   	 if (form.checkValidity() === false) {
			      e.preventDefault();
			      e.stopPropagation();
		    } else {
		    	e.preventDefault()
				// //dispatch Login
				let saleItems = []

			tableData.map(row => {
				
				const newItem =  {
					name: row.product.medicineName,
					qty: row.quantity,
					productId: row.product._id,
					price: row.product.purchasePrice,
					totalPrice: row.totalPrice,
					frequency
				}
				// console.log(newItem)
			
				saleItems = [...saleItems, newItem]
			})

				dispatch(createSale({title, name, age, gender, phoneNumber: phone, doctorID: doctor, purpose, saleItems, totalQty, itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, remarks, isSubmitted: true, frequency }))
		   }

	    setValidated(true);

		let saleItems = []

			tableData.map(row => {
				
				const newItem =  {
					name: row.product.medicineName,
					qty: row.quantity,
					productId: row.product._id,
					price: row.product.purchasePrice,
					totalPrice: row.totalPrice,
					frequency
				}
				// console.log(newItem)
			
				saleItems = [...saleItems, newItem]
			})

		dispatch(createSale({title, name, age, gender, phoneNumber: phone, doctorID: doctor, purpose, saleItems, totalQty, itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, remarks, isSubmitted: true, frequency }))

	}



	return (
		<>
		<SaleSteps />
		{createLoading && <Loader />}
		{createError && <Message variant='danger'>{createError}</Message>}
		{createSuccess && <Message variant='info'>Submitted Successfully</Message>}
		
		<Row>
			<Col md={6}>
				<Row>
				<Col md={2}>
					<Form.Group controlId='title' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Title">
								<Form.Control as='select' 
									onChange = {(e) => setTitle(e.target.value)}
									required>
									<option value=''>Title</option>
									<option value='Mr.'>Mr.</option>
									<option value='Mrs.'>Mrs.</option>
								</Form.Control>
							</FloatingLabel>
					</Form.Group>
				</Col>
				<Col md={10}>
					<Form.Group className="mb-3" controlId='patientname'>
						<FloatingLabel controlId="floatingInput" label="Patient Name" >
							<Form.Control 	type="name"  placeholder="Patient Name"
											// className={`${fnErr.length>1 ? 'inCorrect' : null}`}
											value={name}
											onChange = {(e)=> nameCheck1(e.target.value)}
											onBlur = {(e) => nameCheck(e.target.value)}
											required
											isInvalid={!!nameErr} 
										/>
						</FloatingLabel>
						{nameErr.length>1 ? (<div className='errMsg'>{nameErr}</div>): null}
					</Form.Group>
				</Col>
				</Row>
			</Col>
			<Col md={6}>
				<Row>
				<Col md={3}>
					<Form.Group className="mb-3" controlId='age'>
						<FloatingLabel controlId="floatingInput" label="Age" >
							<Form.Control 	type="number"  placeholder="Age"
											// className={`${phoneErr.length>1 ? 'inCorrect' : null}`}
											value={age}
											onChange = {(e)=> ageCheck((e.target.value))}
											// onBlur = {(e) => ageCheck(e.target.value)}
											required 
											isInvalid={!!ageErr}
										/>
						</FloatingLabel>
						{ageErr.length>1 ? (<div className='errMsg'>{ageErr}</div>): null}
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group controlId='gender' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Gender">
								<Form.Control as='select' 
									value={gender} 
									onChange={(e) => setGender(e.target.value)}
									required>
									<option value=''>Select Gender</option>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
									<option value='Others'>Others</option>
								</Form.Control>
							</FloatingLabel>
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group className="mb-3" controlId='phone'>
						<FloatingLabel controlId="floatingInput" label="Phone" >
							<Form.Control 	type="number"  placeholder="phone number"
											className={`${phoneErr.length>1 ? 'inCorrect' : null}`}
											value={phone}
											onChange = {(e)=> PH(e.target.value)}
											onBlur = {(e) => valPhone(e.target.value)}
											required 
											isInvalid={!!phoneErr}
										/>
						</FloatingLabel>
						{phoneErr.length>1 ? (<div className='errMsg'>{phoneErr}</div>): null}
					</Form.Group>
				</Col>
				</Row>
			</Col>
		</Row>

		
			{
				loadingDoctor ? <Loader />
					: errorDoctor ? <Message variant='danger'>{errorDoctor}</Message>
					: (
						<Row>
						<Col md={6}>
						<Form.Group controlId='doctor'>
							<FloatingLabel controlId="floatingSelect" label="Referred Doctor">
								<Form.Control as='select' className="mb-3"
									value={doctor} 
									onChange={(e) => {setDoctor(e.target.value)}}
									required
									>
									<option value=''>Referred Doctor</option>
									{doctors.map(doctor => (
										<option key={doctor._id} value={doctor._id}>{doctor.firstName}</option>
									))  }
								</Form.Control>
							</FloatingLabel>
						</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId='visit'>
								<FloatingLabel controlId="floatingSelect" label="Purpose of visit">
									<Form.Control as='select' className="mb-3"
										value={purpose} 
										onChange={(e) => {setPurpose(e.target.value)}}
										required
										>
										<option value=''>Purpose of visit</option>
										<option value='Covid 19'>Covid 19</option>
										<option value='Cold'>Cold</option>
										<option value='Fever'>Fever</option>
									</Form.Control>
								</FloatingLabel>
							</Form.Group>
						</Col>
					</Row>
					)	
			}				
			
		{
			loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: ( 
						<>
						<Form onSubmit={addToTableHandler} >
							<Row>
								<Col md={6}>
									<Form.Group controlId='medicineName' >
										<FloatingLabel controlId="floatingSelect" label="Medicine">
											<Form.Control as='select' value={medicineName} className="mb-3"
													onChange={(e) => setMedicineName(e.target.value)}
													required
													>
													<option value=''>Select Medicine</option>
													{dropDownData.map(product => (
														<option key={product._id} value={product.medicineName}>{product.medicineName}</option>
													))  }
												</Form.Control>
											</FloatingLabel>
										</Form.Group>
								</Col>
								<Col md={5}>
									<Form.Group className="mb-3" controlId='quantity'>
										<FloatingLabel controlId="floatingInput" label="Quantity" >
											<Form.Control 	type="number"  placeholder="Quantity"
															// className={`${phoneErr.length>1 ? 'inCorrect' : null}`}
															value={quantity}
															onChange = {(e)=> qtyCheck(e.target.value)}
															// onBlur = {(e) => valPhone(e.target.value)}
															required 
															isInvalid={!!quantityErr}
														/>
										</FloatingLabel>
										{quantityErr.length>1 ? (<div className='errMsg'>{quantityErr}</div>): null}
									</Form.Group>
								</Col>
								<Col md={1}>
									<Button type='submit' variant='primary' 
									// className={`mt-3 btn-sm ${medNameErr || genNameErr || categoryErr || typeErr || marketedByErr || scheduledCategoryErr || hsnCodeErr || mrpErr || purchasePriceErr || storageTempErr || binLocationErr ? 'disabled' : null} `}>
										><i className='fas fa-plus'></i>
									</Button>
								</Col>
							</Row>
							</Form>
					
		
		
				<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th >Sl</th>
								<th >Medicine</th>
								<th >Quantity</th>
								<th >Type</th>
								<th >Dosage</th>
								<th >Route</th>
								<th>Timing</th>
								<th>Timing Pref.</th>
								<th>Frequency</th>
								<th>MRP</th>
								<th>Tax</th>
								<th>Total</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{	tableData.map((row) => (
										<tr key={row.product._id}>
											<td>{count++}</td>
											<td>{row.product.medicineName}</td>
											<td>
												<InputGroup size="sm" className="mb-3">
												    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
												    	type='number' 
												    	value={row.quantity}
												    	onChange = {(e) => changeQuantity(row.product.medicineName,e.target.value)}
												    />
												 </InputGroup>
											</td>
											<td>{row.product.type}</td>
											<td>{row.product.dose}</td>
											<td>{row.product.route}</td>
											<td>{row.product.timing}</td>
											<td>{row.product.preference}</td>
											<td>
												<Form.Group controlId='Frequency' className="mb-3">
														<FloatingLabel controlId="floatingSelect" label="Frequence">
															<Form.Control as='select' 
																value={frequency} 
																onChange={(e) => setFrequency(e.target.value)}
																required>
																<option value=''>Select</option>
																<option value='Daily'>Daily</option>
																<option value='Alt. Days'>Alt. Days</option>
																<option value='Weekly'>Weekly</option>
																<option value='Monthly'>Monthly</option>
															</Form.Control>
														</FloatingLabel>
												</Form.Group>
											</td>
											<td>{row.product.mrp}</td>
											<td>{row.product.tax}</td>
											<td>{row.totalPrice}</td>
											<td>
												<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(row.product.medicineName)}>
													<i className='fas fa-trash'></i>
												</Button>
											</td>
										</tr>
								))

								}
						</tbody>						
				</Table>
				<Row>
					<Col md={9}>
						<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
							<thead>
								<tr>
									<th >Sl</th>
									<th >GST</th>
									<th >Total Value</th>
									<th >CGST</th>
									<th >Amount</th>
									<th >SGST</th>
									<th >Amount</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{ tableData.map(row => (
										<tr key={row.product._id}>
											<td>{count1++}</td>
											<td>{row.product.tax}</td>
											<td>{row.totalPrice}</td>
											<td>{row.product.tax/2}</td>
											<td>{(((row.product.tax/2)/100)*row.totalPrice).toFixed(2)}</td>
											<td>{row.product.tax/2}</td>
											<td>{(((row.product.tax/2)/100)*row.totalPrice).toFixed(2)}</td>
											<td>{(((row.product.tax/100) * row.totalPrice)+ row.totalPrice).toFixed(2)}</td>
										</tr>
									))
								}
								<tr>
									<td></td>
									<td>Total Value</td>
									<td>{itemTotalPriceWithoutTax}</td>
									<td>Total CGST</td>
									<td>{totalSGST}</td>
									<td>Total SGST</td>
									<td>{totalSGST}</td>
									<td>{saleTotal}</td>
								</tr>
							</tbody>						
						</Table>
					</Col>
					<Col md={3}>
						<Card className='mt-3 mx-3' >
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Total Value</Col>
										<Col><strong>Rs. {itemTotalPriceWithoutTax}</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Discount</Col>
										<Col><strong>5%</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Total with Discount</Col>
										<Col><strong>Rs. {discountPrice}</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>GST</Col>
										<Col><strong>Rs. {totalGST}</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Round Off</Col>
										<Col><strong>Rs.0.00</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col style={{color: 'red'}}><strong>Total Amount</strong></Col>
										<Col><strong>Rs. {saleTotal}</strong></Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
				</>
		)}
				<Row>
					<Col>
						<FloatingLabel controlId="floatingTextarea2" label="Remarks/Notes" className='my-3'>
										<Form.Control
										  as="textarea"
										  placeholder="Leave a comment here"
										  style={{ height: '100px' }}
										  value={remarks}
										  onChange={(e) => setRemarks(e.target.value)}
										/>
						</FloatingLabel>
					</Col>
					<Col>
						<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button variant='outline-dark' className='btn mx-1'
								onClick={clearHandler} 
								>
								Clear
							</Button>
							<Button variant='outline-dark' className='btn mx-1'
								onClick={e => saveHandler(e)} 
								>
								Save
							</Button>
							<Button variant='outline-dark' className='btn mx-1'
								onClick={e => submitHandler(e)} 
								>
								Submit
							</Button>
						</div>
					</Col>

				</Row>
		
		</>
		)
}


export default SaleScreen