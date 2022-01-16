import React, { useState, useEffect } from 'react'
import { Nav,Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Card } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import orders from '../data/orders'



const FinanceApprovalOrderListScreen = () =>{
	let count=1
	return(
		<>
			<Nav className='my-3' variant="tabs" >
			  	<LinkContainer to='/order' >
					<Nav.Link>Purchase Order</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/orderlist' >
						<Nav.Link>Purchase Order List</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/order/approved'>
					<Nav.Link>Approved Order List</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/order/approved/finance'>
					<Nav.Link>Finance Approval Order list</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/orderstatus'>
					<Nav.Link>Purchase Order Status</Nav.Link>
				</LinkContainer>
			</Nav>

			<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>S.No</th>
								<th >PR.No</th>
								<th >Requested Date</th>
								<th >Requested By</th>
								<th >Total Price</th>
								<th >Status</th>
								<th >Action</th>
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
		</>

		)
}


export default FinanceApprovalOrderListScreen