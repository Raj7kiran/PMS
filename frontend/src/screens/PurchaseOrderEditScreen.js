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
	let count=1;
	const dispatch = useDispatch()
	const [tableData, setTableData] = useState({ orderItems: [] })

	const { id } = useParams()
	const orderId = id

	const [medicineName, setMedicineName] = useState('')
	const [quantity, setQuantity] = useState('')

	const productList = useSelector( state => state.productList )
	const { products } = productList
	// console.log(products)
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const orderDetails = useSelector( state => state.orderDetails )
	const { loading, error, order } = orderDetails

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

		if(!order || order._id !== orderId ){
				console.log('dispatch')
				dispatch(getOrderDetails(orderId))
		}		
		
		if(tableData.length === 0){
			console.log('zero')
			setTableData(order)
		}
		
		
		dispatch(listProducts())
		// setValidated(null);
	},[dispatch, history, userInfo, orderId, order])

	console.log(tableData)

	const addToTableHandler = () => {

	}

		const submitHandler = () => {

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
		<Link to='/orderstatus' className='btn btn-dark my-3'>Go Back</Link>
		<h2>Purchase Order Edit Screen</h2>
		<p>Order#: {order._id}</p>
		
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
		
		{loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
			<div>
			<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>Sl</th>
								<th>Medicine</th>
								<th>C.Stock</th>
								<th>Low Stock</th>
								<th>Reorder Quantity</th>
								<th>Quantity</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{tableData.orderItems.map(item => (
									<tr key={item._id} >
										<td>{count++}</td>
										<td>{item.name}</td>
										<td>{item.product.currentStock}</td>
										<td>{item.product.lowStockValue}</td>
										<td>{item.product.reOrderValue}</td>
										<td>{item.qty}
											{/*<InputGroup className="mb-3">
											    <FormControl placeholder={`${item.qty}`} aria-label="Quantity" aria-describedby="basic-addon1"
											    	// onChange={(e) => setQuantity(e.target.value)}
											    />
											</InputGroup>*/}
										</td>
										<td>
											<Button variant='danger' className='btn-sm' 
													// onClick={()=> deleteHandler(row.product.medicineName)}
											>
												<i className='fas fa-trash'></i>
											</Button>
											<Button variant='success' className='btn-sm' 
													// onClick={()=> addItems(row)}
													// disabled={confirmButton}
											>Confirm</Button>
										</td>
									</tr>
								))}
						</tbody>						
			</Table>
					<p className='mt-3'>Total Quantity: {order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</p>
				</div>
			)}
		
		<Button className='mt-3' type='submit' onClick={() => submitHandler()} variant='dark'>Update</Button>

		</>
		)
}


export default PurchaseOrderEditScreen