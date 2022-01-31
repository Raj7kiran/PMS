import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPackages, createPackage, deletePackage } from '../actions/adminActions'
import { PACKAGE_CREATE_RESET } from '../constants/adminConstants'


const PackageScreen = ({ match }) => {
	const [validated, setValidated] = useState(false);

	const [name, setName] = useState('')
	const [maxUsers, setMaxUsers] = useState(0)
	const [maxDays, setMaxDays] = useState(0)

	const dispatch = useDispatch()
	let navigate = useNavigate()
	const [q , setQ] = useState('')
	const [ order, setOrder ] = useState('ASC')
	
	
	const packageList = useSelector(state => state.packageList)
	const { loading, error, packages } = packageList

	const packageCreate = useSelector(state => state.packageCreate)
	const { loading:loadingCreate , error:errorCreate , success: successCreate } = packageCreate

	const packageDelete = useSelector(state => state.packageDelete)
	const { loading:loadingDelete , error:errorDelete , success: successDelete } = packageDelete

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	// const packages = useSelector(state => state.packageList.packages)
	const [ data, setData ] = useState(packages)	

	useEffect(()=>{
		   setData(packages)
		},[packages])

	useEffect(() => {
		dispatch({type: PACKAGE_CREATE_RESET})

		if(!userInfo || !userInfo.isAdmin){
			navigate('/')
		}

		setName('')
		setMaxDays(0)
		setMaxUsers(0)
		
		dispatch(listPackages())
		setValidated(null)
		// setData(packages)	

		
	}, [dispatch, userInfo, successCreate, successDelete, navigate] )



	const sorting = (col) => {
		 if(order === 'ASC'){
				const sorted = [...data].sort((a,b) =>
					a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
				)
				setData(sorted)
				setOrder('DSC')
		 }
	 	if(order === 'DSC'){
		 	const sorted = [...data].sort((a,b) =>
		 		a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
		 	)
		 	setData(sorted)
			setOrder('ASC')
		 }
	}

	function search(data) {
		return data.filter((pack) =>
						pack.packageName.toLowerCase().indexOf(q.toLowerCase()) > -1 
						// pack.maxDaysAllowed.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						// pack.maxUserAllowed.toLowerCase().indexOf(q.toLowerCase()) > -1 																		 										
					)
	}

	const filteredPackages = search(data)
	// console.log(filteredPackages)


	const submitHandler = (e) =>{
		const form = e.currentTarget;
	    if (form.checkValidity() === false) {
	    	console.log('wrong')
	      e.preventDefault();
	      e.stopPropagation();
	    } else {
	    	e.preventDefault()
			dispatch(createPackage({
					packageName: name,
					maxDaysAllowed : maxDays * 30,
					maxUserAllowed : maxUsers
			}))
	    }

	    setValidated(true);
		
		}

	const deleteHandler = (id) =>{
		if(window.confirm('Are you sure you want to delete?')){
				dispatch(deletePackage(id))
		}
	}


	return(
		<>
		<Link to='/' className='btn btn-dark my-3'>Go Back</Link>
		<h1>Add Package</h1>
		
		{loadingCreate && <Loader />}
		{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
		{loadingDelete && <Loader />}
		{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
		
		<Form onSubmit={submitHandler} validated={validated} noValidate>
		<Row className='my-3' >			
			<Col>
				<Form.Group className="mb-3" controlId='name'>
					<FloatingLabel controlId="floatingInput" label="Package Name" className="mb-3">
						<Form.Control 	type="text"  placeholder="Package name"
										value={name}
										onChange = {(e)=> setName(e.target.value)} 
										required
									/>
					</FloatingLabel>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group controlId='maxUsers'>
					<FloatingLabel controlId="floatingSelect" label="Max. allowed users">
						<Form.Control as='select' value={maxUsers} 
									  onChange={(e) => setMaxUsers(e.target.value)}
									  required>
						  	{/*<Form.Select aria-label="Floating label select example">*/}
						    	<option value="">Select number of users</option>
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
									  onChange={(e) => setMaxDays(e.target.value)}
									  required>
						  	{/*<Form.Select aria-label="Floating label select example">*/}
						    	<option value="">Select Period</option>
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

		<h2 className='mt-4'>Package List</h2>
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
				
		

		{ loading ? <Loader />
			: error ? <Message variant='danger'>{error}</Message>
			: (		
				<div>
					{/*<input type="search" placeholder="Search" className="me-2 my-2" aria-label="Search" 
						   value={q} onChange={(e) =>  setQ(e.target.value)}
					/>*/}				

					<Table striped bordered hover responsive='md' className='table-sm bg-light' id="table-to-xls">
						<thead>
							<tr>
								<th onClick={() => sorting('packageName')} ><span className='btn'>Package Name</span></th>
								<th onClick={() => sorting('maxUserAllowed')} ><span className='btn'>Maximum Users</span></th>
								<th onClick={() => sorting('maxDaysAllowed')} ><span className='btn'>Maximum Days</span></th>
								<th><span className='btn'>Action</span></th>								
							</tr>
						</thead>
						<tbody>
							{filteredPackages.map(pack => (
									<tr key={pack._id} >
										<td>{pack.packageName}</td>
										<td>{pack.maxUserAllowed}</td>
										<td>{pack.maxDaysAllowed}</td>
										<td>
											{/*<LinkContainer to={`/admin/product/${product._id}/edit`}>*/}
												<Button variant='info' className='btn-sm mx-1' disabled>
													<i className='fas fa-edit'></i>
												</Button>
											{/*</LinkContainer>*/}
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(pack._id)}
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