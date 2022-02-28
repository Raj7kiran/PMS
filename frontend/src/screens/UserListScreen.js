import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'


const UserListScreen = () => {
	const dispatch = useDispatch()
	let navigate = useNavigate()
	const [q , setQ] = useState('')
	// const [ order, setOrder ] = useState('ASC')

	const userList = useSelector(state => state.userList)
	const { loading, error, users } = userList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const userDelete = useSelector(state => state.userDelete)
	const {success: successDelete } = userDelete


	const [ data, setData ] = useState(users)

	useEffect(()=>{
		   setData(users)
		   // console.log(data)
		},[users]) 

	useEffect(() => {
		if(userInfo){
			dispatch(listUsers())
		} else {
			navigate('/')
		}		
	}, [dispatch, userInfo, navigate, successDelete] )


	// const sorting = (col) => {
	// 	 if(order === 'ASC'){
	// 			const sorted = [...data].sort((a,b) =>
	// 				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
	// 			)
	// 			setData(sorted)
	// 			setOrder('DSC')
	// 	 }
	//  	if(order === 'DSC'){
	// 	 	const sorted = [...data].sort((a,b) =>
	// 	 		a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
	// 	 	)
	// 	 	setData(sorted)
	// 		setOrder('ASC')
	// 	 }
	// }	

	function search(data2) {
		return data2.filter((user) =>
						user.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						user.email.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						user.role.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						(user.address && user.address.toLowerCase().indexOf(q.toLowerCase()) )> -1 																		 										
					)
		}

	const filteredUsers= search(data)

	const deleteHandler = (id) =>{
		if(window.confirm('Are you sure you want to delete?')){
				dispatch(deleteUser(id))
		}
	}

	return(
			<>	
				<div>
					<Link to='/' className='btn btn-dark mt-4'>Go Back</Link>
					<Link className='btn btn-dark mt-4  mx-4' to='/addUsers'>Add User</Link>
				</div>
				
				
				<div className='d-flex'>
					<div className='p-2'>
						<div className='searchTable'>
							<InputGroup className="me-2 my-2">
							    <InputGroup.Text>Search</InputGroup.Text>
							    <FormControl aria-label="Search"					    			
							    			 value={q} onChange={(e) =>  setQ(e.target.value)}
							    />
							</InputGroup>
						</div>
					</div>
					<div className='ml-auto p-2'>
						<ReactHTMLTableToExcel
			                    id="test-table-xls-button"
			                    className="download-table-xls-button btn btn-success me-2 my-2"
			                    table="table-to-xls"
			                    filename="tablexls"
			                    sheet="tablexls"
			                    buttonText="Export"
			              />
					</div>
				</div>
					
				{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
					: (
						<div className='table-design'>
						<div className="header">User List</div>
						<Table striped bordered hover responsive className='table-sm' id='table-to-xls'>							
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
								{filteredUsers.map(user => (
									<tr key={user._id}>
										<td>{user.firstName}</td>
										<td>{user.email}</td>
										<td>{user.role}</td>
										<td>{user.address}</td>
										<td>
											<LinkContainer to={`/user/${user._id}/edit`}>
												<Button variant='light' className='btn-sm mx-1'>
													<i className='fas fa-edit'></i>
												</Button>
											</LinkContainer>
											<Button variant='danger' className='btn-sm mx-1' 
													onClick={()=> deleteHandler(user._id)}>
												<i className='fas fa-trash'></i>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						</div>
					)}
			</>
		)
}


export default UserListScreen

