import React, { useEffect } from 'react'
import { Table,  Button, } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useParams, useNavigate} from 'react-router-dom'
import OrderSteps from '../components/OrderSteps'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'



const FinanceApprovalOrderListScreen = () =>{
	let count=1
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const orderList = useSelector(state => state.orderList)
	const { loading, error, orders } = orderList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	useEffect(() => {
		if(!userInfo || !(userInfo.role === '5' || userInfo.role === '6')){
			navigate('/')
		} else {
			dispatch(listOrders())
		} 
			
	}, [dispatch, navigate, userInfo] )

	return(
		<>
			<OrderSteps />
			{ loading ? <Loader />
			: error ? <Message variant='danger'>{error}</Message>
			: (
			<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>S.No</th>
								<th>PR.No</th>
								<th>Requested Date</th>
								<th>Requested By</th>
								<th>Finance Approved By</th>
								<th>Finance Approved Date</th>
								<th>Total Price</th>
								<th>Finance Approval</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
									order.isFinanceApproved && (
									<tr key={order._id} >
										<td>{count++}</td>
										<td>{order._id}</td>
										<td>{order.createdAt.substring(0,10)}</td>
										<td>{order.user.firstName}</td>
										{
											order.financeApprovalDetails.map(app => (
												<>
													<td>{app.approverName}</td>
													<td>{app.approvedAt.substring(0,10)}</td>
												</>
												))
										}
										<td>{order.orderTotalPrice}</td>
										<td>
											{
												order.isFinalApproved === true ? <Button variant='success' className='btn-sm' disabled>Approved</Button>
												: order.isFinalApproved === false ? <Button variant='danger' className='btn-sm' disabled>Rejected</Button>
												: <Button variant='info' className='btn-sm' disabled>Pending</Button>

											}
										</td>
										<td>
											{/*<LinkContainer to={`/order/${order._id}`}>
												<Button variant='info' className='btn-sm mx-1'
													// onClick = {(e) => forModalLaunch(order._id)} 
												>
													<i className='far fa-eye'></i>
												</Button>
											</LinkContainer>*/}
											<LinkContainer to={`/order/approved/finance/${order._id}`}>
												<Button variant='light' className='btn-sm mx-1' 
													>
													Verify
												</Button>
											</LinkContainer>
											{/*<Button variant='dark' className='btn-sm mx-1' 
													onClick={()=> deleteHandler(order._id)}
											>
												<i className='fas fa-cut'></i>
											</Button>*/}
										</td>
									</tr>
									)
								)) }
						</tbody>
				</Table>
				)
			}
		</>

		)
}


export default FinanceApprovalOrderListScreen