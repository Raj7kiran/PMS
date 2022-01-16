import React, { useState, useEffect } from 'react'
import { Nav,Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Card, ListGroup } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import orders from '../data/orders'


const VerifyFinanceApprovedOrderScreen = () => {
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
			<Link to='/order/approved/finance' className='btn btn-dark my-3'>Go Back</Link>
			<h3>Finance Approved Order</h3>
			
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
								<th>Manufacturer</th>
								<th>Medicine</th>
								<th >Quantity</th>
								<th >MRP</th>
								<th >Purchase Price</th>
								<th >Tax %</th>
								<th >Discount</th>
								<th >Stock Discount</th>
								<th >Total Price</th>
							</tr>
						</thead>
						<tbody>
							{order[0].orderItems.map(item => (
									<tr key={item._id} >
										<td>{count++}</td>
										<td>Manufacturer Name</td>
										<td>{item.name}</td>
										<td>{item.qty}</td>
										<td>{item.product.mrp}</td>
										<td>{item.product.tax}</td>
										<td>{item.product.purchasePrice}</td>										
										<td>
											<tr>
												<td>
													<Card><Card.Footer>5</ Card.Footer></Card>
												</td>
												<td>
													<Card><Card.Footer>{Number(item.product.purchasePrice*0.05).toFixed(2)}</Card.Footer></Card>
												</td>
											</tr>
										</td>	
										<td>
											<tr>
												<td>
													<Card><Card.Footer>5</ Card.Footer></Card>
												</td>
												<td>
													<Card><Card.Footer>{Number(item.product.purchasePrice*0.05).toFixed(2)}</Card.Footer></Card>
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
									{order[0].orderItems.map(item => (
											<tr key={item._id} >
												<td>{count++}</td>
												<td>5</td>
												<td>{Number(item.product.purchasePrice*0.05).toFixed(2)}</td>
												<td>5</td>
												<td>{Number(item.product.purchasePrice*0.05*0.05).toFixed(2)}</td>
												<td>5</td>
												<td>{Number(item.product.purchasePrice*0.05*0.05).toFixed(2)}</td>										
												<td>{(Number(item.product.purchasePrice*0.05).toFixed(2)) + Number(item.product.purchasePrice*0.05*0.05).toFixed(2) + Number(item.product.purchasePrice*0.05*0.05).toFixed(2)}</td>										
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

				<Row className='align-items-center'>
					<Col md={8}>
						<FloatingLabel controlId="floatingTextarea2" label="Remarks/Notes">
						    <Form.Control
						      as="textarea"
						      placeholder="Leave a comment here"
						      style={{ height: '100px' }}
						    />
						</FloatingLabel>
					</Col>
					<Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<LinkContainer to={`/order/approved/finance`}>
							<Button className='' variant='outline-dark' className='btn mx-1' 
								>
								Reject
							</Button>
						</LinkContainer>
						<LinkContainer to={`/orderlist`}>
							<Button variant='outline-success' className='btn mx-1' 
								>
								Approve
							</Button>
						</LinkContainer>
					</Col>
				</Row>

				
		</>
		)
}


export default VerifyFinanceApprovedOrderScreen