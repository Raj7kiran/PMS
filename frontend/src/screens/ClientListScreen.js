import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listClients, deleteClient } from '../actions/adminActions'


const ClientListScreen = () => {
	const dispatch = useDispatch()
	let navigate = useNavigate()
	const [q , setQ] = useState('')
	const [ order, setOrder ] = useState('ASC')

	const clientList = useSelector(state => state.clientList)
	const { loading, error, clients } = clientList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const clientDelete = useSelector(state => state.clientDelete)
	const {loading:loadingDelete , error:errorDelete ,success: successDelete } = clientDelete

	// const clients = useSelector(state => state.clientList.clients)
	const [ data, setData ] = useState(clients) 

	useEffect(()=>{
		   setData(clients)
		   // console.log(data)
		},[clients])

	// console.log(data)

	useEffect(() => {
		if(!userInfo || !userInfo.isAdmin){
			navigate('/')
		}
			dispatch(listClients())
		
	}, [dispatch, userInfo, navigate, successDelete] )

	


	const sorting = (col) => {
		 if(order === 'ASC'){
				const sorted = [...data].sort((a,b) =>
					a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
				)
				setData(sorted)
				setOrder('DSC')
		 }
	 	if(order === 'DSC'){
		 	const sorted = [...data].sort((a,b) =>
		 		a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
		 	)
		 	setData(sorted)
			setOrder('ASC')
		 }
	}	

	function search(data2) {
		return data2.filter((client) =>
						client.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1 
						// pack.email.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						// pack.company.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						// pack.package.toLowerCase().indexOf(q.toLowerCase()) > -1 																		 										
					)
		}

	const filteredClients = search(data)
	

	const deleteHandler = (id) =>{
		if(window.confirm('Are you sure you want to delete?')){
				dispatch(deleteClient(id))
		}
	}

	
	return(
			<>	
				<div>
					<Link to='/' className='btn btn-dark mt-4'>Go Back</Link>
					<Link className='btn btn-dark mt-4  mx-4' to='/addUsers'>Add Client</Link>
				</div>
				
				<h1>Clients List</h1>
				
				{loadingDelete && <Loader />}
				{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
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
						<div>
						<Table striped bordered hover responsive className='table-sm' className='table-sm bg-light' id="table-to-xls">
							<thead>
								<tr>
									<th onClick={() => sorting('firstName')} ><span className='btn'>First Name</span></th>
									<th onClick={() => sorting('email')} ><span className='btn'>Email</span></th>
									<th onClick={() => sorting('company')} ><span className='btn'>Company</span></th>
									<th onClick={() => sorting('package')} ><span className='btn'>Package</span></th>
									<th><span className='btn'>Action</span></th>
								</tr>
							</thead>
							<tbody>
								{filteredClients.map(client => (
									<tr key={client._id}>
										<td>{client.firstName}</td>
										<td>{client.email}</td>
										<td>{client.company}</td>
										<td>{client.package}</td>
										<td>
											<LinkContainer to={`/admin/user/${client._id}/edit`}>
												<Button variant='light' className='btn-sm'>
													<i className='fas fa-edit'></i>
												</Button>
											</LinkContainer>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(client._id)}>
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


export default ClientListScreen

