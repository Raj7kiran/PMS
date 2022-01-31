import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Form, FloatingLabel, Card, ListGroup } from 'react-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, financeApproveOrder, rejectOrder } from '../actions/orderActions'
import { ORDER_FINANCEAPPROVE_RESET, ORDER_REJECT_RESET }  from '../constants/orderConstants'


const VerifyApprovedOrderScreen = () => {
	let count=1
	const { id } = useParams()
	const orderId = id
	const dispatch = useDispatch()
	let navigate = useNavigate()
	
	const orderDetails = useSelector(state => state.orderDetails)
	const { order ,loading, error } = orderDetails

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const orderFinanceApprove = useSelector(state => state.orderFinanceApprove)
	const { loading: loadingApprove, success: successApprove, error: errorApprove } = orderFinanceApprove

	const orderReject = useSelector(state => state.orderReject)
	const { loading: loadingReject, success: successReject, error: errorReject } = orderReject

	const [remarks, setRemarks] = useState('')

	//it is important to include loading coz when data isloading if this conditon
	//is not included then app will break as order items cannot be found
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

	useEffect(() => {

		if(!userInfo || !(userInfo.role === '4' || userInfo.role === '6')){
			navigate('/')
		}

		dispatch({type: ORDER_REJECT_RESET})
		dispatch({type: ORDER_FINANCEAPPROVE_RESET})

		if(!order || order._id !== orderId ){
				dispatch(getOrderDetails(orderId))
			} 

		if(successApprove){
			dispatch({type: ORDER_FINANCEAPPROVE_RESET})
			navigate('/order/approved')
		}

		if(successReject){
			dispatch({type: ORDER_REJECT_RESET})
			navigate('/order/approved')
		}

		},[dispatch, order, orderId, userInfo, navigate, successApprove, successReject])

	const approveHandler = () => {
		console.log(remarks)
		dispatch(financeApproveOrder(orderId, remarks))
	}

	const rejectHandler = () => {
			console.log(order._id)
			dispatch(rejectOrder(order._id, remarks))
		}

	
	return(
		<>
			<Link to='/order/approved' className='btn btn-dark my-3'>Go Back</Link>
			<h3>Approved Order</h3>
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
										<th>Medicine</th>
										<th >Current Stock</th>
										<th >Quantity</th>
										<th >Low Stock</th>
										<th >Reorder Quantity</th>
										<th >MRP</th>
										<th >Purchase Price</th>
										<th >Total Price</th>
									</tr>
								</thead>
								<tbody>
									{order.orderItems.map(item => (
											<tr key={item._id} >
												<td>{count++}</td>
												<td>{item.name}</td>
												<td>{item.product.currentStock}</td>
												<td>{item.qty}</td>
												<td>{item.product.lowStockValue}</td>
												<td>{item.product.reOrderValue}</td>										
												<td>{item.product.mrp}</td>	
												<td>{item.product.purchasePrice}</td>									
												<td>{item.totalPrice}</td>
											</tr>
										)) }
								</tbody>
						</Table>
						<Row>
							<Col md={8}>
									

							{
								!(order.isFinanceApproved === true || order.isFinanceApproved === false)  ? (
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
								order.financeApprovalDetails.map(app => (
									<>
										<FloatingLabel controlId="floatingTextarea2" label="Remarks/Notes" className='my-3'>
										    <Form.Control
										      as="textarea"
										      placeholder="Leave a comment here"
										      style={{ height: '100px' }}
										      value={app.remarks}
										      disabled={ order.isFinanceApproved === true || order.isFinanceApproved === false }
										    />
										</FloatingLabel>
									</>
									))
							}
								
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
			{
				order.isFinanceApproved === true || order.isFinanceApproved === false ? ('') : (
				<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
				{/*<LinkContainer to={`/order/approved`}>*/}
					<Button variant='outline-dark' className='btn mx-1'
						onClick={rejectHandler} 
						>
						Reject
					</Button>
				{/*</LinkContainer>*/}
				{/*<LinkContainer to={`/order/approved/finance`}>*/}
					<Button variant='outline-success' className='btn mx-1' 
							onClick={approveHandler}
						>
						Approve
					</Button>
				{/*</LinkContainer>*/}
				</div>
				)
			}
		</>
		)
}


export default VerifyApprovedOrderScreen