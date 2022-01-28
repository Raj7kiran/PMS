import React from 'react'
import { Nav } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'


const SaleSteps = () => {

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	return(
		<Nav className='my-3' variant="tabs" >
			
			<LinkContainer to='/sale' >
				<Nav.Link>Sale/Prescription</Nav.Link>
			</LinkContainer>
			<LinkContainer to='/mysales'>
				<Nav.Link>My Sale/Prescription</Nav.Link>
			</LinkContainer>
						
		</Nav>
		)
}



export default SaleSteps