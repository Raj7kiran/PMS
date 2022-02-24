import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import OrderSteps from '../components/OrderSteps'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'



const SalesReturnScreen = () => {
	let count=1
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const orderList = useSelector(state => state.orderList)
	const { loading, error, orders } = orderList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	useEffect(() => {
		if(!userInfo){
			navigate('/')
		} else {
			dispatch(listOrders())
		}
				
	}, [dispatch, navigate, userInfo] )


	return(
		<>
			<h3>Return Screen</h3>
			{ loading ? <Loader />
			: error ? <Message variant='danger'>{error}</Message>
			: (
			<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>S.No</th>
								<th >PR.No</th>
								<th >Created Date</th>
								<th >Name</th>
								<th >Age</th>
								<th >Gender</th>
								<th >Mobile</th>
								<th >Quantity</th>
								<th >Amount</th>
								<th >Action</th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
									<tr key={order._id} >
										<td>{count++}</td>
										<td>{order._id}</td>
										<td>{order.createdAt.substring(0,10)}</td>
										
										<td>
											{/*<LinkContainer to={`/order/${order._id}`}>
												<Button variant='info' className='btn-sm mx-1'
													// onClick = {(e) => forModalLaunch(order._id)} 
												>
													<i className='far fa-eye'></i>
												</Button>
											</LinkContainer>*/}
											<LinkContainer to={`/order/${order._id}/approve`}>
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
								)) }
						</tbody>
				</Table>
				)
			}
		</>
		)
}



export default SalesReturnScreen