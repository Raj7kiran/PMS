import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup, FormControl, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createUser, listPackages } from '../actions/adminActions'
import { CLIENT_CREATE_RESET } from '../constants/adminConstants'



const AddClientScreen = () => {
	const [ name, setName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ company, setCompany ] = useState('')
	const [ role, setRole ] = useState('')
	const [ address, setAddress ] = useState('')
	const [ pack, setPack ] = useState('')
	const [ isAdmin, setIsAdmin ] = useState(false)
	const [ isClientAdmin, setIsClientAdmin] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const clientCreate = useSelector(state => state.clientCreate)
	const { loading, success, error } = clientCreate

	const packageList = useSelector(state => state.packageList)
	const { loading : loadingPackage , error: errorPackage , packages } = packageList

	useEffect(() => {
		dispatch({ type: CLIENT_CREATE_RESET })
		dispatch(listPackages())

		if(!userInfo.isAdmin){
			if(success){			
				navigate('/admin/clientlist')
			} 
		}

		if(success){			
			navigate('/userlist')
		} 
			 
	},[success, navigate, dispatch])

	const submitHandler = (e) => {
		e.preventDefault()
		// console.log(role)
		dispatch(createUser({
			name, email, company: company || userInfo.company, role, address, packageName: pack || userInfo.package , isAdmin, isClientAdmin 
		}))

	}


	return (
		<>
		<Link to='/admin/clientlist' className='btn btn-dark my-3'>Go Back</Link>
		<FormContainer  >
			<h1>Add User</h1>
				{ loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
						<Form onSubmit={submitHandler} >
							<Form.Group className="mb-3" controlId='name'>
								<FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
									<Form.Control 	type="name"  placeholder="name"
													value={name}
													onChange = {(e)=> setName(e.target.value)} 
												/>
								</FloatingLabel>
							</Form.Group>

							<Form.Group className="mb-3" controlId='email'>
								<FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
									<Form.Control 	type="email"  placeholder="name@example.com"
													value={email}
													onChange = {(e)=> setEmail(e.target.value)} 
												/>
								</FloatingLabel>
							</Form.Group>
							{ userInfo.isAdmin && (
									<>
									<Form.Group className="mb-3" controlId='company'>
										<FloatingLabel controlId="floatingInput" label="Company Name" className="mb-3">
											<Form.Control 	type="company"  placeholder="Company Name"
															value={company}
															onChange = {(e)=> setCompany(e.target.value)} 
														/>
										</FloatingLabel>
									</Form.Group>

									<Form.Group controlId='package'>
										<FloatingLabel controlId="floatingSelect" label="Package">
											<Form.Control as='select' value={pack} 
														  onChange={(e) => setPack(e.target.value)}>
												<option value=''>Select Package</option>
												{packages.map(pack => (
														<option value={pack.name} >{pack.name}</option>
													))   }
											</Form.Control>
										</FloatingLabel>
									</Form.Group>

									<Form.Group controlId='isAdmin'>
										<Form.Label>Is the user a Admin?</Form.Label>
										<InputGroup className="mb-3">
											    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
											    						aria-label="Checkbox for following text input"
											    						checked={isAdmin}
											    						onChange = { (e) => setIsAdmin(e.target.checked)}
											     />
											 <FormControl aria-label="Text input with checkbox" />
										</InputGroup>
									</Form.Group>

									<Form.Group controlId='isClientAdmin'>
										<Form.Label>Is the user a Client Admin?</Form.Label>
										<InputGroup className="mb-3">
											    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
											    						checked={isClientAdmin}
											    						onChange = { (e) => setIsClientAdmin(e.target.checked) }
											     />
											 <FormControl aria-label="Text input with checkbox" />
										</InputGroup>
									</Form.Group>

									</>
								) }
							
								{ userInfo.isClientAdmin && (
									<>
										<Form.Group className="mb-3" controlId='company'>
											<FloatingLabel controlId="floatingInput" label="Company Name" className="mb-3">
												<Form.Control 	type="company"  placeholder="Company Name"
																value={userInfo.company} disabled															
															/>
											</FloatingLabel>
										</Form.Group>

										<Form.Group controlId='isClientAdmin'>
											<Form.Label>Is the user a Client Admin?</Form.Label>
											<InputGroup className="mb-3">
												    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
												    						checked={isClientAdmin}
												    						onChange = { (e) => setIsClientAdmin(e.target.checked) }
												     />
												 <FormControl aria-label="Text input with checkbox" />
											</InputGroup>
										</Form.Group>

										<Form.Group controlId='role'>
												<FloatingLabel controlId="floatingSelect" label="Role">
													<Form.Control as='select' value={role} 
														onChange={(e) => setRole(e.target.value)}>
														<option value=''>Select Role</option>
														<option value='Role 1'>Role 1</option>
														<option value='Role 2'>Role 2</option>
														<option value='Role 3'>Role 3</option>
													</Form.Control>
												</FloatingLabel>
										</Form.Group>

										<Form.Group>
											<FloatingLabel controlId="floatingTextarea2" label="Address">
											    <Form.Control
											      as="textarea"
											      placeholder="Address"
											      style={{ height: '100px' }}
											      value={address} 
												  onChange={(e) => setAddress(e.target.value)}
											    />
											</FloatingLabel>
										</Form.Group>
									</>
								)}
											


							<Button type='submit' variant='primary'>
								Add
							</Button>
					</Form>
						) }
				
		</FormContainer>
		</>
		)
}



export default AddClientScreen