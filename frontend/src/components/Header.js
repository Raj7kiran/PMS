import React from 'react'
// import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar className='chNav'  variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><p className='naBrand mt-3'>PMS</p></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
           <Nav className='ml-auto'>
              { userInfo && userInfo.isClientAdmin ? (
                  <NavDropdown title={userInfo.firstName} id='username'>
                      <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/userlist'>
                          <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/manufacturers'>
                          <NavDropdown.Item>Manufacturers</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/supplier'>
                          <NavDropdown.Item>Supplier</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/products'>
                          <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/intent'>
                          <NavDropdown.Item>Intent</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/inbound'>
                          <NavDropdown.Item>Inbound</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler} >
                        Logout
                      </NavDropdown.Item>                      
                  </NavDropdown>
                ) : userInfo && userInfo.isAdmin ? (
                       <NavDropdown title={userInfo.firstName} id='username'>
                          <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='admin/clientlist'>
                              <NavDropdown.Item>Clients</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/package'>
                              <NavDropdown.Item>Package</NavDropdown.Item>
                          </LinkContainer>  
                          <NavDropdown.Item onClick={logoutHandler} >
                            Logout
                          </NavDropdown.Item>                
                      </NavDropdown>
                ) : userInfo && (
                    <NavDropdown title={userInfo.firstName} id='username'>
                      <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/productlist'>
                          <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/order'>
                          <NavDropdown.Item>Order</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/sales'>
                          <NavDropdown.Item>Sale</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler} >
                        Logout
                      </NavDropdown.Item>                      
                  </NavDropdown>

                )  }   
                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header