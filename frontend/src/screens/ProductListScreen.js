import React, {useEffect, useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ProductSteps from '../components/ProductSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {listProducts, deleteProduct} from '../actions/otherActions'
// import { PRODUCT_DELETE_RESET } from '../constants/otherConstants'


const ProductListScreen = ({history}) => {
	let count=1;
	const dispatch = useDispatch()
	const [q , setQ] = useState('')
	const [ order, setOrder ] = useState('ASC')

	const productList = useSelector( state => state.productList )
	const { loading, error, products } = productList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const productDelete = useSelector( state => state.productDelete )
	const { loading: loadingDelete, success: successDelete, error:errorDelete } = productDelete

	const [ data, setData ] = useState(products)
	// const [pageData, setPageData] = useState()

	useEffect(()=>{
		   setData(products)
		},[products])

	useEffect(() => {



		if(!userInfo){
			history.push('/login')
		}
		
		dispatch(listProducts())

	},[dispatch, history, userInfo, successDelete])

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
		return data.filter((product) => 

			product.medicineName.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
			product.genericName.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
			product.manufacturer.toLowerCase().indexOf(q.toLowerCase()) > -1 
			// product.mrp.toLowerCase().indexOf(q.toLowerCase()) > -1
										 										
		)
	}

	const filteredProducts = search(data)

	const deleteHandler = (id) => {
		if(window.confirm('Are you sure you want to delete?')){
			dispatch(deleteProduct(id))
		}
	}

	return(
		<>
			<ProductSteps />
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{successDelete && <Message variant='info'>Product Deleted</Message>}
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

			

			{
				loading ? <Loader />
				: error ? <Message variant='danger'>{error}</Message>
				: (
					<Table striped bordered hover responsive='md' className='table-sm' id="table-to-xls">
						<thead>
							<tr>
								<th ><span className='btn'>Sl</span></th>
								<th onClick={() => sorting('medicineName')}><span className='btn'>Medicine</span></th>
								<th onClick={() => sorting('genericName')}><span className='btn'>Gen Name</span></th>
								<th onClick={() => sorting('indication')}><span className='btn'>Indicators</span></th>
								<th onClick={() => sorting('manufacturer')}><span className='btn'>Manufacturer</span></th>
								<th onClick={() => sorting('mrp')}><span className='btn'>MRP</span></th>
								{
									userInfo.isClientAdmin && (
										<th><span className='btn'>Action</span></th>
											)
									}
								</tr>
						</thead>
						<tbody>
							{filteredProducts.map(product => (
									<tr key={product._id} >
										<td>{count++}</td>
										<td>{product.medicineName}</td>
										<td>{product.genericName}</td>
										<td>{product.indication}</td>
										<td>{product.manufacturer}</td>
										<td>{product.mrp}</td>
										{
											userInfo.isClientAdmin && (
													<td>
														<LinkContainer to={`/products/${product._id}/edit`}>
															<Button variant='light' className='btn-sm'>
																<i className='fas fa-edit'></i>
															</Button>
														</LinkContainer>
														<Button variant='danger' className='btn-sm' 
																onClick={()=> deleteHandler(product._id)}
																>
															<i className='fas fa-trash'></i>
														</Button>
													</td>
												)
										}
										
									</tr>
								)) }
						</tbody>
					</Table>
				)
			}		
			
		</>
		)
}



export default ProductListScreen