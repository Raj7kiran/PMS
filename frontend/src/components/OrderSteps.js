import React from 'react'
import { Nav } from 'react-bootstrap'
import{ LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'


const OrderSteps = () => {

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin


	return(
		<Nav className='my-3' variant="tabs" >
			{
				(userInfo.role === '1' || userInfo.role === '3') && (
						<>
							<LinkContainer to='/order/purchase' >
								<Nav.Link>Purchase Order</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/order/status'>
								<Nav.Link>My orders</Nav.Link>
							</LinkContainer>
						</>
					)
			}
			{
				(userInfo.role === '2' || userInfo.role === '3') && (
						<>
							<LinkContainer to='/order/list' >
									<Nav.Link>Purchase Order List</Nav.Link>
							</LinkContainer>
						</>
					)
			}
			{
				(userInfo.role === '4' || userInfo.role === '6') && (
						<>
							<LinkContainer to='/order/approved'>
								<Nav.Link>Approved Order List</Nav.Link>
							</LinkContainer>
						</>
					)
			}
			{
				(userInfo.role === '5' || userInfo.role === '6') && (
						<>
							<LinkContainer to='/order/approved/finance'>
								<Nav.Link>Finance Approval Order list</Nav.Link>
							</LinkContainer>
						</>
					)
			}
		</Nav>
		)
}



export default OrderSteps