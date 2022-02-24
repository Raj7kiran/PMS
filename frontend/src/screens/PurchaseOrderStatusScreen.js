import React, { useState, useEffect } from 'react'
import { Table, Button, } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import OrderSteps from '../components/OrderSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyOrders, deleteOrder } from '../actions/orderActions'
// import { ORDER_DELETE_RESET } from '../constants/orderConstants'
// import OrderDetailsScreen2 from '../screens/OrderDetailsScreen2'

const PurchaseOrderStatusScreen = () => {
	let count=1;
	const dispatch = useDispatch()
	// const [lgShow, setLgShow] = useState(false);
	let navigate = useNavigate()

	
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading: loadingOrders , error: errorOrders, orders } = orderListMy
	
	const orderDelete = useSelector( state => state.orderDelete )
	const { loading: loadingDelete, success: successDelete, error:errorDelete } = orderDelete

	useEffect(()=> {
		if(!userInfo || !(userInfo.role === '1' || userInfo.role === '3') ){
			navigate('/')
		} 
			
		dispatch(listMyOrders())

		
	}, [dispatch, navigate, userInfo, successDelete])

	const deleteHandler = (id) => {
		if(window.confirm('Are you sure you want to delete?')){
			dispatch(deleteOrder(id))
		}
	}

	// const forModalLaunch = (orderId) =>{
	// 	// setLgShow(true)
	// 	console.log(orderId)
	// 	dispatch(getOrderDetails(orderId))
	// }

	// console.log(odDetails)
	return(
		<>
			<OrderSteps />
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{ loadingOrders ? <Loader />
			: errorOrders ? <Message variant='danger'>{errorOrders}</Message>
			: (
				<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>S.No</th>
								<th >PR.No</th>
								<th >Requested By</th>
								<th >Contact No</th>
								<th >Total Price</th>
								<th >Status</th>
								<th >Action</th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
									<tr key={order._id} >
										<td>{count++}</td>
										<td>{order._id}</td>
										<td>{order.user.firstName}</td>
										<td>{order.user.phone}</td>
										<td>{order.orderTotalPrice}</td>
										<td>
											{
												order.isFinalApproved === true ? <Button variant='sucess' className='btn-sm' disabled>Approved</Button>
												: order.isFinalApproved === false ? <Button variant='danger' className='btn-sm' disabled>Rejected</Button>
												: <Button variant='info' className='btn-sm' disabled>Pending</Button>

											}
										</td>
										<td>
											<LinkContainer to={`/order/${order._id}`}>
												<Button variant='info' className='btn-sm mx-1'
													// onClick = {(e) => forModalLaunch(order._id)} 
												>
													<i className='far fa-eye'></i>
												</Button>
											</LinkContainer>
											<LinkContainer to={`/order/${order._id}/edit`}>
												<Button variant='light' className='btn-sm mx-1' 
													>
													<i className='far fa-edit'></i>
												</Button>
											</LinkContainer>
											<Button variant='dark' className='btn-sm mx-1' 
													onClick={()=> deleteHandler(order._id)}
											>
												<i className='fas fa-cut'></i>
											</Button>
										</td>
									</tr>
								)) }
						</tbody>
				</Table>
			)
			}
			{/*<Modal
		        size="lg"
		        show={lgShow}
		        onHide={() => setLgShow(false)}
		        aria-labelledby="example-modal-sizes-title-lg"
		      >
		        <Modal.Header closeButton>
		          <Modal.Title id="example-modal-sizes-title-lg">
		             	<OrderDetailsScreen2 odDetails={odDetails} />
		          </Modal.Title>
		        </Modal.Header>
		        <Modal.Body>...</Modal.Body>
		      </Modal>*/}
		</>
		)
}



export default PurchaseOrderStatusScreen