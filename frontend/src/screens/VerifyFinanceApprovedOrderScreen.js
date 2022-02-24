import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Form, FloatingLabel, Card, ListGroup } from 'react-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, finalApproveOrder, rejectOrder } from '../actions/orderActions'
import {listSupplier} from '../actions/otherActions'
import { ORDER_FINALAPPROVE_RESET, ORDER_REJECT_RESET }  from '../constants/orderConstants'


const VerifyFinanceApprovedOrderScreen = () => {
	let count=1
	const { id } = useParams()
	const orderId = id
	const dispatch = useDispatch()
	let navigate = useNavigate()
	
	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const orderDetails = useSelector(state => state.orderDetails)
	const { order ,loading, error } = orderDetails

	const supplierList = useSelector(state => state.supplierList)
	const { loading: supplierLoading, error: supplierError, suppliers } = supplierList

	const orderFinalApprove = useSelector(state => state.orderFinalApprove)
	const { loading: loadingApprove, success: successApprove, error: errorApprove } = orderFinalApprove

	const orderReject = useSelector(state => state.orderReject)
	const { loading: loadingReject, success: successReject, error: errorReject } = orderReject

	const [remarks, setRemarks] = useState('')
	const [vendor, setVendor] = useState('')

	useEffect(() => {

		if(!userInfo || !(userInfo.role === '5' || userInfo.role === '6')){
			navigate('/')
		}

		dispatch(listSupplier())
		dispatch({type: ORDER_REJECT_RESET})
		dispatch({type: ORDER_FINALAPPROVE_RESET})

		if(!order || order._id !== orderId ){
				dispatch(getOrderDetails(orderId))
			} 

		if(successApprove){
			dispatch({type: ORDER_FINALAPPROVE_RESET})
			navigate('/order/approved/finance')
		}

		if(successReject){
			dispatch({type: ORDER_REJECT_RESET})
			navigate('/order/approved/finance')
		}

		},[dispatch, order, orderId, userInfo, navigate, successApprove, successReject])

	if(!loading){
		//Calculates Price
		const addDecimals = (num) => {
			return (Math.round(num*100)/100).toFixed(2)
		}

		order.itemTotalPrice = Number(addDecimals(order.orderItems.reduce(
						(acc, item) => acc + item.totalPrice, 0 )))
		order.taxPrice = Number(addDecimals(order.orderItems.reduce(
						(acc, item) => acc + item.taxPrice, 0 )))
		console.log(typeof(order.itemTotalPrice))
		console.log(typeof(order.taxPrice))

		order.orderTotalPrice = order.itemTotalPrice
	}

	const changeVendor = (vendor, id) => {
		console.log(id)
		console.log(vendor)

		order.orderItems.map(item => {
			if(item._id == id){
				item.vendor = vendor
			}
		})
	}
	
		const approveHandler = () => {
				let orderItems = order.orderItems
				console.log(remarks)
				console.log(orderItems)
				dispatch(finalApproveOrder(orderId, remarks, orderItems))
			}
	
		const rejectHandler = () => {
				console.log(order._id)
				dispatch(rejectOrder(order._id, remarks))
			}


	return(
		<>
			<Link to='/order/approved/finance' className='btn btn-dark my-3'>Go Back</Link>
			<h3>Finance Approved Order</h3>
			{ loadingApprove && <Loader /> }
			{errorApprove && <Message variant='danger'>{errorApprove}</Message>}
			{ loadingReject && <Loader /> }
			{errorReject && <Message variant='danger'>{errorReject}</Message>}
			{
				loading ? <Loader />
				: error ? <Message variant='danger'>{error}</Message>
				: (
					<>
			<Row>
				<Col md={5}>
					<Card>
					  	<Card.Body>Purchase Request No. <b>{order._id}</b></Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card>
					  	<Card.Body>Requested Date: <b>{order.createdAt.substring(0,10)}</b></Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card>
					  	<Card.Body>Requested By: <b>{order.user.firstName}</b></Card.Body>
					</Card>
				</Col>
			</Row>

			<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>S.No</th>
								<th>Manufacturer</th>
								<th>Medicine</th>
								<th >Quantity</th>
								<th>Vendor</th>
								<th >MRP</th>
								<th >Purchase Price</th>
								<th >Tax %</th>
								<th >Discount</th>
								<th >Stock Discount</th>
								<th >Total Price</th>
							</tr>
						</thead>
						<tbody>
							{order.orderItems.map(item => (
									<tr key={item._id} >
										<td>{count++}</td>
										<td>Manufacturer Name</td>
										<td>{item.name}</td>
										<td>{item.qty}</td>
										<td>
											<Form.Group controlId='vendor' className="mb-3">
													<Form.Control className='order-dropdown' as='select' 
														value={item.vendor} 
														onChange={(e) => changeVendor(e.target.value, item._id)}
														required
														>
														<option value=''>Select Vendor</option>
														{
															suppliers.map(supplier => (
																	<option key={supplier._id} value={supplier.supplierName}>{supplier.supplierName}</option>
																))
														}
													</Form.Control>
											</Form.Group>
										</td>
										<td>{item.product.mrp}</td>
										<td>{item.product.purchasePrice}</td>
										<td>{item.product.tax}</td>										
										<td>
											<tr>
												<td>
													<Card><Card.Footer>{item.product.discount}</ Card.Footer></Card>
												</td>
												<td>
													<Card><Card.Footer>{Number(item.product.purchasePrice*item.product.discount).toFixed(2)}</Card.Footer></Card>
												</td>
											</tr>
										</td>	
										<td>
											<tr>
												<td>
													<Card><Card.Footer>{item.product.stockDiscount}</ Card.Footer></Card>
												</td>
												<td>
													<Card><Card.Footer>{Number(item.product.purchasePrice*item.product.stockDiscount).toFixed(2)}</Card.Footer></Card>
												</td>
											</tr>
										</td>									
										<td>{item.totalPrice}</td>
									</tr>
								)) }
						</tbody>
				</Table>
				<Row>
					<Col md={8}>
						<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
								<thead>
									<tr>
										<th>S.No</th>
										<th>GST</th>
										<th>Total Value</th>
										<th>CGST</th>
										<th>Amount</th>
										<th>SGST</th>
										<th>Amount</th>										
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{order.orderItems.map(item => (
											<tr key={item._id} >
												<td>{count++}</td>
												<td>10</td>
												<td>{Number(item.totalPrice*0.1).toFixed(2)}</td>
												<td>5</td>
												<td>{Number(item.totalPrice*0.05).toFixed(2)}</td>
												<td>5</td>
												<td>{Number(item.totalPrice*0.05).toFixed(2)}</td>										
												<td>{Number(item.totalPrice*0.1).toFixed(2)}</td>										
											</tr>
										)) }
								</tbody>
						</Table>
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Total Value</Col>
										<Col><strong>Rs.{order.itemTotalPrice}</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>GST</Col>
										<Col><strong>Rs.{order.taxPrice}</strong></Col>
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
										<Col><strong>Rs.{order.orderTotalPrice}</strong></Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
				</>
				)
			}
				<Row className='align-items-center'>
					<Col md={8}>
						{
								!(order.isFinalApproved === true || order.isFinalApproved === false)  ? (
										<FloatingLabel controlId="floatingTextarea2" label="Remarks/Notes" className='my-3'>
											   <Form.Control
											     as="textarea"
											     placeholder="Leave a comment here"
											     style={{ height: '100px' }}
											     // value={app.remarks}
											     onChange={(e) => setRemarks(e.target.value)}
											   />
										</FloatingLabel>
									) :
								order.finalApprovalDetails.map(app => (
									<>
										<FloatingLabel controlId="floatingTextarea2" label="Remarks/Notes" className='my-3'>
										    <Form.Control
										      as="textarea"
										      placeholder="Leave a comment here"
										      style={{ height: '100px' }}
										      value={app.remarks}
										      disabled={ order.isFinalApproved === true }
										    />
										</FloatingLabel>
									</>
									))
							}
					</Col>
					<Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
					{
						order.isFinalApproved === true || order.isFinanceApproved === false ? ('') : (
						<>
						{/*<LinkContainer to={`/order/approved/finance`}>*/}
							<Button className='' variant='outline-dark' className='btn mx-1'
								onClick={rejectHandler} 
								>
								Reject
							</Button>
						{/*</LinkContainer>*/}
						{/*<LinkContainer to={`/orderlist`}>*/}
							<Button variant='outline-success' className='btn mx-1'
								onClick={approveHandler}
								>
								Approve
							</Button>
						{/*</LinkContainer>*/}
						</>
						)
					}
					</Col>
				</Row>

				
		</>
		)
}


export default VerifyFinanceApprovedOrderScreen