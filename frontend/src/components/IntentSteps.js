import React from 'react'
import { Nav } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'


const IntentSteps = () => {

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	return(
		<Nav className='my-3' variant="tabs" >
		{/*{
			userInfo.isClientAdmin && (*/}
					<LinkContainer to='/intent' >
						<Nav.Link>Intent</Nav.Link>
					</LinkContainer>
				{/*)
		}*/}
		  	
			<LinkContainer to='/intent/list'>
				<Nav.Link>Intent Order List</Nav.Link>
			</LinkContainer>
		</Nav>
		)
}



export default IntentSteps