import React, { useState, useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Card,ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import StripeCheckout from 'react-stripe-checkout'
import { getSaleDetails, paySale, billSale, rejectSale, sendBackSale, payCardSale  } from '../actions/saleActions'
import { SALE_BILL_RESET, SALE_SB_RESET, SALE_PAY_RESET, SALE_REJECT_RESET, SALE_CARD_PAY_RESET } from '../constants/saleConstants'


const BillerScreen = () => {
	let count=1;
	const dispatch = useDispatch()

	let amount = 1500
	let productNewName = 'new product name'

	const { id } = useParams()
	const saleId = id
	console.log(saleId)
	let navigate = useNavigate()

	const [remarks, setRemarks] = useState('')

	const [singlePay, setSinglePay] = useState(false)
	const [multiplePay, setMultiplePay] = useState(false)
	const [cashPay, setCashPay] = useState(false)
	const [cardPay, setCardPay] = useState(false)
	const [chequePay, setChequePay] = useState(false)
	const [cash2Pay, setCash2Pay] = useState(false)
	const [card2Pay, setCard2Pay] = useState(false)
	const [cheque2Pay, setCheque2Pay] = useState(false)

	
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const saleDetails = useSelector( state => state.saleDetails )
	const { loading, error, sale } = saleDetails

	const salePay = useSelector(state => state.salePay)
	const { loading: payLoading, error: payError, success:paySuccess } = salePay

	const saleCardPay = useSelector(state => state.saleCardPay)
	const { loading: payCardLoading, error: payCardError, success:payCardSuccess,  } = saleCardPay

	const saleBill = useSelector(state => state.saleBill)
	const { loading: billLoading, error: billError, success:billSuccess } = saleBill

	const saleReject = useSelector(state => state.saleReject)
	const { loading: rejectLoading, error: rejectError, success:rejectSuccess } = saleReject

	const sendBack = useSelector(state => state.sendBack)
	const { loading: sbLoading, error: sbError, success:sbSuccess } = sendBack

	useEffect(() => {
		dispatch({type: SALE_PAY_RESET})

		if(!userInfo || !(userInfo.role === '9') ){
			navigate('/')
		}
		
		if(!sale || sale._id !== saleId ){
				console.log('dispatch')
				dispatch(getSaleDetails(saleId))
			}

		if(billSuccess){
			dispatch({type: SALE_BILL_RESET})

			navigate('/sale/list')
		}

		if(rejectSuccess){
			dispatch({type: SALE_REJECT_RESET})

			navigate('/sale/list')
		}

		if(paySuccess){

			dispatch(getSaleDetails(saleId))
		}

		if(sbSuccess){
			dispatch({type: SALE_SB_RESET})

			navigate('/sale/list')
		}

		
	},[dispatch, sale, saleId, navigate, userInfo, billSuccess, paySuccess, rejectSuccess, sbSuccess, payCardSuccess])

	const backHandler = () => {
		dispatch(sendBackSale(saleId))
	}

	const paymentHandler = () => {
		dispatch(paySale(saleId))
	}

	const rejectHandler = () => {
		dispatch(rejectSale(saleId, remarks))
	}

	const submitHandler = () => {		
		dispatch(billSale(saleId, remarks))
	}

	const makePayment = token => {

		// console.log(token)
		// dispatch(payCardSale(token, amount))
		const body = {
			token,
			price: 300000
		}
		const headers = {
			'Content-Type': 'application/json'
		}

		return fetch(`/payment`,{
			method:'POST',
			headers,
			body: JSON.stringify(body)
		}).then(response => {
			console.log('RESPONSE', response)
			const {status} = response
			console.log(status)
		}).catch(err => console.log('ERROR', err))

	} 


	return(
		<>
			
			{billLoading && <Loader />}
			{billError && <Message variant='danger'>{billError}</Message>}
			{sbLoading && <Loader />}
			{sbError && <Message variant='danger'>{sbError}</Message>}
			{payLoading && <Loader />}
			{payError && <Message variant='danger'>{payError}</Message>}
			{payCardLoading && <Loader />}
			{payCardError && <Message variant='danger'>{payCardError}</Message>}
			{payCardSuccess && <Message variant='info'>Card Payment Received</Message>}
			{/*{paySuccess && <Message variant='info'>Payment Received</Message>}*/}
			
			{loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
						<>
						<ListGroup horizontal className="m-2 list-group-horizontal-md" >
							  <ListGroup.Item><b>{`${sale.title}${sale.name}`}</b></ListGroup.Item>
							  <ListGroup.Item><b>{sale._id}</b></ListGroup.Item>
							  <ListGroup.Item><b>{sale.age}</b></ListGroup.Item>
							  <ListGroup.Item><b>{sale.gender}</b></ListGroup.Item>
							  <ListGroup.Item><b>{sale.phoneNumber}</b></ListGroup.Item>
							  <ListGroup.Item><b>{sale.doctorID.firstName}</b></ListGroup.Item>
							  <ListGroup.Item><b>{sale.purpose}</b></ListGroup.Item>
							  <ListGroup.Item>
							  		<Button variant='outline-warning' className='btn-sm mx-1'
										onClick={() => window.print()} 
										>
										Print
									</Button>
							  		<Link to='/sale/list'>
							  			<Button variant='outline-dark' className='btn-sm mx-1'
										// onClick={submitHandler} 
										>
										Back
									</Button>
							  		</Link>
							  </ListGroup.Item>
						</ListGroup>
						<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>Sl</th>
								<th>Medicine</th>
								<th>Type</th>
								<th>Dosage</th>
								<th>Quantity</th>
								<th>Bin Location</th>
								<th>Bin Image</th>
								<th>MRP</th>
								<th>P.Puchase</th>
								<th>Discount %</th>
								<th>Tax %</th>
								<th>Total Price</th>
							</tr>
						</thead>
						<tbody>
							{	sale.saleItems.map((items) => (
										<tr key={items.productId._id}>
											<td>{count++}</td>
											<td>{items.name}</td>
											<td>{items.productId.type}</td>
											<td>{items.productId.dose}</td>
											<td>{items.qty}</td>
											<td>{items.productId.binLocation}</td>
											<td><Image src='' alt='Bin Location' fluid/></td>
											<td>{items.productId.mrp}</td>
											<td>{items.productId.purchasePrice}</td>
											<td>{items.productId.discount}</td>
											<td>{items.productId.tax}</td>
											<td>{items.totalPrice}</td>
										</tr>
								))

								}
						</tbody>						
				</Table>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Card className='mt-3 mx-3' >
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Sub Total</Col>
										<Col><strong>Rs. {sale.saleTotal}</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Adjustment Amount</Col>
										<Col>
											<InputGroup size="sm" className="mb-3">
												  <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
												  	type='number' 
												  	// value={row.quantity}
												  	// onChange = {(e) => changeQuantity(row.product.medicineName,e.target.value)}
												  />
											</InputGroup>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Rounded Off</Col>
										<Col><strong>Rs. 0.0</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Grand Total</Col>
										<Col><strong>Rs. {sale.saleTotal}</strong></Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</div>
				<h3>Payment</h3>
				Payment:
				<>
					<Form.Check className='mx-2' inline label="Single" onClick= {(e) => setSinglePay(true)}/>
					<Form.Check className='mx-2' inline label="Multiple" onClick= {(e) => setMultiplePay(!multiplePay)} />
				</> 
					{
						singlePay === true && (
							<>
								<div className="mb-3">
									<Form.Check inline label="Single" onClick= {(e) => setCashPay(!cashPay)}/>
									<Form.Check inline label="Card" onClick= {(e) => setCardPay(!cardPay)} />
									<Form.Check  inline label="Cheque" onClick= {(e) => setChequePay(!chequePay)} />
								</div>
							    <div>
								    {
								    	cashPay === true && <p>Cash Payment</p>
								    }
								    {
								    	cardPay === true && (
								    		<>
									    		<p>Card Payment</p>
									    		<StripeCheckout stripeKey='pk_test_51KOO5eSHdf7SFUGJX031M3Sakq9LTGkQcG2W0veJY079t4XSJnJvWACemGE34LCmqwiS53V7cio6IJluIC5xxf2D00jZYN8v24' token={makePayment} 
									    		amount={amount} name='Pay from Card'><Button variant='warning' className='btn-small m-3'>Pay</Button></StripeCheckout>
								    		</>
								    		)
								    }
								    {
								    	chequePay === true && <p>Cheque Payment</p>
								    }
							    </div>
							</>
						)
					}
					{
						multiplePay === true && (
							<>
								<div className="mb-3">
									<Form.Check inline label="Single" onClick= {(e) => setCash2Pay(!cash2Pay)}/>
									<Form.Check inline label="Card" onClick= {(e) => setCard2Pay(!card2Pay)} />
									<Form.Check  inline label="Cheque" onClick= {(e) => setCheque2Pay(!cheque2Pay)} />
								</div>
							    <div>
								    {
								    	cash2Pay === true && <p>Cash Payment</p>
								    }
								    {
								    	card2Pay === true && (
								    		<>
									    		<p>Card Payment</p>
									    		<StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} price={sale.saleTotal} name='Pay from Card'><Button variant='warning' className='btn-small m-3'>Pay</Button></StripeCheckout>
								    		</>
								    		)
								    }
								    {
								    	cheque2Pay === true && <p>Cheque Payment</p>
								    }
							    </div>
							</>
						)
					}


				<div>


				{
					sale.isPaid === true ? (
							<Button variant='success' className='btn m-3' disabled >
								Payment Received
							</Button>
						) : (
							<Button variant='outline-success' className='btn m-3'
								onClick={paymentHandler} 
								>
								Complete Payment
							</Button>
						)
				}
				</div>
				

				<Row>
					<Col md={9}>
						<FloatingLabel controlId="floatingTextarea2" label="Remarks/Notes" className='my-3'>
								<Form.Control
								  as="textarea"
								  placeholder="Leave a comment here"
								  style={{ height: '100px' }}
								  value={remarks}
								  onChange={(e) => setRemarks(e.target.value)}
								/>
						</FloatingLabel>
						{
							sale.isSubmitted === true && (
								<p>{sale.submitDetails.remarks}</p>
								)
						}
					</Col>
					<Col md={3}>
						{
					((sale.isSubmitted === true && sale.isBilled === false) || (sale.isSubmitted === false)) && (
						<>
								<Button variant='outline-dark' className='btn mx-1'
									onClick={backHandler} 
									>
									Send Back
								</Button>

								<Button variant='outline-dark' className='btn mx-1'
									onClick={rejectHandler} 
									>
									Reject
								</Button>

								<Button variant='outline-success' className='btn mx-1'
									onClick={submitHandler} 
									disabled = { sale.isPaid === false }
									>
									Forward
								</Button>
							
						</>						
					)
				}
					</Col>
				</Row>


				
				</>
			)}
		</>
		)
}


export default BillerScreen