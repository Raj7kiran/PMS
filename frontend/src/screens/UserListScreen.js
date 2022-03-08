import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap'
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
				{/*<div className='button-wrapper'>*/}
					{/*<Link to='/' className='btn btn-dark buttonlink mt-4'>Go Back</Link>*/}
					
				{/*</div>*/}
				
				{/*{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
					: (
						<div style={{margin:"90px 0 0 0"}} className='bodydivs'>
						<Row>
							<Col md={10}>
								<div className="mt-3 mb-2"><h2>User List</h2></div>
							</Col>
							<Col md={2}>
								<Link className='mt-4 btn btn-info' to='/addUsers'><span style={{color:'white'}} >Add User</span></Link>
							</Col>
						</Row>

						<hr />

						<div className="table-wrapper">
						
						<Row >
							<Col md={6}>
							</Col>
							<Col md={4}>
								<div className='searchTable'>
									<InputGroup className='m-2'>
									    <InputGroup.Text style={{background:'rgb(210,39,48,0.7)', color:'white'}}>Search</InputGroup.Text>
									    <FormControl aria-label="Search"					    			
									    			 value={q} onChange={(e) =>  setQ(e.target.value)}
									    />
									</InputGroup>
								</div>
							</Col>
							<Col md={1}>
								<ReactHTMLTableToExcel
					                    id="test-table-xls-button"
					                    className=" download-table-xls-button btn btn-success m-2"
					                    table="table-to-xls"
					                    filename="tablexls"
					                    sheet="tablexls"
					                    buttonText="Export"
					              />
							</Col>
						</Row>
						<Table responsive className='fl-table table-row-hover'>							
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
						</div>
					)}*/}

					{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
					: (
						<div style={{margin:"90px 0 0 0"}} className='bodydivs'>
							<Row>
								<Col md={10}>
									<div className="mt-3 mb-2"><h2>User List</h2></div>
								</Col>
								<Col md={2}>
									<Link className='mt-4 btn btn-info forallbut' to='/addUsers'><span style={{color:'white'}} >Add User</span></Link>
								</Col>
							</Row>

							<hr />
							<div className='searchTable'>
									<InputGroup className='m-2'>
									    <InputGroup.Text style={{background:'rgb(210,39,48,0.7)', color:'white'}}>Search</InputGroup.Text>
									    <FormControl aria-label="Search"					    			
									    			 value={q} onChange={(e) =>  setQ(e.target.value)}
									    />
									</InputGroup>
								</div>
							<Row>
								{filteredUsers.map(user => (
									<Col key={user._id} sm={12} md={6} lg={4} xl={3} >
										<Card className='profcard' className='mt-3 p-3 rounded'>
											<Card.Img  className='profileimagecard' src='./img/circleprof.png' variant='top'/>
											<Card.Body>
												<Link to={`/user/${user._id}`}>
													<Card.Title className='profiletitle' as='div'>
														<strong>{user.firstName}</strong>
													</Card.Title>
												</Link>
													<Card.Text className='profilecardtext' as='div'>
														<p>{user.email}</p>
														<p><b>{user.role}</b></p>
													</Card.Text>

													<div>
													{/*<Link style={{width:'100%'}} to={`/user/${user._id}`} className='btn forallbut btn-info'>View Profile</Link>*/}
													<Row>
														<Col>
															<LinkContainer to={`/user/${user._id}/edit`}>
																<Button variant='outline-warning'  className='btn forallbut  editbutton mt-2'>
																	<i style={{padding:'5px 5px 0px'}} className='fas fa-edit'></i>
																</Button>
															</LinkContainer>
														</Col>
														<Col>
															<Button variant='outline-dark' className='btn forallbut deletebutton mt-2' 
																	onClick={()=> deleteHandler(user._id)}>
																<i style={{padding:'0 5px 0'}} className='fas fa-trash'></i>
															</Button>
														</Col>
													</Row>
														
														
													</div>
												
											</Card.Body>
										</Card>
									</Col>	
								))}
							</Row>
						</div>
					)}
			</>
		)
}


export default UserListScreen

