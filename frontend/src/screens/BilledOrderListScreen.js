import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import SaleSteps from '../components/SaleSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBilledSales  } from '../actions/saleActions'
// import { SALE_DELETE_RESET } from '../constants/orderConstants'


const BilledOrderListScreen = () => {
	let count=1;
	const dispatch = useDispatch()
	let navigate = useNavigate()

	// const userDetails = useSelector((state) => state.userDetails)
	// const { user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const saleBilledList = useSelector((state) => state.saleBilledList)
	const { loading: loadingSales , error: errorSales, sales } = saleBilledList

	useEffect(()=> {
		if(!userInfo || !(userInfo.role === '10')){
			navigate('/')
		} 
			
		dispatch(listBilledSales())
		
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
								<th >Patient Phone</th>
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
										<td>{sale.phoneNumber}</td>
										<td>{sale.doctorID.firstName}</td>
										<td>{
											 (sale.isCollected === true ) ? <Button variant='success' className='btn-sm' disabled>Collected</Button>
											 : (sale.isSentBack === true ) ? <Button variant='info' className='btn-sm' disabled>Sent Back</Button>
											 : (<Button variant='warning' className='btn-sm' disabled>Pending</Button>)
											}
										</td>
										<td>
											<LinkContainer to={`/sale/${sale._id}/collector`}>
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


export default BilledOrderListScreen