import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Table, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPackages, createPackage } from '../actions/adminActions'
import { PACKAGE_CREATE_RESET } from '../constants/adminConstants'


const PackageScreen = ({ match }) => {
	const [name, setName] = useState('')
	const [maxUsers, setMaxUsers] = useState(0)
	const [maxDays, setMaxDays] = useState(0)

	const dispatch = useDispatch()
	let navigate = useNavigate()

	const packageList = useSelector(state => state.packageList)
	const { loading, error, packages } = packageList

	const packageCreate = useSelector(state => state.packageCreate)
	const { loading:loadingCreate , error:errorCreate , success: successCreate, package: createdPackage } = packageCreate

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	useEffect(() => {
		dispatch({type: PACKAGE_CREATE_RESET})

		if(!userInfo || !userInfo.isAdmin){
			navigate('/')
		}

		setName('')
		setMaxDays(0)
		setMaxUsers(0)
		dispatch(listPackages())

	}, [dispatch, userInfo, successCreate] )

	const submitHandler = (e) =>{
		e.preventDefault()
		dispatch(createPackage({
			name,
			maxDaysAllowed : maxDays * 30,
			maxUserAllowed : maxUsers
		}))

		}


	return(
		<>
		<Link to='/' className='btn btn-dark my-3'>Go Back</Link>
		<h1>Add Package</h1>
		
		{loadingCreate && <Loader />}
		{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
		
		<Form onSubmit={submitHandler}>
		<Row className='my-3' >			
			<Col>
				<Form.Group className="mb-3" controlId='name'>
					<FloatingLabel controlId="floatingInput" label="Package Name" className="mb-3">
						<Form.Control 	type="text"  placeholder="Package name"
										value={name}
										onChange = {(e)=> setName(e.target.value)} 
									/>
					</FloatingLabel>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group controlId='maxUsers'>
					<FloatingLabel controlId="floatingSelect" label="Max. allowed users">
						<Form.Control as='select' value={maxUsers} 
									  onChange={(e) => setMaxUsers(e.target.value)}>
						  	{/*<Form.Select aria-label="Floating label select example">*/}
						    	<option>Select number of users</option>
						    	<option value="3">3</option>
						    	<option value="5">5</option>
						    	<option value="10">10</option>
						  	{/*</Form.Select>*/}
					  	</Form.Control>
					</FloatingLabel>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group controlId='maxDays'>
					<FloatingLabel controlId="floatingSelect" label="Package Limit">
						<Form.Control as='select' value={maxDays} 
									  onChange={(e) => setMaxDays(e.target.value)}>
						  	{/*<Form.Select aria-label="Floating label select example">*/}
						    	<option>Select Period</option>
						    	<option value="1">1 Month</option>
						    	<option value="3">3 Months</option>
						    	<option value="6">6 Months</option>
						    	<option value="12">1 year</option>
						  	{/*</Form.Select>*/}
					  	</Form.Control>
					</FloatingLabel>
				</Form.Group>
			</Col>
			
		</Row>
			<Button type='submit' variant='primary'>
				Save
			</Button>
		</Form>

		<h2 className='mt-4'>Manufacturer List</h2>
		{ loading ? <Loader />
			: error ? <Message variant='danger'>{error}</Message>
			: (		
				<div>
					
					<Table striped bordered hover responsive='md' className='table-sm bg-light' id="table-to-xls">
						<thead>
							<tr>
								<th>Package Name</th>
								<th>Maximum Users</th>
								<th>Maximum Days</th>
								<th>Action</th>								
							</tr>
						</thead>
						<tbody>
							{ packages.map(pack => (
									<tr key={pack._id} >
										<td>{pack.name}</td>
										<td>{pack.maxUserAllowed}</td>
										<td>{pack.maxDaysAllowed}</td>
										<td>
											{/*<LinkContainer to={`/admin/product/${product._id}/edit`}>*/}
												<Button variant='light' className='btn-sm'>
													<i className='fas fa-edit'></i>
												</Button>
											{/*</LinkContainer>*/}
											<Button variant='danger' className='btn-sm' 
													// onClick={()=> deleteHandler(manufacturer._id)}
													>
												<i className='fas fa-trash'></i>
											</Button>
										</td>
									</tr>
								)) }
						</tbody>
					</Table>
				</div>
			 ) 
		 }
		 </>
		)
}



export default PackageScreen