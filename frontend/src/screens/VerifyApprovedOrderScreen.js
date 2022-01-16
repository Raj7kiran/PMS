import React, { useState, useEffect } from 'react'
import { Nav,Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Card, ListGroup } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import orders from '../data/orders'


const VerifyApprovedOrderScreen = () => {
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
			<Link to='/order/approved' className='btn btn-dark my-3'>Go Back</Link>
			<h3>Approved Order</h3>
			
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
							{order[0].orderItems.map(item => (
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
						<FloatingLabel controlId="floatingTextarea2" label="Remarks/Notes">
						    <Form.Control
						      as="textarea"
						      placeholder="Leave a comment here"
						      style={{ height: '100px' }}
						    />
						</FloatingLabel>
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Total Value</Col>
										<Col><strong>Rs.{order[0].itemTotalPrice}</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>GST</Col>
										<Col><strong>Rs.{order[0].totalTax}</strong></Col>
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
										<Col><strong>Rs.{order[0].orderTotalPrice}</strong></Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
				<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<LinkContainer to={`/order/approved`}>
					<Button variant='outline-dark' className='btn mx-1' 
						>
						Reject
					</Button>
				</LinkContainer>
				<LinkContainer to={`/order/approved/finance`}>
					<Button variant='outline-success' className='btn mx-1' 
						>
						Approve
					</Button>
				</LinkContainer>
				</div>
		</>
		)
}


export default VerifyApprovedOrderScreen