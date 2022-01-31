import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import _ from 'lodash'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import FormContainer from '../components/FormContainer'
import { getCountry} from '../actions/dropActions'
import {listManufacturers, createManufacturer, deleteManfacturer} from '../actions/otherActions'
import { MANUFACTURER_CREATE_RESET } from '../constants/otherConstants'


// const pageSize = 3;
const ManufacturerScreen = ({ history }) => {
	let count=1;
	const [validated, setValidated] = useState(false);

	const dispatch = useDispatch()
	const [q , setQ] = useState('')
	const [ order, setOrder ] = useState('ASC')
	// const [currentPage, setCurrentPage] = useState(1)

	const [name, setName] = useState('')
	const [nameErr, setNameErr] = useState('')

	const [shortName, setShortName] = useState('')
	const [shortNameErr, setShortNameErr] = useState('')

	const [country, setCountry] = useState('')
	const [countryErr, setCountryErr] = useState('')

	const nameCheck = (data) => {
		if(data.length<5 || data.length>50){ setNameErr('Required: 5-50 charcters')} 
			else {setNameErr('')}
	}

	const nameCheck1 = (data) => {
		if(data.length > 50){setNameErr('Should not exceed 50 charcters')}
		 else {
			setName(data)
			console.log(data)
			setNameErr('')
		}
	}

	const SN = (data) => {
		if(data.length<2 || data.length>5) { setShortNameErr('Required: 2-5 charcters') } 
			else { setShortNameErr('') }
	}

	const SN1 = (data) => {
		if(data.length > 5){setShortNameErr('Should not exceed 5 charcters')}
		 else {
			setShortName(data)
			console.log(data)
			setShortNameErr('')
		}
	}

	const CN = (data) => {
		if(!data){
			setCountryErr('Please Select a Country')
		}else{
			setCountryErr('')
		}
	}


	const manufacturerList = useSelector( state => state.manufacturerList )
	const { loading, error, manufacturers } = manufacturerList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const countryList = useSelector((state) => state.countryList)
	const { countries } = countryList

	const manufacturerCreate = useSelector( state => state.manufacturerCreate )
	const { loading: createLoading, error: createError, success:createSuccess } = manufacturerCreate

	const manufacturerDelete = useSelector(state => state.manufacturerDelete)
	const { loading: loadingDelete, success: successDelete, error:errorDelete } = manufacturerDelete

	const [ data, setData ] = useState(manufacturers)
	// const [pageData, setPageData] = useState()

	useEffect(()=>{
		   setData(manufacturers)
		},[manufacturers])	

	useEffect(() => {
		
		if(createSuccess){
			dispatch({type: MANUFACTURER_CREATE_RESET})
			setName('')
			setShortName('')
			setCountry('')
		}
		setValidated(null)
		if(!userInfo){
			history.push('/login')
		}
		
		dispatch(listManufacturers())
		dispatch(getCountry())

	},[dispatch,history,createSuccess,successDelete, userInfo])



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
		return data.filter((manufacturer) => 

			manufacturer.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
			manufacturer.shortName.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
			manufacturer.createdUser.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
			manufacturer.country.toLowerCase().indexOf(q.toLowerCase()) > -1
										 										
		)
	}

	const filteredManufacturers = search(data)

	// useEffect(()=>{
	// 	setPageData(_(filteredManufacturers).slice(0).take(pageSize).value())
	// 	console.log(pageData)
	// },[])


	// const pageCount = filteredManufacturers? Math.ceil(filteredManufacturers.length/pageSize) : 0;
	// if(pageCount ===1) return null;

	// const pages = _.range(1, pageCount+1)

	// function PD(data){
	// 	setPageData(_(filteredManufacturers).slice(0).take(pageSize).value())
	// 	console.log('pageData')
	// 	console.log(pageData)
	// 	return pageData
	// }

	// const pageData2 = PD(filteredManufacturers)

	

	// const pagination = (pageNo) => {
	// 	setCurrentPage(pageNo)
	// 	const startIndex = (pageNo-1)
	// 	const paginatedData = _(filteredManufacturers).slice(startIndex).take(pageSize).value()
	// 	setPageData(paginatedData)
	// }

	const submitHandler = (e) =>{
		const form = e.currentTarget;
	    if (form.checkValidity() === false) {
	      e.preventDefault();
	      e.stopPropagation();
	    } else {
	    	e.preventDefault()
			dispatch(createManufacturer({
					name,
					shortName,
					country
				}))

	    }

	    setValidated(true);
		
		}

	const deleteHandler = (id) => {
		if(window.confirm('Are you sure you want to delete?')){
			dispatch(deleteManfacturer(id))
		}
	}

	

	return(
		<>
		<Link to='/' className='btn btn-dark my-3'>Go Back</Link>
		<h1>Add Manufacturers</h1>
		{createLoading && <Loader />}
		{createError && <Message variant='danger'>{createError}</Message>}
		{loadingDelete && <Loader />}
		{errorDelete && <Message variant='danger'>{errorDelete}</Message>}

		<Form onSubmit={submitHandler}  validated={validated} noValidate>
		<Row className='my-3' >
			
			<Col md={6}>
				<Form.Group className="mb-3" controlId='name'>
					<FloatingLabel controlId="floatingInput" label="Manufacturer Name" >
						<Form.Control 	type="name"  placeholder="name"
										className={`${nameErr.length>1 ? 'inCorrect' : null}`}
										value={name}
										onChange = {(e)=> nameCheck1(e.target.value)}
										onBlur = {(e) => nameCheck(e.target.value)} 
										required
									/>
					</FloatingLabel>
					{nameErr.length>1 ? (<div className='errMsg'>{nameErr}</div>): null}
				</Form.Group>
			</Col>
			<Col>
				<Form.Group className="mb-3" controlId='shortName'>
					<FloatingLabel controlId="floatingInput" label="Short Name" >
						<Form.Control 	type="name"  placeholder="shortName"
										className={`${shortNameErr.length>1 ? 'inCorrect' : null}`}
										value={shortName}
										onChange = {(e)=> SN1(e.target.value)}
										onBlur = {(e) => SN(e.target.value)} 
										required
									/>
					</FloatingLabel>
					{shortNameErr.length>1 ? (<div className='errMsg'>{shortNameErr}</div>): null}
				</Form.Group>
			</Col>
			<Col>
				<Form.Group controlId='country'>
					<FloatingLabel controlId="floatingSelect" label="Country">
						<Form.Control as='select' value={country} className="mb-3"
								onChange={(e) => setCountry(e.target.value)}
								className={`${countryErr.length>1 ? 'inCorrect' : null}`}
								onBlur = {(e) => CN(e.target.value)}
								required
								>
								<option value=''>Select Country</option>
								{countries.map(ct => (
									<option value={ct.name}>{ct.name}</option>
								))  }
							</Form.Control>
						</FloatingLabel>
						{countryErr.length>1 ? (<div className='errMsg'>{countryErr}</div>): null}
				</Form.Group>
			</Col>
			
		</Row>
		<Button type='submit' variant='primary'
			className={`${nameErr || countryErr || shortNameErr ? 'disabled' : null }`}
		>
				Save
			</Button>
		</Form>
		
			
		<h2 className='mt-4'>Manufacturer List</h2>
		<Row>
			<Col md={4}>
				<InputGroup className="me-2 my-2">
					<InputGroup.Text>Search</InputGroup.Text>
					<FormControl aria-label="Search"					    			
						 value={q} onChange={(e) =>  setQ(e.target.value)}
					/>
				</InputGroup>
			</Col>
			<Col>
				<ReactHTMLTableToExcel
	                    id="test-table-xls-button"
	                    className="download-table-xls-button btn btn-success mb-3 me-2 my-2"
	                    table="table-to-xls"
	                    filename="tablexls"
	                    sheet="tablexls"
	                    buttonText="Export"
	              />
			</Col>
		</Row>
		

		{ loading ? <Loader />
			: error ? <Message variant='danger'>{error}</Message>
			: (		
				<div>
					<Table striped bordered hover responsive='md' className='table-sm' id="table-to-xls">
						<thead>
							<tr>
								<th ><span className='btn'>Sl</span></th>
								<th onClick={() => sorting('name')}><span className='btn'>Manufacturer Name</span></th>
								<th onClick={() => sorting('shortName')}><span className='btn'>Short Name</span></th>
								<th onClick={() => sorting('country')}><span className='btn'>Country</span></th>
								<th onClick={() => sorting('createdUser')}><span className='btn'>CreatedBy</span></th>
								<th onClick={() => sorting('createdAt')}><span className='btn'>Created Date</span></th>
								<th><span className='btn'>Action</span></th>
							</tr>
						</thead>
						<tbody>
							{filteredManufacturers.map(manufacturer => (
									<tr key={manufacturer._id} >
										<td>{count++}</td>
										<td>{manufacturer.name}</td>
										<td>{manufacturer.shortName}</td>
										<td>{manufacturer.country}</td>
										<td>{manufacturer.createdUser}</td>
										<td>{manufacturer.createdAt.substring(0,10)}</td>
										<td>
											<LinkContainer to={`/manufacturers/${manufacturer._id}/edit`}>
												<Button variant='light' className='btn-sm'>
													<i className='fas fa-edit'></i>
												</Button>
											</LinkContainer>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(manufacturer._id)}>
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
			{/*<nav className='d-flex justify-content-center'>
				<ul className='pagination'>
					{pages.map((page) => (
							<li className={page === currentPage? 'page-item active' : 'page-item' }
							>
							<p className='page-link'
								onClick={() => pagination(page)}
							>{page}</p>
							</li>
						))					
					}
				</ul>

			</nav>*/}
		</>
		)
}


export default ManufacturerScreen