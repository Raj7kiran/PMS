import React, { useState, useEffect } from 'react'
import { Table, Button, Form, FloatingLabel, Modal } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import SaleSteps from '../components/SaleSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listSubmittedSales  } from '../actions/saleActions'
// import { SALE_DELETE_RESET } from '../constants/orderConstants'


const SalesOrderListScreen = () => {
	let count=1;
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const userDetails = useSelector((state) => state.userDetails)
	const { user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const saleSubmittedList = useSelector((state) => state.saleSubmittedList)
	const { loading: loadingSales , error: errorSales, sales } = saleSubmittedList

	useEffect(()=> {
		if(!userInfo || !(userInfo.role === '9')){
			navigate('/')
		} 
			
		dispatch(listSubmittedSales())
		
	}, [dispatch, navigate, userInfo])


	return (
		<>
		<SaleSteps />
		{ loadingSales ? <Loader />
			: errorSales ? <Message variant='danger'>{errorSales}</Message>
			: (
				<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>S.No</th>
								<th >Patient Name</th>
								<th >Sale ID</th>
								<th >Age</th>
								<th >Gender</th>
								<th >Doctor</th>
								<th >Status</th>
								<th >Action</th>
							</tr>
						</thead>
						<tbody>
							{sales.map(sale => (
									<tr key={sale._id} >
										<td>{count++}</td>
										<td>{`${sale.title}${sale.name}`}</td>
										<td>{sale._id}</td>
										<td>{sale.age}</td>
										<td>{sale.gender}</td>
										<td>{sale.doctorID.firstName}</td>
										<td>{
											 (sale.isBilled === true ) ? <Button variant='success' className='btn-sm' disabled>Forwarded</Button>
											 : (sale.isSentBack === true ) ? <Button variant='secondary' className='btn-sm' disabled>Sent Back</Button>
											 : (sale.isRejected === true ) ? <Button variant='dark' className='btn-sm' disabled>Rejected</Button>
											 : (<Button variant='warning' className='btn-sm' disabled>Pending</Button>)
											}
										</td>
										<td>
											<LinkContainer to={`/sale/${sale._id}/biller`}>
												<Button variant='info' className='btn-sm mx-1'
												>
													<i className='far fa-eye'></i>
												</Button>
											</LinkContainer>
										</td>
									</tr>
								)) }
						</tbody>
				</Table>
			)
			}
		</>
		)
}


export default SalesOrderListScreen