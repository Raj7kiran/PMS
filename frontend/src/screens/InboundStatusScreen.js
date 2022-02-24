import React, { useEffect } from 'react'
import { Row, Col, Button, Table, Card, Form, FloatingLabel, ListGroup } from 'react-bootstrap'
import InboundSteps from '../components/InboundSteps'
import{ LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import SaleSteps from '../components/SaleSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listInbound  } from '../actions/inboundActions'




const InboundStatusScreen = () => {
	let count=1;
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const inboundList = useSelector((state) => state.inboundList)
	const { loading: loadingInbound , error: errorInbound, inboundOrder } = inboundList

	useEffect(()=> {
		if(!userInfo){
			navigate('/')
		} 
			
		dispatch(listInbound())
		
	}, [dispatch, navigate, userInfo])

	console.log(inboundOrder)

	return (
		<>
		<InboundSteps />
		{
			loadingInbound ? <Loader />
			: errorInbound ? <Message variant='danger'>{errorInbound}</Message>
			: (
				<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th>S.No</th>
								<th>GR No.</th>
								<th>Quantity</th>
								<th >Vendor Name</th>
								<th >Invoice No</th>
								<th >Total Quantity</th>
								<th >Created By</th>
								<th >Created Date</th>
								<th >Status</th>
								<th >Action</th>
							</tr>
						</thead>
						<tbody>
							{
								inboundOrder.map(data => (
									<tr key={data._id}>
										<td>{count++}</td>
										<td>{data._id}</td>
									</tr>
								))
							}
						</tbody>
				</Table>
				)
		}
		

		</>
		)
}


export default InboundStatusScreen