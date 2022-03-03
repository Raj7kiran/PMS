import React, {useState} from 'react'
// import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import '../NewHeaderStyle.css'

const NewHeader = () => {
  const dispatch = useDispatch()
  const [hambVal, setHambVal] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const hamb = (e) => {
    console.log('clicked')
    if(hambVal == false) {
      setHambVal(true)
    } else{
      setHambVal(false)
    }
  }



  return (
    
         <body className={`${ hambVal == true ? 'body-pd' : ''}`} id="body-pd">
         {
                userInfo && userInfo.isClientAdmin ? (
                      <>
                          <header className={`${ hambVal == true ? 'body-pd' : ''} header`} id="header">
                              <div className={`header_toggle`}> 
                                  <i onClick={e => hamb(e)} className={`${ hambVal == true ? 'bx-x' : ''} bx bx-menu`} id="header-toggle"></i> 
                              </div>
                            
                              <div className="header_img"> 
                                  {userInfo.firstName}
                              </div>
                          </header>
                          <div className={`${ hambVal == true ? 'show' : ''} l-navbar`} id="nav-bar">
                              <nav className="nav">
                                  <div> 
                                      <a href="/profile" className="nav_logo">
                                        <i class='bx bxs-user-rectangle nav_logo-icon'></i>  
                                        <span className="nav_logo-name">Profile</span> 
                                      </a>
                                      <div className="nav_list"> 
                                        <a href="/userlist" className="nav_link">
                                          <i class="nav_icon">US</i>  
                                          <span className="nav_name">Users</span> 
                                        </a> 
                                        <a href="/manufacturers" className="nav_link"> 
                                          <i class="nav_icon">MA</i> 
                                          <span className="nav_name">Manufacturers</span> 
                                        </a> 
                                        <a href="/supplier" className="nav_link">
                                            <i class="nav_icon">SU</i>  
                                          <span className="nav_name">Supplier</span> 
                                        </a> 
                                        <a href="/products" className="nav_link">
                                            <i class="nav_icon">PR</i>  
                                          <span className="nav_name">Products</span> 
                                        </a> 
                                        <a href="/intent" className="nav_link">
                                            <i class="nav_icon">IN</i>  
                                          <span className="nav_name">Intent</span> 
                                        </a> 
                                        <a href="/inbound" className="nav_link"> 
                                            <i class="nav_icon">IB</i> 
                                          <span className="nav_name">Inbound</span> 
                                        </a> 
                                      </div>
                                  </div> 
                                  <a href="#" className="nav_link" onClick={logoutHandler}> 
                                    <i class='bx bx-log-out nav_icon'></i>
                                    <span className="nav_name">SignOut</span> 
                                  </a>
                              </nav>
                          </div>
                      </>
                  ) : ''
              }
                
            {/*<!--Container Main start-->*/}
            {/*<div className="height-100 bg-light">
                <h4>Main Components</h4>
            </div>*/}
            {/*<!--Container Main end-->*/}
        </body>
   
  )
}

export default NewHeader