import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listClients } from '../actions/adminActions'


const ClientListScreen = ({}) => {
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const clientList = useSelector(state => state.clientList)
	const { loading, error, clients } = clientList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	// const userDelete = useSelector(state => state.userDelete)
	// const {success: successDelete } = userDelete

	useEffect(() => {
		if(userInfo && userInfo.isAdmin){
			dispatch(listClients())
		} else {
			navigate('/')
		}		
	}, [dispatch, userInfo] )

	const deleteHandler = (id) =>{
		// if(window.confirm('Are you sure you want to delete?')){
		// 		dispatch(deleteUser(id))
		// }
	}

	return(
			<>
				<Link to='/' className='btn btn-dark mt-4'>Go Back</Link>
				<Row className='align-items-center'>			
					<Col>
						<h1>Clients List</h1>
					</Col>
					<Col className='text-right my-3'>
						<Link className='btn btn-dark' to='/addUsers'>Add Client</Link>
					</Col>
				</Row>
				{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
					: (
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<tr>
									<th>First Name</th>
									<th>Email</th>
									<th>Company</th>
									<th>Package</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{clients.map(client => (
									<tr key={client._id}>
										<td><a href='/profile'>{client.firstName}</a></td>
										<td>{client.email}</td>
										<td>{client.company}</td>
										<td>{client.package}</td>
										{/*<td><a href={`mailto:${clients.email}`}>{clients.email}</a></td>
										<td>{user.isAdmin? (<i className='fas fa-check' style={{color:'green'}}></i>)
														 : (<i className='fas fa-times' style={{color:'red'}}></i>) }
										</td>
										<td>
											<LinkContainer to={`/admin/user/${user._id}/edit`}>
												<Button variant='light' className='btn-sm'>
													<i className='fas fa-edit'></i>
												</Button>
											</LinkContainer>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(user._id)}>
												<i className='fas fa-trash'></i>
											</Button>
										</td>*/}
									</tr>
								))}
							</tbody>
						</Table>
					)}
			</>
		)
}


export default ClientListScreen

