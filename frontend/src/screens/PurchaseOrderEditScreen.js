import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts} from '../actions/otherActions'
import { getOrderDetails } from '../actions/orderActions'
// import { ORDER_CREATE_RESET } from '../constants/orderConstants'


const PurchaseOrderEditScreen = () => {
	let count=1;
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const { id } = useParams()
	const orderId = id

	const [medicineName, setMedicineName] = useState('')
	const [quantity, setQuantity] = useState('')

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	const productList = useSelector( state => state.productList )
	const { loading: productLoading, error: productError, products } = productList

	const orderDetails = useSelector( state => state.orderDetails )
	const { loading, error, order } = orderDetails

	// const [tableData, setTableData] = useState({})
	const [dropDownData, setDropDownData] = useState(products)

	let addDecimals = (num) => {
			return (Math.round(num*100)/100).toFixed(2)
		}

	// useEffect(() => {
	// 	setTableData(order.orderItems)
	// 	console.log('tableData')
	// 	console.log(tableData)
	// },[order.orderItems])


	useEffect(()=>{
		   setDropDownData(products)
		},[products])

	

	useEffect(() => {

		if(!userInfo ){
			navigate('/')
		}

		dispatch(listProducts())
		
		if(!order || order._id !== orderId ){
				console.log('dispatch')
				dispatch(getOrderDetails(orderId))
			} 		
	},[dispatch, order, orderId, navigate, userInfo])


	
	// console.log('tableData2')
	// console.log(tableData)
	
	
		// order.orderItems.map(items => {
		// 	const arr2 = dropDownData.filter((product) => 
		// 			product.medicineName.toLowerCase().indexOf(items.name.toLowerCase()))
		// 		// console.log(arr2)
		// 		setDropDownData(arr2)

		

	
	
	const addToTableHandler = (e) => {
			// e.preventDefault()
			
			// const productToAdd = dropDownData.find((product) =>
			//    product.medicineName.toLowerCase().indexOf(medicineName.toLowerCase()) > -1);
			// console.log(productToAdd)

			// const rowToAdd = { orderItems:[{name: productToAdd.medicineName, qty: quantity, price: productToAdd.purchasePrice}, product: {_id: productToAdd._id}] }
			// console.log(rowToAdd)

			// const productExists= order.orderItems.find((product) =>
		 //   		product.name.toLowerCase().indexOf(productToAdd.medicineName.toLowerCase()) > -1)
			// if(productExists){
			// 	const index = order.orderItems.findIndex((product) => product.name === productToAdd.name)
			// 	order.orderItems[index] = rowToAdd
			// 	console.log(order)
			// } else {
			// 	console.log('does not exist')
			// }

	}

	const changeQuantity = (id, quant) => {
		console.log(id, quant)
		
		order.orderItems.map(item => {
			if(item._id == id){
				item.qty= quant
				console.log(item)
			}
		})

	}


	const deleteHandler = () => {
		console.log('deleteHandler')
	}

	
	return (
		<>
			<Link to='/order/status' className='btn btn-dark my-3'>Go Back</Link>
			<h3>Edit Order</h3>

			{
				productLoading ? <Loader />
						: productError ? <Message variant='danger'>{productError}</Message>
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
																onChange = {(e)=> setQuantity(e.target.value)}
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

			{loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
				<div>
				<h4>Order : {order._id}</h4>
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
								{order.orderItems.map(item => (
										<tr key={item._id} >
											<td>{count++}</td>
											<td>{item.name}</td>
											<td>{item.product.currentStock}</td>
											<td>{item.product.lowStockValue}</td>
											<td>{item.product.reOrderValue}</td>
											<td>
												<InputGroup size="sm" className="mb-3">
												    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
												    	type='number' 
												    	value={item.qty}
												    	onChange = {(e) => changeQuantity(item._id,e.target.value)}
												    />
												 </InputGroup>
											</td>
											<td>
												<Button variant='danger' className='btn-sm' 
														onClick={()=> deleteHandler(item.product.medicineName)}>
													<i className='fas fa-trash'></i>
												</Button>
											</td>
										</tr>
									)) }
							</tbody>						
					</Table>
					<p className='mt-3'>Total Quantity: {order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</p>
				</div>
				)}
		</>
		)
}


export default PurchaseOrderEditScreen