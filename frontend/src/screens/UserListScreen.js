import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'


const UserListScreen = ({}) => {
	const dispatch = useDispatch()
	let navigate = useNavigate()

	const userList = useSelector(state => state.userList)
	const { loading, error, users } = userList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	// const userDelete = useSelector(state => state.userDelete)
	// const {success: successDelete } = userDelete

	useEffect(() => {
		if(userInfo){
			dispatch(listUsers())
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
						<h1>Users List</h1>
					</Col>
					<Col className='text-right my-3'>
						<Link className='btn btn-dark' to='/addUsers'>Add Users</Link>
					</Col>
				</Row>
				{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
					: (
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
									<th>Address</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{users.map(user => (
									<tr key={user._id}>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.role}</td>
										<td>{user.address}</td>
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


export default UserListScreen

