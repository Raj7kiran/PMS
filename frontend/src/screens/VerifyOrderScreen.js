import React, { useEffect } from 'react'
import { Table, Row, Col, Button, Card, ListGroup } from 'react-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, approveOrder, rejectOrder } from '../actions/orderActions'
import { ORDER_APPROVE_RESET, ORDER_REJECT_RESET }  from '../constants/orderConstants'


const VerifyOrderScreen = () => {
	let count=1
	const { id } = useParams()
	const orderId = id
	const dispatch = useDispatch()
	let navigate = useNavigate()
	
	const orderDetails = useSelector(state => state.orderDetails)
	const { order ,loading, error } = orderDetails

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const orderApprove = useSelector(state => state.orderApprove)
	const { loading: loadingApprove, success: successApprove, error: errorApprove } = orderApprove

	const orderReject = useSelector(state => state.orderReject)
	const { loading: loadingReject, success: successReject, error: errorReject } = orderReject

	useEffect(() => {

		if(!userInfo || !(userInfo.role === '2' || userInfo.role === '3')){
			navigate('/')
		}
		dispatch({type: ORDER_REJECT_RESET})
		dispatch({type: ORDER_APPROVE_RESET})

		if(!order || order._id !== orderId ){
				dispatch(getOrderDetails(orderId))
			} 

		if(successApprove){
			dispatch({type: ORDER_APPROVE_RESET})
			navigate('/order/list')
		}

		if(successReject){
			dispatch({type: ORDER_REJECT_RESET})
			navigate('/order/list')
		}		

		},[dispatch, order, orderId, userInfo, navigate, successApprove, successReject])

	const approveHandler = () => {
		console.log(order._id)
		dispatch(approveOrder(order._id))
	}

	const rejectHandler = () => {
		console.log(order._id)
		dispatch(rejectOrder(order._id))
	}


	return(
		<>
			<Link to='/order/list' className='btn btn-dark my-3'>Go Back</Link>
			<h3>Verify Purchase Order</h3>
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
									<th >Medicine</th>
									<th >C.Stock</th>
									<th >Quantity</th>
									<th >Low Stock</th>
									<th >Reorder Quantity</th>
									<th >Price</th>
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
											<td>{item.totalPrice}</td>
										</tr>
									)) }
							</tbody>
					</Table>
					<hr />
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Total Price: <strong>Rs.{order.orderItems.reduce((acc, item) => acc + item.totalPrice, 0)}</strong></Col>
										
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
						</div>
					<hr />
					<br/>
				</>
			)
			}
			{
				order.isApproved === true || order.isFinanceApproved === false ? ('') : (
						<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
							{/*<LinkContainer to={`/order/list`}>*/}
								<Button variant='outline-dark' className='btn mx-1' 
										onClick={rejectHandler}
									>
									Reject
								</Button>
							{/*</LinkContainer>*/}
							
								<Button variant='outline-success' className='btn mx-1' 
										onClick={approveHandler}
									>
									Approve
								</Button>
							
						</div>
					)
			}
				
		</>
		)
}


export default VerifyOrderScreen