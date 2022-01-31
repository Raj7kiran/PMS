import React, { useState, useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Table, Row, Col, Button, Form, FloatingLabel, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getSaleDetails, submitSale } from '../actions/saleActions'
import { SALE_SUBMIT_RESET } from '../constants/saleConstants'


const SaleDetailsScreen = () => {
	let count=1;
	const dispatch = useDispatch()

	const { id } = useParams()
	const saleId = id
	console.log(saleId)
	let navigate = useNavigate()

	const [ remarks, setRemarks ] = useState('')

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const saleDetails = useSelector( state => state.saleDetails )
	const { loading, error, sale } = saleDetails

	const saleSubmit = useSelector(state => state.saleSubmit)
	const { loading: submitLoading, error: submitError, success:submitSuccess } = saleSubmit

	useEffect(() => {

		if(!userInfo || !(userInfo.role === '7' || userInfo.role === '9') ){
			navigate('/')
		}
		
		if(!sale || sale._id !== saleId ){
				console.log('dispatch')
				dispatch(getSaleDetails(saleId))
			}
		if(submitSuccess){
			dispatch({type: SALE_SUBMIT_RESET})

			navigate('/mysales')
		}

		
	},[dispatch, sale, saleId, navigate, userInfo, submitSuccess])


	const submitHandler = () => {
		console.log(remarks)
		dispatch(submitSale(saleId, remarks))
	}


	return(
		<>
			
			{submitLoading && <Loader />}
			{submitError && <Message variant='danger'>{submitError}</Message>}
			{submitSuccess && <Message variant='info'>Submitted Successfully</Message>}
			
			{loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
						<>
						<ListGroup horizontal className="my-2">
							  <ListGroup.Item>{`${sale.title}${sale.name}`}</ListGroup.Item>
							  <ListGroup.Item>{sale._id}</ListGroup.Item>
							  <ListGroup.Item>{sale.age}</ListGroup.Item>
							  <ListGroup.Item>{sale.gender}</ListGroup.Item>
							  <ListGroup.Item>{sale.phoneNumber}</ListGroup.Item>
							  <ListGroup.Item><b>{sale.doctorID.firstName}</b></ListGroup.Item>
							  <ListGroup.Item>
							  		<Button variant='outline-warning' className='btn-sm mx-1'
										onClick={() => window.print()} 
										>
										Print
									</Button>
							  		<Link to='/mysales'>
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
								<th >Sl</th>
								<th >Medicine</th>
								<th >Quantity</th>
								<th >Type</th>
								<th >Dosage</th>
								<th >Route</th>
								<th>Timing</th>
								<th>Timing Pref.</th>
								<th>Frequency</th>
								<th>MRP</th>
								<th>Tax</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{	sale.saleItems.map((items) => (
										<tr key={items.productId._id}>
											<td>{count++}</td>
											<td>{items.name}</td>
											<td>{items.qty}
												{/*<InputGroup size="sm" className="mb-3">
												    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
												    	type='number' 
												    	value={row.quantity}
												    	onChange = {(e) => changeQuantity(row.product.medicineName,e.target.value)}
												    />
												 </InputGroup>*/}
											</td>
											<td>{items.productId.type}</td>
											<td>{items.productId.dose}</td>
											<td>{items.productId.route}</td>
											<td>{items.productId.timing}</td>
											<td>{items.productId.preference}</td>
											<td>{items.frequency}
												{/*<Form.Group controlId='Frequency' className="mb-3">
														<FloatingLabel controlId="floatingSelect" label="Frequence">
															<Form.Control as='select' 
																value={frequency} 
																onChange={(e) => setFrequency(e.target.value)}
																required>
																<option value=''>Select</option>
																<option value='Daily'>Daily</option>
																<option value='Alt. Days'>Alt. Days</option>
																<option value='Weekly'>Weekly</option>
																<option value='Monthly'>Monthly</option>
															</Form.Control>
														</FloatingLabel>
												</Form.Group>*/}
											</td>
											<td>{items.productId.mrp}</td>
											<td>{items.productId.tax}</td>
											<td>{items.totalPrice}</td>
										</tr>
								))

								}
						</tbody>						
				</Table>
				{
					((sale.isSaved === true && sale.isSubmitted === false) || (sale.isSubmitted === false)) && (
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
							</Col>
							<Col md={3}>
								<Button variant='outline-dark' className='btn mx-1'
									onClick={submitHandler} 
									>
									Submit
								</Button>
							</Col>
						</Row>
						
					)
				}
				</>
			)}
		</>
		)
}


export default SaleDetailsScreen