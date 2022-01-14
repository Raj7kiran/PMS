import React, { useState, useEffect } from 'react'
import { Nav,Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts} from '../actions/otherActions'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


const PurchaseOrderScreen = ({history}) => {
	let count=0;
	const dispatch = useDispatch()
	// const [validated, setValidated] = useState(null);
	// const [totalQuantity, setTotalQuantity] =  useState(0)
	// const [confirmButton, setConfirmButton] = useState(false)

	// const [productErr, setProductErr] = useState('')
	// const [qtyErr, setQtyErr] = useState('')

	const [medicineName, setMedicineName] = useState('')
	const [quantity, setQuantity] = useState('')
	const [tableData, setTableData] = useState([])

	const [orderItems, setOrderItems] = useState([])

	const productList = useSelector( state => state.productList )
	const { products } = productList
	// console.log(products)
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const orderCreate = useSelector(state => state.orderCreate)
	const { order, loading: createLoading, error: createError, success:createSuccess } = orderCreate

	const [dropDownData, setDropDownData] = useState(products)

	const addDecimals = (num) => {
			return (Math.round(num*100)/100).toFixed(2)
		}

	useEffect(()=>{
		   setDropDownData(products)
		},[products])

	useEffect(() => {

		if(!userInfo){
			history.push('/login')
		}

		if(createSuccess){
			dispatch({type: ORDER_CREATE_RESET})
			setTableData([])
			setOrderItems([])
		}
		
		dispatch(listProducts())
		// setValidated(null);

	},[dispatch, history, userInfo, createSuccess])

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
				// console.log(tableData)

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
		const newData = [...tableData];
		// console.log(newData)
		const index = tableData.findIndex((product) => product.medicineName === medicineName);
		// console.log(index)
		newData.splice(index, 1);
		setTableData(newData);
    	// console.log(tableData)

    	const productBack = products.find((product) =>
		   product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1);

    	setDropDownData(dropDownData => [...dropDownData, productBack])

    	const index1 = orderItems.findIndex((product) => product.name === medicineName);
		// console.log(index)
		orderItems.splice(index1, 1);


    	// console.log('deleteHandler end')
	}

	const addItems = (row) => {
		console.log(row)
		const name = row.product.medicineName
		console.log(name)

		let totalPrice = Number(addDecimals(row.product.purchasePrice*row.quantity))

		const productExists= orderItems.find((product) =>
		   product.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
		
		if(productExists){
			const newItem =  {
				name: row.product.medicineName,
				qty: row.quantity,
				product: row.product._id,
				price: row.product.purchasePrice,
				totalPrice
			}
			const index = orderItems.findIndex((product) => product.name === name)
			orderItems[index] = newItem

		} else {
			const newItem =  {
				name: row.product.medicineName,
				qty: row.quantity,
				product: row.product._id,
				price: row.product.purchasePrice,
				totalPrice
			}
			// console.log(newItem)
			
			setOrderItems(orderItems => [...orderItems, newItem]) 
			// console.log(orderItems)
		}
		
			console.log('orderItems')
			console.log(orderItems)
			// setConfirmButton(true)
			
		}

		// const productCheck = (data) => {
		// 	console.log('called product check')
		// 	if(!data){
		// 		setProductErr('Please select a preferred timing')
		// 	}else{
		// 		setProductErr('')
		// 	}
		// }

		// const qtyCheck = (data) => {
		// 	console.log('called qty check')

		// 	if(!data){
		// 		setQtyErr('Please select a preferred timing')
		// 	} else if (data < 101){
		// 		setQtyErr('Please select a preferred timing')
		// 	}	
		// 	else{
		// 		setQtyErr('')
		// 	}
		// }


		const submitHandler = () => {

			if(window.confirm('Make sure you have clicked the Confirm button to add the products in the order?')){
				const orderTotalPrice = orderItems.reduce((acc, item) => acc + item.totalPrice, 0 )
				console.log(orderTotalPrice)

				dispatch(
					createOrder({orderItems, orderTotalPrice})
				)
			}	
		}


	return(
		<>
		<h2>PurchaseOrderScreen</h2>
		<Nav className='my-3' variant="tabs" >
		  	<LinkContainer to='/order' >
				<Nav.Link>Purchase Order</Nav.Link>
			</LinkContainer>
			<LinkContainer to='/orderstatus'>
				<Nav.Link>Purchase Order Status</Nav.Link>
			</LinkContainer>
		</Nav>
			{createLoading && <Loader />}
			{createError && <Message variant='danger'>{createError}</Message>}
			{/*{createSuccess && <Message variant='info'>Purchase Initiated</Message>}*/}
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
						<Form.Control 	type="text"  placeholder="Quantity"
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

		<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th ><span className='btn'>Sl</span></th>
								<th ><span className='btn'>Medicine</span></th>
								<th ><span className='btn'>C.Stock</span></th>
								<th ><span className='btn'>Low Stock</span></th>
								<th ><span className='btn'>Reorder Quantity</span></th>
								<th ><span className='btn'>Quantity</span></th>
								<th><span className='btn'>Action</span></th>
							</tr>
						</thead>
						<tbody>
							{tableData.map(row => (
									<tr key={row.product._id} >
										<td>{count+1}</td>
										<td>{row.product.medicineName}</td>
										<td>{row.product.currentStock}</td>
										<td>{row.product.lowStockValue}</td>
										<td>{row.product.reOrderValue}</td>
										<td>{row.quantity}
											{/*<InputGroup size="sm" className="mb-3">
											    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
											    	value={row.quantity}

											    />
											 </InputGroup>*/}
										</td>
										<td>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(row.product.medicineName)}>
												<i className='fas fa-trash'></i>
											</Button>
											<Button variant='success' className='btn-sm' 
													onClick={()=> addItems(row)}
													// disabled={confirmButton}
												>Confirm</Button>
										</td>
									</tr>
								)) }
						</tbody>						
				</Table>
				<p className='mt-3'>Total Quantity: {orderItems.reduce((acc, item) => acc + item.qty, 0)}</p>
			<Button className='mt-3' type='submit' variant='dark'>Clear</Button>
			{/*<Button className='mt-3' type='submit' variant='info'>Save</Button>*/}
			<Button className='mt-3 mx-3' type='submit' onClick={() => submitHandler()} variant='dark'>Submit</Button>

		</>
		)
}


export default PurchaseOrderScreen