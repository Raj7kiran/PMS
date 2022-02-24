import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import IntentSteps from '../components/IntentSteps'



const IntentScreen = () => {
	let count=0;
	const dispatch = useDispatch()
	let navigate = useNavigate()
	// const [validated, setValidated] = useState(null);
	// const [totalQuantity, setTotalQuantity] =  useState(0)
	// const [confirmButton, setConfirmButton] = useState(false)

	// const [productErr, setProductErr] = useState('')
	// const [qtyErr, setQtyErr] = useState('')

	const [medicineName, setMedicineName] = useState('')
	const [quantity, setQuantity] = useState('')
	const [remarks, setRemarks] = useState('')
	const [tableData, setTableData] = useState([])

	// const [orderItems, setOrderItems] = useState([])

	const productList = useSelector( state => state.productList )
	const { loading, error, products } = productList
	// console.log(products)
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const orderCreate = useSelector(state => state.orderCreate)
	const { loading: createLoading, error: createError, success:createSuccess } = orderCreate

	const [dropDownData, setDropDownData] = useState(products)

	let addDecimals = (num) => {
			return (Math.round(num*100)/100).toFixed(2)
		}

	useEffect(()=>{
		   setDropDownData(products)
		   
		},[products])

	useEffect(() => {

		if(!userInfo){
			navigate('/')
		}

		
			// dispatch(listProducts())
		

		if(createSuccess){
			// dispatch({type: ORDER_CREATE_RESET})
			setTableData([])
			// setOrderItems([])
			navigate('/order/status')
		}
		
		
		// setValidated(null);

	},[dispatch, navigate, userInfo, createSuccess])

	// const submitHandler = (e) => {
	// 	e.preventDefault()
	// 	console.log(medicineName)
	// 	console.log(quantity)
	// 	const arr = dropDownData.filter((product) => 
	// 		product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1)
		
	// 	// console.log(arr)
	// 	// const arr2 = arr2.map(arr => {...arr})
	// 	setTableData(tableData => tableData.concat(arr))
	// 	// setSearches(searches => searches.concat(query))
	// 	// setSearches(searches => [...searches, query])
	// 	// setTableData(tableData => [...tableData, arr ])
	// 	// console.log(tableData)

	// 	const arr2 = dropDownData.filter((product) => 
	// 		product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()))
	// 	console.log(arr2)
	// 	setDropDownData(arr2)
	// 	console.log(arr2)
	// }

	const addToTableHandler = (e) => {
		// productCheck(e.target.value)
		// 	qtyCheck(e.target.value)
		// if(!productErr.length>0 || !qtyErr.length>0)
		// 	{
		    	// setValidated(null);
				e.preventDefault()
				// console.log(medicineName)
				// console.log(quantity)
				const productToAdd = dropDownData.find((product) =>
				   product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1);
				console.log(productToAdd)
				const rowToAdd = {product: productToAdd, quantity: quantity};
				// console.log(rowToAdd)
				setTableData(tableData => [...tableData, rowToAdd])
				console.log(tableData)

				const arr2 = dropDownData.filter((product) => 
					product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()))
				// console.log(arr2)
				setDropDownData(arr2)
				// console.log(arr2)
				setQuantity('')
			// }	
		   
	}

	const deleteHandler = (medicineName) => {
		// console.log('deleteHandler start')
		// const newData = [...tableData];
		// console.log(newData)
		// const index = tableData.findIndex((product) => product.medicineName === medicineName);
		// // console.log(index)
		// newData.splice(index, 1);
		// setTableData(newData);
		tableData.splice(tableData.findIndex(row => row.product.medicineName === medicineName), 1)
    	// console.log(tableData)
    	// const tableBack = tableData.find((row) =>
		   // row.product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()));
    	// setTableData(tableData => [tableBack])


    	const productBack = products.find((product) =>
		   product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1);

    	setDropDownData(dropDownData => [...dropDownData, productBack])

  //   	const index1 = orderItems.findIndex((product) => product.name === medicineName);
		// // console.log(index)
		// orderItems.splice(index1, 1);


    	// console.log('deleteHandler end')
	}

	

		const changeQuantity = (medicineName, quantity) => {
			console.log(medicineName)
			console.log(quantity)
			// const index = tableData.findIndex((product) => product.medicineName === medicineName);
			const newArr = tableData.map(row => {
				  if (row.product.medicineName === medicineName) {
				        row.quantity = Number(quantity)
					  }
				  return row
				})
			

			console.log(newArr)
			setTableData(newArr)
		}


		const submitHandler = () => {
			// console.log(tableData)

			let orderItems = []

			tableData.map(row => {				
				let totalPrice = Number(addDecimals(row.product.purchasePrice*row.quantity))
				const newItem =  {
					name: row.product.medicineName,
					qty: row.quantity,
					product: row.product._id,
					price: row.product.purchasePrice,
					totalPrice
				}
				// console.log(newItem)
			
				orderItems = [...orderItems, newItem]
			})

			// const orderTotalPrice = orderItems.reduce((acc, item) => acc + item.totalPrice, 0 )
			// console.log(orderTotalPrice)
			console.log(orderItems)

				// dispatch(
				// 	createOrder({orderItems})
				// )


			// if(window.confirm('Make sure you have clicked the Confirm button to add the products in the order?')){
			// 	const orderTotalPrice = orderItems.reduce((acc, item) => acc + item.totalPrice, 0 )
			// 	console.log(orderTotalPrice)

			// 	dispatch(
			// 		createOrder({orderItems, orderTotalPrice})
			// 	)
			// }	
		}


	return(
		<>
			<IntentSteps />
			{createLoading && <Loader />}
			{createError && <Message variant='danger'>{createError}</Message>}
			{/*{createSuccess && <Message variant='info'>Purchase Initiated</Message>}*/}
		{
			loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
						<Form onSubmit={addToTableHandler} >
							<Row>
								<Col md={7}>
									<Form.Group controlId='medicineName' >
										<FloatingLabel controlId="floatingSelect" label="Medicine">
											<Form.Control as='select' value={medicineName} className="mb-3"
													onChange={(e) => setMedicineName(e.target.value)}
													// className={`${countryErr.length>1 ? 'inCorrect' : null}`}
													// onBlur = {(e) => CN(e.target.value)}
													required
													>
													<option value=''>Select Medicine</option>
													{dropDownData.map(product => (
														<option key={product._id} value={product.medicineName}>{product.medicineName}</option>
													))  }
												</Form.Control>
											</FloatingLabel>
											{/*{productErr.length>1 ? (<div className='errMsg'>{productErr}</div>): null}*/}
									</Form.Group>
								</Col>
								<Col md={3}>
									<Form.Group className="mb-3" controlId='quantity'>
										<FloatingLabel controlId="floatingInput" label="Quantity" >
											<Form.Control 	type="number"  placeholder="Quantity"
															// className={`${phoneErr.length>1 ? 'inCorrect' : null}`}
															value={quantity}
															onChange = {(e)=> setQuantity(Number(e.target.value))}
															// onBlur = {(e) => valPhone(e.target.value)}
															required 
														/>
										</FloatingLabel>
										{/*{qtyErr.length>1 ? (<div className='errMsg'>{qtyErr}</div>): null}*/}
									</Form.Group>
								</Col>
								<Col md={2}>
									<Button type='submit' variant='primary' 
									// className={`mt-3 btn-sm ${medNameErr || genNameErr || categoryErr || typeErr || marketedByErr || scheduledCategoryErr || hsnCodeErr || mrpErr || purchasePriceErr || storageTempErr || binLocationErr ? 'disabled' : null} `}>
										>Add
									</Button>
								</Col>
							</Row>
							</Form>
					) 
		}
		

		<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th ><span className='btn'>Sl</span></th>
								<th ><span className='btn'>Medicine</span></th>
								<th ><span className='btn'>Generic Name</span></th>
								<th ><span className='btn'>Dosage</span></th>
								<th ><span className='btn'>Type</span></th>
								<th ><span className='btn'>Requested Quantity</span></th>
								<th ><span className='btn'>Approved Quantity</span></th>
								<th><span className='btn'>Action</span></th>
							</tr>
						</thead>
						<tbody>
							{tableData.map(row => (
									<tr key={row.product._id} >
										<td>{count+1}</td>
										<td>{row.product.medicineName}</td>
										<td>{row.product.genericName}</td>
										<td>{row.product.dose}</td>
										<td>{row.product.type}</td>
										<td>qty</td>
										<td>{/*{row.quantity}*/}
											<InputGroup size="sm" className="mb-3">
											    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
											    	type='number' 
											    	value={row.quantity}
											    	onChange = {(e) => changeQuantity(row.product.medicineName,e.target.value)}
											    />
											 </InputGroup>
										</td>
										<td>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(row.product.medicineName)}>
												<i className='fas fa-trash'></i>
											</Button>
											{/*<Button variant='success' className='btn-sm' 
													onClick={()=> addItems(row)}
													// disabled={confirmButton}
												>Confirm</Button>*/}
										</td>
									</tr>
								)) }
						</tbody>						
				</Table>
				<p className='mt-3'>Total Quantity: {tableData.reduce((acc, row) => acc + row.quantity, 0)}</p>
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
								// onClick={clearHandler} 
								>
								Clear
							</Button>
							<Button variant='outline-dark' className='btn mx-1'
								// onClick={e => saveHandler(e)} 
								>
								Save
							</Button>
							<Button variant='outline-dark' className='btn mx-1'
								// onClick={e => submitHandler(e)} 
								>
								Submit
							</Button>
						</div>
					</Col>

				</Row>
		</>
		)
}


export default IntentScreen