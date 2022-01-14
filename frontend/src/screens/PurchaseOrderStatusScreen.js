import React, { useState, useEffect } from 'react'
import { Nav,Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Modal } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyOrders, deleteOrder,getOrderDetails } from '../actions/orderActions'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'
// import OrderDetailsScreen2 from '../screens/OrderDetailsScreen2'

const PurchaseOrderStatusScreen = ({history}) => {
	let count=1;
	const dispatch = useDispatch()
	const [lgShow, setLgShow] = useState(false);

	const userDetails = useSelector((state) => state.userDetails)
	const { user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading: loadingOrders , error: errorOrders, orders } = orderListMy

	const orderDetails = useSelector( state => state.orderDetails )
	const { loading, error, odDetails } = orderDetails

	const orderDelete = useSelector( state => state.orderDelete )
	const { loading: loadingDelete, success: successDelete, error:errorDelete } = orderDelete

	useEffect(()=> {
		if(!userInfo){
			history.push('/login')
		} 
			
		dispatch(listMyOrders())

		
	}, [dispatch, history, userInfo, successDelete])

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

	console.log(odDetails)
	return(
		<>
			<Nav className='my-3' variant="tabs" >
			  	<LinkContainer to='/order' >
					<Nav.Link>Purchase Order</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/orderstatus'>
					<Nav.Link>Purchase Order Status</Nav.Link>
				</LinkContainer>
			</Nav>
			{ loadingOrders ? <Loader />
			: errorOrders ? <Message variant='danger'>{errorOrders}</Message>
			: (
				<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th><span className='btn'>S.No</span></th>
								<th ><span className='btn'>PR.No</span></th>
								<th ><span className='btn'>Requested By</span></th>
								<th ><span className='btn'>Contact No</span></th>
								<th ><span className='btn'>Total Price</span></th>
								<th ><span className='btn'>Status</span></th>
								<th ><span className='btn'>Action</span></th>
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
										<td>{order.isApproved}</td>
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