import React, { useState, useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Nav,Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Card,ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getSaleDetails, deliverSale, sendBackSale  } from '../actions/saleActions'
import { SALE_DELIVER_RESET, SALE_SB_RESET } from '../constants/saleConstants'


const DeliverScreen = () => {
	let count=1;
	const dispatch = useDispatch()

	const { id } = useParams()
	const saleId = id
	console.log(saleId)
	let navigate = useNavigate()

	
	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const saleDetails = useSelector( state => state.saleDetails )
	const { loading, error, sale } = saleDetails

	const saleDeliver = useSelector(state => state.saleDeliver)
	const { loading: deliverLoading, error: deliverError, success:deliverSuccess } = saleDeliver

	const sendBack = useSelector(state => state.sendBack)
	const { loading: sbLoading, error: sbError, success:sbSuccess } = sendBack

	useEffect(() => {

		if(!userInfo || !(userInfo.role === '11') ){
			navigate('/')
		}
		
		if(!sale || sale._id !== saleId ){
				console.log('dispatch')
				dispatch(getSaleDetails(saleId))
			}

		if(deliverSuccess){
			dispatch({type: SALE_DELIVER_RESET})

			navigate('/sale/collected')
		}

		if(sbSuccess){
			dispatch({type: SALE_SB_RESET})

			navigate('/sale/collected')
		}

		
	},[dispatch, sale, saleId, navigate, userInfo, deliverSuccess, sbSuccess])

	const backHandler = () => {
		dispatch(sendBackSale(saleId))
	}


	const submitHandler = () => {		
		dispatch(deliverSale(saleId))
	}


	return(
		<>
			
			{deliverLoading && <Loader />}
			{deliverError && <Message variant='danger'>{deliverError}</Message>}
			{sbLoading && <Loader />}
			{sbError && <Message variant='danger'>{sbError}</Message>}
			
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
							  		<Link to='/sale/billed'>
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
								<th> </th>
								<th>Sl</th>
								<th>Medicine</th>
								<th>Type</th>
								<th>Dosage</th>
								<th>Route</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{	sale.saleItems.map((items) => (
										<tr key={items.productId._id}>
											<td><Form.Check aria-label="option 1" /></td>
											<td>{count++}</td>
											<td>{items.name}</td>
											<td>{items.productId.type}</td>
											<td>{items.productId.dose}</td>
											<td>{items.productId.route}</td>
											<td>{items.qty}</td>
										</tr>
								))

								}
						</tbody>						
				</Table>
				{
					(sale.isCollected === true && sale.isDelivered === false || sale.isDelivered === false) && (
						<div className='fixedBottomButton'>
								<Button variant='outline-dark' className='btn mx-1'
									onClick={backHandler} 
									>
									Send Back
								</Button>
							
								<Button variant='outline-success' className='btn mx-1'
									onClick={submitHandler} 
									>
									Deliver Now
								</Button>
							
						</div>
						
					)
				}
				</>
			)}
		</>
		)
}


export default DeliverScreen