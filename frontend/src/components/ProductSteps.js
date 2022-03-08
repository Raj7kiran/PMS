import React from 'react'
import { Nav } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import './StepsTabs.css'


const ProductSteps = () => {

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	return(
		<Nav className='navtabmain' style={{margin:'90px 0 20px 0'}} variant="tabs" >
		{
			userInfo.isClientAdmin && (
					<LinkContainer className='navtab'  to='/products' >
						<Nav.Link >Add Product</Nav.Link>
					</LinkContainer>
				)
		}
		  	
			<LinkContainer to='/productlist'>
				<Nav.Link >Product List</Nav.Link>
			</LinkContainer>
		</Nav>
		)
}



export default ProductSteps