import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen'
import PackageScreen from './screens/PackageScreen'
import ClientListScreen from './screens/ClientListScreen'
import AddClientScreen from './screens/AddClientScreen'
import UserListScreen from './screens/UserListScreen'
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap'


const App = () => {
  return (
    <Router>
      <Header />
        <main className='py-3>'>
        <Container>
          <Routes>
            <Route path='/' element={<LoginScreen />} exact />
            <Route path='/admin/package' element={<PackageScreen />} exact />
            <Route path='/admin/clientlist' element={<ClientListScreen />} exact />
            <Route path='/userlist' element={<UserListScreen />} exact />
            <Route path='/addUsers' element={<AddClientScreen />} exact />
          </Routes>
        </Container>
        </main>
      <Footer />
    </Router>
  )
}

export default App;
