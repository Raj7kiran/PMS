import React from 'react'
import { Nav } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'


const InboundSteps = () => {

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	return(
		<Nav style={{margin:'90px 0 20px 0'}}  variant="tabs" >
		{/*{
			userInfo.isClientAdmin && (*/}
					<LinkContainer to='/inbound' >
						<Nav.Link>Inbound Screen</Nav.Link>
					</LinkContainer>
				{/*)
		}*/}
		  	
			<LinkContainer to='/inbound/status'>
				<Nav.Link>Inbound Status</Nav.Link>
			</LinkContainer>
		</Nav>
		)
}



export default InboundSteps