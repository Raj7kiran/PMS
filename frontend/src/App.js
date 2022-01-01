import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen'
// import AnotherLoginScreen from './screens/AnotherLoginScreen'
// import NewLoginScreen from './screens/NewLoginScreen'
import PackageScreen from './screens/PackageScreen'
import ClientListScreen from './screens/ClientListScreen'
import ClientEditScreen from './screens/ClientEditScreen'
import AddClientScreen from './screens/AddClientScreen'
// import NewAddClientScreen from './screens/NewAddClientScreen'
// import NewAddClientScreen2 from './screens/NewAddClientScreen2'
import UserListScreen from './screens/UserListScreen'
import ProfileScreen from './screens/ProfileScreen'
import ManufacturerScreen from './screens/ManufacturerScreen'
import ManufacturerEditScreen from './screens/ManufacturerEditScreen'
import SupplierEditScreen from './screens/SupplierEditScreen'
import SupplierScreen from './screens/SupplierScreen'
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
            {/*<Route path='/' element={<AnotherLoginScreen />} exact />*/}
            {/*<Route path='/' element={<NewLoginScreen />} exact />*/}
            <Route path='/admin/package' element={<PackageScreen />} exact />
            <Route path='/admin/clientlist' element={<ClientListScreen />} exact />
            <Route path='/admin/user/:id/edit' element={<ClientEditScreen />} exact />
            <Route path='/user/:id/edit' element={<ClientEditScreen />} exact />
            <Route path='/userlist' element={<UserListScreen />} exact />
            <Route path='/profile' element={<ProfileScreen />} exact />
            <Route path='/addUsers' element={<AddClientScreen />} exact />
            <Route path='/manufacturers' element={<ManufacturerScreen />} exact />
            <Route path='/manufacturers/:id/edit' element={<ManufacturerEditScreen />} exact />
            <Route path='/supplier' element={<SupplierScreen />} exact />
            <Route path='/supplier/:id/edit' element={<SupplierEditScreen />} exact />
            {/*<Route path='/addUsers' element={<NewAddClientScreen2 />} exact />*/}
          </Routes>
        </Container>
        </main>
      <Footer />
    </Router>
  )
}

export default App;
