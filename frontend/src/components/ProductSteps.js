import React from 'react'
import { Nav } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'


const ProductSteps = () => {

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	return(
		<Nav className='my-3' variant="tabs" >
		{
			userInfo.isClientAdmin && (
					<LinkContainer to='/products' >
						<Nav.Link>Add Product</Nav.Link>
					</LinkContainer>
				)
		}
		  	
			<LinkContainer to='/productlist'>
				<Nav.Link>Product List</Nav.Link>
			</LinkContainer>
		</Nav>
		)
}



export default ProductSteps