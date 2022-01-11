import React from 'react'
import { Nav } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'


const ProductSteps = () => {
	return(
		<Nav className='my-3' variant="tabs" >
		  	<LinkContainer to='/products' >
				<Nav.Link>Add Product</Nav.Link>
			</LinkContainer>
			<LinkContainer to='/productlist'>
				<Nav.Link>Product List</Nav.Link>
			</LinkContainer>
		</Nav>
		)
}



export default ProductSteps