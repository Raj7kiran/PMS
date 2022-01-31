import React, { useEffect } from 'react'
import { Table, Button,} from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import SaleSteps from '../components/SaleSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMySales, deleteSale  } from '../actions/saleActions'
// import { SALE_DELETE_RESET } from '../constants/orderConstants'


const MySalesScreen = () => {
	let count=1;
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const saleListMy = useSelector((state) => state.saleListMy)
	const { loading: loadingSales , error: errorSales, sales } = saleListMy

	const saleDelete = useSelector( state => state.saleDelete )
	const { loading: loadingDelete, success: successDelete, error:errorDelete } = saleDelete


	useEffect(()=> {
		if(!userInfo || !(userInfo.role === '7' || userInfo.role === '9') ){
			navigate('/')
		} 
			
		dispatch(listMySales())
		
	}, [dispatch, navigate, userInfo, successDelete])


	const deleteHandler = (id) => {
		if(window.confirm('Are you sure you want to delete?')){
			dispatch(deleteSale(id))
		}
	}


	return (
		<>
		<SaleSteps />
		{loadingDelete && <Loader />}
		{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
		{ loadingSales ? <Loader />
			: errorSales ? <Message variant='danger'>{errorSales}</Message>
			: (
				<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>S.No</th>
								<th >Patient Name</th>
								<th >ID</th>
								<th >Age</th>
								<th >Gender</th>
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
										<td>{
											  (sale.isSentBack === true) ? <Button variant='secondary' className='btn-sm' disabled>Sent Back</Button>
											 : (sale.isRejected === true) ? <Button variant='dark' className='btn-sm' disabled>Rejected</Button>
											 : (sale.isBilled === true) ? <Button variant='warning' className='btn-sm' disabled>Billed</Button>
											 : (sale.isCollected === true) ? <Button variant='primary' className='btn-sm' disabled>Collected</Button>
											 : (sale.isDelivered === true) ? <Button variant='success' className='btn-sm' disabled>Delivered</Button>
											 :(sale.isSubmitted === true && sale.isSaved=== true ) ? <Button variant='info' className='btn-sm' disabled>Submitted</Button>
											 : (sale.isSubmitted === false && sale.isSaved=== true ) ? <Button variant='info' className='btn-sm' disabled>Saved</Button>
											 : (sale.isSubmitted === true && sale.isSaved=== false ) && <Button variant='info' className='btn-sm' disabled>Submitted</Button>
											}
										</td>
										<td>
											<LinkContainer to={`/sale/${sale._id}`}>
												<Button variant='info' className='btn-sm mx-1'
													// onClick = {(e) => forModalLaunch(order._id)} 
												>
													<i className='far fa-eye'></i>
												</Button>
											</LinkContainer>
											<LinkContainer to={`/sale/${sale._id}/edit`}>
												<Button variant='light' className='btn-sm mx-1' disabled
													>
													<i className='far fa-edit'></i>
												</Button>
											</LinkContainer>
											<Button variant='dark' className='btn-sm mx-1' 
													onClick={()=> deleteHandler(sale._id)}
											>
												<i className='fas fa-cut'></i>
											</Button>
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


export default MySalesScreen