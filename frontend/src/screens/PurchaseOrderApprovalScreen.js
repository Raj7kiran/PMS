import React, { useState, useEffect } from 'react'
import { Nav,Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Card } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import orders from '../data/orders'


const PurchaseOrderApprovalScreen = () => {
	let count=1
	const { id } = useParams()
	const orderId = id
	console.log(orderId)
	console.log(orders)


	const order = orders.filter((order) => 
				order._id.toLowerCase().indexOf(orderId.toLowerCase()) > -1)
	console.log(order)
	


	return(
		<>
			<Link to='/orderlist' className='btn btn-dark my-3'>Go Back</Link>
			<h3>Verify Purchase Order</h3>
			
			<Row>
				<Col md={5}>
					<Card>
					  	<Card.Body>Purchase Request No. <b>{order[0]._id}</b></Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card>
					  	<Card.Body>Requested Date: <b>{order[0].createdAt.substring(0,10)}</b></Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card>
					  	<Card.Body>Requested By: <b>{order[0].user.firstName}</b></Card.Body>
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
							{order[0].orderItems.map(item => (
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
					<b style={{ display: 'flex', justifyContent: 'flex-end' }}>Total Price: Rs.{order[0].orderItems.reduce((acc, item) => acc + item.totalPrice, 0)}</b>
				<hr />
				<br/>
				<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<LinkContainer to={`/orderstatus`}>
					<Button variant='outline-dark' className='btn mx-1' 
						>
						Reject
					</Button>
				</LinkContainer>
				<LinkContainer to={`/order/approved`}>
					<Button variant='outline-success' className='btn mx-1' 
						>
						Approve
					</Button>
				</LinkContainer>
				</div>
		</>
		)
}


export default PurchaseOrderApprovalScreen