import React, { useState, useEffect } from 'react'
import { Nav,Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts} from '../actions/otherActions'
import { createOrder, getOrderDetails } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'



const PurchaseOrderEditScreen = ({history}) => {
	let count=0;
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const { id } = useParams()
	const orderId = id

	const [medicineName, setMedicineName] = useState('')
	const [quantity, setQuantity] = useState('')
	

	const productList = useSelector( state => state.productList )
	const { loading, error, products } = productList
	
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const orderDetails = useSelector( state => state.orderDetails )
	const { loading: orderLoading, error: orderError, order } = orderDetails

	// const orderCreate = useSelector(state => state.orderCreate)
	// const { order, loading: createLoading, error: createError, success:createSuccess } = orderCreate

	const [dropDownData, setDropDownData] = useState(products)
	const [tableData, setTableData] = useState()



	let addDecimals = (num) => {
			return (Math.round(num*100)/100).toFixed(2)
		}

	useEffect(() => {

		if(!userInfo || !(userInfo.role === '1' || userInfo.role === '3')){
			navigate('/')
		}

		dispatch(listProducts())

		if(!order || order._id !== orderId ){
				console.log('dispatch')
				dispatch(getOrderDetails(orderId))
		}
		
		// if(createSuccess){
		// 	dispatch({type: ORDER_CREATE_RESET})
		// 	setTableData([])
			
		// 	navigate('/order/status')
		// }
	},[dispatch, navigate, userInfo,  orderId, order])

		useEffect(()=>{
		   setDropDownData(products)
		},[products])

	

	const addToTableHandler = (e) => {
		
				e.preventDefault()
				// console.log(medicineName)
				// console.log(quantity)
				const productExists= order.orderItems.find((items) =>
		   				items.name.toLowerCase().indexOf(medicineName.toLowerCase()) > -1)

				console.log(productExists)
				if(productExists){
					const newOrderItem = {
						name: productExists.name,
						qty: quantity,
						price: productExists.purchase,
						product: productExists.product
					}
					console.log(newOrderItem)
					const index = order.orderItems.findIndex((items) => items.name === productExists.name)
					order.orderItems[index] = newOrderItem
					console.log(order)
				}


				// const productToAdd = dropDownData.find((product) =>
				//    product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1);
				// console.log(productToAdd)
				// const rowToAdd = {product: productToAdd, quantity: quantity};
				// // console.log(rowToAdd)
				// setTableData(tableData => [...tableData, rowToAdd])
				// console.log(tableData)

				const arr2 = dropDownData.filter((product) => 
					product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()))
				// console.log(arr2)
				setDropDownData(arr2)
				// console.log(arr2)
				setQuantity('')
				
		   
	}

	const deleteHandler = (medicineName) => {
		
		tableData.splice(tableData.findIndex(row => row.product.medicineName === medicineName), 1)
    	
    	const productBack = products.find((product) =>
		   product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1);

    	setDropDownData(dropDownData => [...dropDownData, productBack])

	}

		const changeQuantity = (medicineName, quantity) => {
			console.log(medicineName)
			console.log(quantity)
			// const index = tableData.findIndex((product) => product.medicineName === medicineName);
			const newArr = order.orderItems.map(items => {
				  if (items.name === medicineName) {
				        items.qty = Number(quantity)
					  }
				  return items
				})
			

			console.log(newArr)
			order = newArr
		}


		const submitHandler = () => {

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

				console.log(orderItems)

				dispatch(
					createOrder({orderItems})
				)

		}


	return(
		<>
			<h2>Edit Order</h2>

			{/*{createLoading && <Loader />}
			{createError && <Message variant='danger'>{createError}</Message>}*/}
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

		{
			orderLoading ? <Loader />
					: orderError ? <Message variant='danger'>{orderError}</Message>
					: (
						<>
							<h3>Order: {order._id}</h3>
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
												{order.orderItems.map(items => (
														<tr key={items._id} >
															<td>{count+1}</td>
															<td>{items.name}</td>
															<td>{items.product.currentStock}</td>
															<td>{items.product.lowStockValue}</td>
															<td>{items.product.reOrderValue}</td>
															<td>
																<InputGroup size="sm" className="mb-3">
																    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
																    	type='number' 
																    	value={items.qty}
																    	onChange = {(e) => changeQuantity(items.medicineName,e.target.value)}
																    />
																 </InputGroup>
															</td>
															<td>
																<Button variant='danger' className='btn-sm' 
																		// onClick={()=> deleteHandler(row.product.medicineName)}
																		>
																	<i className='fas fa-trash'></i>
																</Button>
															</td>
														</tr>
													)) }
											</tbody>						
									</Table>
									<p className='mt-3'>Total Quantity: {order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</p>
						</>
					)
		}
		
		
			<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
			{/*<Button className='mt-3' type='submit' variant='dark'>Clear</Button>*/}
			{/*<Button className='mt-3' type='submit' variant='info'>Save</Button>*/}
			<Button className='mt-3 mx-3' type='submit' onClick={() => submitHandler()} variant='dark'>Update</Button>
			</div>
		</>
		)
}


export default PurchaseOrderEditScreen