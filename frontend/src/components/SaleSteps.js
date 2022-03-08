import React from 'react'
import { Nav } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'


const SaleSteps = () => {

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	return(
		<Nav style={{margin:'90px 0 20px 0'}} variant="tabs" >
			{
				(userInfo.role === '7' || userInfo.role === '9') && (
					<>
						<LinkContainer to='/sale' >
							<Nav.Link>Sale/Prescription</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/mysales'>
							<Nav.Link>My Sale/Prescription</Nav.Link>
						</LinkContainer>
					</>
				)
			}
			{
				(userInfo.role === '9') && (				
					<LinkContainer to='/sale/list'>
						<Nav.Link>Sales Order List</Nav.Link>
					</LinkContainer>				
				)
			}
			{
				(userInfo.role === '10') && (				
					<LinkContainer to='/sale/billed'>
						<Nav.Link>Billed Order List</Nav.Link>
					</LinkContainer>				
				)
			}
			{
				(userInfo.role === '11') && (				
					<LinkContainer to='/sale/collected'>
					<Nav.Link>Collected Order List</Nav.Link>
				</LinkContainer>				
				)
			}	
			
		</Nav>
		)
}



export default SaleSteps