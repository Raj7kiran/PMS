import React, {useState, useEffect} from 'react'
import { Row, Col, Button, Table, Card, Form, FloatingLabel, ListGroup, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from  'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import InboundSteps from '../components/InboundSteps'
import { listOrders, getOrderDetails } from '../actions/orderActions'
import {listSupplier} from '../actions/otherActions'
import { createInbound } from '../actions/inboundActions'
import { INBOUND_CREATE_RESET } from '../constants/inboundConstants'



const InboundScreen = () => {
	let count=1
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [remarks, setRemarks] = useState('')
	const [vendor, setVendor] = useState('')
	const [purchaseOrder, setPurchaseOrder] = useState('')
	const [batchNo, setBatchNo] = useState('')
	const [expiry, setExpiry] = useState('')
	const [recQty, setRecQty] = useState('')
	const [freeQty, setFreeQty] = useState('')
	const [taxPer, setTaxPer] = useState('')
	const [inboundTotal, setInboundTotal] = useState('')
	const [gst, setGst] = useState('')

	const [singlePay, setSinglePay] = useState(false)
	const [multiplePay, setMultiplePay] = useState(false)
	const [cashPay, setCashPay] = useState(false)
	const [cardPay, setCardPay] = useState(false)
	const [chequePay, setChequePay] = useState(false)
	// const [cash2Pay, setCash2Pay] = useState(false)
	// const [card2Pay, setCard2Pay] = useState(false)
	// const [cheque2Pay, setCheque2Pay] = useState(false)
	const [paymentDetails, setPaymentDetails] = useState([])


	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const orderList = useSelector(state => state.orderList)
	const { loading, error, orders } = orderList

	const orderDetails = useSelector(state => state.orderDetails)
	const { loading: orderLoading, error: orderError, order } = orderDetails

	const supplierList = useSelector(state => state.supplierList)
	const { loading: supplierLoading , error: supplierError, suppliers } = supplierList

	const inboundCreate = useSelector(state => state.inboundCreate)
	const { loading: createLoading, error: createError, success:createSuccess } = inboundCreate

	const [tableData, setTableData] = useState([])

	useEffect(() => {
		setTableData(order)
	},[order])

	useEffect(() => {
		if(!userInfo){
			navigate('/')
		}

		setTableData('')

		if(createSuccess){
			dispatch({type: INBOUND_CREATE_RESET})
			setVendor('')
			setPurchaseOrder('')
			setTableData('')						
			navigate('/inbound/status')
		}

		dispatch(listOrders())
		dispatch(listSupplier())

	},[userInfo, dispatch, navigate, createSuccess])

	const getDetails = (orderId) => {
		console.log(orderId)
		dispatch(getOrderDetails(orderId))
	}

	const changeBatchNo = (batch, itemid) => {
		// console.log(batch, itemid)
		const newArr = tableData.orderItems.map(item => {
			if(item._id == itemid){
				item.batchNo = batch
				console.log('inside')
			}
			return item
		})
		console.log(tableData)
	}

	const changeExpDate = (expDate, itemid) => {
		// console.log(batch, itemid)
		const newArr = tableData.orderItems.map(item => {
			if(item._id == itemid){
				item.expDate = expDate
				console.log('inside')
			}
			return item
		})
		console.log(tableData)
	}

	const changeRecQty = (recQty, itemid) => {
		// console.log(batch, itemid)
		const newArr = tableData.orderItems.map(item => {
			if(item._id == itemid){
				item.recQty = recQty
				console.log('inside')
			}
			return item
		})
		console.log(newArr)
	}

	const changeFreeQty = (freeQty, itemid) => {
		// console.log(batch, itemid)
		const newArr = tableData.orderItems.map(item => {
			if(item._id == itemid){
				item.freeQty = freeQty
				console.log('inside')
			}
			return item
		})
		console.log(newArr)
	}

	const changeTaxPer = (taxPer, itemid) => {
		// console.log(batch, itemid)
		const newArr = tableData.orderItems.map(item => {
			if(item._id == itemid){
				item.taxPer = Number(taxPer)
				item.inboundTotal = Number(item.totalPrice + item.totalPrice*(taxPer/100))
			}
			return item

		})
		
		// setTableData(newArr)
		console.log(newArr)
	}

	const submitHandler = () => {
		const items = tableData.orderItems.map(item => {
			const { batchNo, expDate, recQty, freeQty, taxPer, inboundTotal } = item
		})

		console.log(order, batchNo, expiry, remarks, vendor, purchaseOrder, recQty, freeQty, taxPer, inboundTotal, gst)
		dispatch(createInbound({order, batchNo, expiry, remarks, vendor, purchaseOrder, recQty, freeQty, taxPer, inboundTotal, gst}))
	}

	return (
		<>
			<InboundSteps />
			<Row className='mt-3'>
			{
				supplierLoading ? <Loader />
				: supplierError ? <Message variant='danger'>{supplierError}</Message>
				: (
					<Col md={5}>
						<Form.Group controlId='vendor' className="mb-3">
							<FloatingLabel controlId="floatingSelect" label="Vendor">
								<Form.Control as='select' 
									value={vendor} 
									onChange={(e) => setVendor(e.target.value)}
									required>
									<option value=''>Select Vendor</option>
									{
										suppliers.map(supplier => (
											<option key={supplier._id} value={supplier._id}>{supplier.supplierName}</option>
											))
									}
								</Form.Control>
							</FloatingLabel>
						</Form.Group>
					</Col>
					)
			}
				
				{
					loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
						<>
							<Col md={5}>
								<Form.Group controlId='order' className="mb-3">
									<FloatingLabel  controlId="floatingSelect" label="Order">
										<Form.Control className='order-dropdown' as='select' 
											value={purchaseOrder} 
											onChange={(e) => setPurchaseOrder(e.target.value)}
											required
											>
											<option value=''>Purchase Order</option>
											{
												orders.map(order => (
														<option key={order._id} value={order._id}>{order._id}</option>
													))
											}
										</Form.Control>
									</FloatingLabel>
								</Form.Group>
							</Col>
						</>
					)
				}
				<Col md={2}>
					<Button onClick={e => getDetails(purchaseOrder) } style={{width: '100%'}} className='btn btn-sm'>View</Button>
				</Col>
			</Row>
			

			{
				tableData._id && (
					<>
					<Row>
					<Col>
						<Card>
							<Card.Body>Invoice No. <b>{order._id}</b></Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>Invoice Date <b>{order.createdAt.substring(0,10)}</b></Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>Invoice Amount <b>{order.orderTotalPrice}</b></Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>Receive Date <b></b></Card.Body>
						</Card>
					</Col>
				</Row>
				<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
							<thead>
								<tr>
									<th>S.No</th>
									<th>Medicine</th>
									<th>Quantity</th>
									<th >MRP</th>
									<th >Purchase Price</th>
									<th >Discount</th>
									<th >Stock Discount</th>
									<th >PO total</th>
									<th >Batch No</th>
									<th >Expiry Date</th>
									<th >Rec. Quantity</th>
									<th >Rec Free Qty</th>
									<th >Tax %</th>
									<th >Inbound Total</th>
								</tr>
							</thead>
							<tbody>
									{
										tableData.orderItems.map(item => (
											<tr key={item._id}>
												<td>{count++}</td>
												<td>{item.name}</td>
												<td>{item.qty}</td>
												<td>{item.product.mrp}</td>
												<td>{item.product.purchasePrice}</td>
												<td>{item.product.discount}</td>
												<td>{item.product.stockDiscount}</td>
												<td>{item.totalPrice}</td>
												<td>
													<InputGroup size="sm" className="mb-3">
													    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
													    	type='number' 
													    	value={item.batchNo}
													    	onChange = {(e) => changeBatchNo(e.target.value, item._id)}
													    />
													 </InputGroup>
												</td>
												<td>
													<input 	type="date"  placeholder="dob"
															// value={expiry}
															onChange = {(e) => changeExpDate(e.target.value, item._id)}
															required 
														/>
												</td>
												<td>
													<InputGroup size="sm" className="mb-3">
													    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
													    	type='number' 
													    	// value={recQty}
													    	onChange = {(e) => changeRecQty(e.target.value, item._id)}
													    />
													 </InputGroup>
												</td>
												<td>
													<InputGroup size="sm" className="mb-3">
													    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
													    	type='number'
													    	// value={freeQty}
													    	onChange = {(e) => changeFreeQty(e.target.value, item._id)}
													    />
													 </InputGroup>
												</td>
												<td>
													<InputGroup size="sm" className="mb-3">
													    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
													    	type='number' 
													    	// value={taxPer}
													    	onChange = {(e) => changeTaxPer(e.target.value, item._id)}
													    />
													 </InputGroup>
												</td>
												<td>{item.inboundTotal}</td>
											</tr>
										))
									}
							</tbody>
					</Table>
					<Form.Check type='checkbox' label='Add tax Free Quantity' />
					<Row>
						<Col md={9}>
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
										{tableData.orderItems.map(item => (
												<tr key={item._id} >
													<td>{count++}</td>
													<td>10</td>
													<td>{Number(item.totalPrice*0.1).toFixed(2)}</td>
													<td>5</td>
													<td>{Number(item.totalPrice*0.05).toFixed(2)}</td>
													<td>5</td>
													<td>{Number(item.totalPrice*0.05).toFixed(2)}</td>										
													<td>{Number(item.totalPrice*0.1).toFixed(2)}</td>										
												</tr>
											)) }
									</tbody>
							</Table>
						</Col>
						<Col md={3}>
							<Card className='mt-3'>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Total Value</Col>
											<Col><strong>Rs. {order.totalPrice}</strong></Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Discount %</Col>
											<Col><strong>Rs. </strong></Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total with Discount</Col>
											<Col><strong>Rs. </strong></Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>GST</Col>
											<Col><strong>Rs </strong></Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col style={{color: 'red'}}><strong>Total Amount</strong></Col>
											<Col><strong>Rs.</strong></Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>

					

					<h3>Payment</h3>
					Payment:
							<>
						
									<div className="mb-3">
										<Form.Check inline label="Cash" onClick= {(e) => setCashPay(!cashPay)}/>
										<Form.Check inline label="Card" onClick= {(e) => setCardPay(!cardPay)} />
										<Form.Check  inline label="Cheque" onClick= {(e) => setChequePay(!chequePay)} />
									</div>
								    <div style={{width: '350px'}}>
									    {
									    	cashPay === true && (
									    		<>
									    			<p>Card Payment</p>
									    			<InputGroup className="mb-3">
			    										<FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
			  										</InputGroup>
									    		</>
									    		)
									    }
									    {
									    	cardPay === true && (
									    		<>
										    		<p>Card Payment</p>
										    		<InputGroup className="mb-3">
			    										<FormControl placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
			  										</InputGroup>
			  										<InputGroup className="mb-3">
			    										<FormControl type='number' placeholder="Card Number" aria-label="Card Number" aria-describedby="basic-addon1" />
			  										</InputGroup>
			  										<InputGroup className="mb-3">
			    										<FormControl type='number' placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon1" />
			  										</InputGroup>
										    	</>
									    		)
									    }
									    {
									    	chequePay === true && (
									    			<>
											    		<p>Cheque Payment</p>
											    		<InputGroup className="mb-3">
				    										<FormControl placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
				  										</InputGroup>
				  										<InputGroup className="mb-3">
				    										<FormControl type='number' placeholder="Cheque Number" aria-label="Cheque Number" aria-describedby="basic-addon1" />
				  										</InputGroup>
				  										<InputGroup className="mb-3">
				    										<FormControl type='number' placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon1" />
				  										</InputGroup>
											    	</>
									    		)
									    }
								    </div>
								</>
							

					<div>


					{/*{*/}
						{/*sale.isPaid === true ? (*/}
								{/*<Button variant='success' className='btn m-3' disabled >*/}
									{/*Payment Received*/}
								{/*</Button>*/}
							{/*) : (*/}
								{/*<Button variant='outline-success' className='btn m-3'*/}
									{/*onClick={paymentHandler} */}
									{/*>*/}
									{/*Complete Payment*/}
								{/*</Button>*/}
							{/*)*/}
					{/*}*/}
					</div>
					

					<Row>
						<Col md={9}>
							{
								!(order.isForwarded === true || order.isForwarded === false)  ? (
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
								order.map(app => (
									<>
										<FloatingLabel key={order._id} controlId="floatingTextarea2" label="Remarks/Notes" className='my-3'>
										    <Form.Control
										      as="textarea"
										      placeholder="Leave a comment here"
										      style={{ height: '100px' }}
										      value={app.remarks}
										      disabled={ order.isForwarded === true }
										    />
										</FloatingLabel>
									</>
									))
							}
						</Col>
						<Col md={3}>
						
						{/*{(order.isForwarded === true) && (*/}
							<>
									<Button variant='outline-dark' className='btn mx-1' disabled
										// onClick={backHandler} 
										>
										Send Back
									</Button>

									<Button variant='outline-dark' className='btn mx-1' disabled
										// onClick={rejectHandler} 
										>
										Reject
									</Button>

									<Button variant='outline-success' className='btn mx-1'
										onClick={submitHandler} 
										// disabled = { sale.isPaid === false }
										>
										Forward
									</Button>
								
							</>						
						)
					{/*}*/}
						</Col>
					</Row>
					</>
				)
			}
				
				
			
			
		</>
		)
}

export default InboundScreen
