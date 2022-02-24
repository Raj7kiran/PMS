import React from 'react'
import {Switch, BrowserRouter as Router, Routes, Route, Fragment } from 'react-router-dom';
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
import SupplierScreen from './screens/SupplierScreen'
import SupplierEditScreen from './screens/SupplierEditScreen'
import ProductScreen from './screens/ProductScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import PurchaseOrderScreen from './screens/PurchaseOrderScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen'
import PurchaseOrderEditScreen from './screens/PurchaseOrderEditScreen'
import OrderScreen from './screens/OrderScreen'
import PurchaseOrderStatusScreen from './screens/PurchaseOrderStatusScreen'
import VerifyOrderScreen from './screens/VerifyOrderScreen'
import PurchaseOrderListScreen from './screens/PurchaseOrderListScreen'
import ApprovedPurchaseOrderList from './screens/ApprovedPurchaseOrderList'
import VerifyApprovedOrderScreen from './screens/VerifyApprovedOrderScreen'
import VerifyFinanceApprovedOrderScreen from './screens/VerifyFinanceApprovedOrderScreen'
import FinanceApprovalOrderListScreen from './screens/FinanceApprovalOrderListScreen'
import SaleScreen from './screens/SaleScreen'
import SaleDetailsScreen from './screens/SaleDetailsScreen'
import SalesReturnScreen from './screens/SalesReturnScreen'
import SalesOrderListScreen from './screens/SalesOrderListScreen'
import BilledOrderListScreen from './screens/BilledOrderListScreen'
import CollectedOrderListScreen from './screens/CollectedOrderListScreen'
import MySalesScreen from './screens/MySalesScreen'
import CollectorScreen from './screens/CollectorScreen'
import BillerScreen from './screens/BillerScreen'
import DeliverScreen from './screens/DeliverScreen'
import AllSaleScreen from './screens/AllSaleScreen'
import Interview from './screens/Interview'
import InboundScreen from './screens/InboundScreen'
import InboundStatusScreen from './screens/InboundStatusScreen'
import IntentScreen from './screens/IntentScreen'
import IntentOrderListScreen from './screens/IntentOrderListScreen'
// import OtpVerification from "./components/OtpVerification";
// import ResetPassword from "./components/ResetPassword";
// import ForgotPassword from "./components/ForgotPassword";
// import LoginSuccessful from "./components/LoginSuccessful";
// import LoginPage from "./components/LoginPage";
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
            <Route path='/products' element={<ProductScreen />} exact />
            <Route path='/productlist' element={<ProductListScreen />} exact />
            <Route path='/products/:id/edit' element={<ProductEditScreen />} exact />
            <Route path='/supplier/:id/edit' element={<SupplierEditScreen />} exact />
            <Route path='/order' element={<OrderScreen />} exact />
            <Route path='/order/purchase' element={<PurchaseOrderScreen />} exact />
            <Route path='/order/:id' element={<OrderDetailsScreen />} exact />
            <Route path='/order/:id/edit' element={<PurchaseOrderEditScreen />} exact />
            <Route path='/order/:id/approve' element={<VerifyOrderScreen />} exact />
            <Route path='/order/approved' element={<ApprovedPurchaseOrderList />} exact />
            <Route path='/order/approved/:id' element={<VerifyApprovedOrderScreen />} exact />
            <Route path='/order/approved/finance' element={<FinanceApprovalOrderListScreen />} exact />
            <Route path='/order/approved/finance/:id' element={<VerifyFinanceApprovedOrderScreen />} exact />
            <Route path='/order/status' element={<PurchaseOrderStatusScreen />} exact />
            <Route path='/order/list' element={<PurchaseOrderListScreen />} exact />
            <Route path='/sale' element={<SaleScreen />} exact />            
            <Route path='/mysales' element={<MySalesScreen />} exact />
            <Route path='/sale/list' element={<SalesOrderListScreen />} exact />
            <Route path='/sale/billed' element={<BilledOrderListScreen />} exact />
            <Route path='/sale/collected' element={<CollectedOrderListScreen />} exact />
            <Route path='/sale/:id' element={<SaleDetailsScreen />} exact />
            <Route path='/sale/:id/biller' element={<BillerScreen />} exact />
            <Route path='/sale/:id/collector' element={<CollectorScreen />} exact />
            <Route path='/sale/:id/deliver' element={<DeliverScreen />} exact />
            <Route path='/sales' element={<AllSaleScreen />} exact />
            <Route path='/sales/return' element={<SalesReturnScreen />} exact />
            <Route path='/Interview' element={<Interview />} exact />
            <Route path='/inbound' element={<InboundScreen />} exact/>
            <Route path='/inbound/status' element={<InboundStatusScreen />} exact/>
            <Route path='/intent' element={<IntentScreen />} exact/>
            <Route path='/intent/list' element={<IntentOrderListScreen />} exact/>
        </Routes>
          
        </Container>
        </main>
      <Footer />
    </Router>
  )
}

export default App;


// const hmsIconScreen1Data = {
//     pathContainer: "/img/path-36-1-1@1x.png",
// };

// const otpVerificationData = {
//     bottomSemi: "/img/path-128@1x.png",
//     topQuarter: "/img/path-127@1x.png",
//     verify: "VERIFY",
//     path147: "/img/path-147@1x.png",
//     path148: "/img/path-148@1x.png",
//     path149: "/img/path-149@1x.png",
//     path150: "/img/path-150@1x.png",
//     path151: "/img/path-151@1x.png",
//     path152: "/img/path-152-1@1x.png",
//     path153: "/img/path-153@1x.png",
//     path154: "/img/path-154-1@1x.png",
//     path155: "/img/path-155-1@1x.png",
//     otpVerification: "/img/otp-verification@1x.png",
//     youWillGetAOtpViaMobileNumber: "You will get a OTP via Mobile Number",
//     phone: "+91 9876543210",
//     path156: "/img/path-156-1@1x.png",
//     path157: "/img/path-157-1@1x.png",
//     enterOtp: "Enter OTP",
//     didnTReceivedOtp: "Didn't received OTP?",
//     resendOtp: "Resend OTP",
//     inputType1: "number",
//     inputPlaceholder1: "0     ",
//     inputType2: "number",
//     inputPlaceholder2: "0     ",
//     inputType3: "number",
//     inputPlaceholder3: "0     ",
//     inputType4: "number",
//     inputPlaceholder4: "0     ",
//     cancel: "Cancel",
//     hmsIconScreenProps: hmsIconScreen1Data,
// };

// const hmsIconScreen2Data = {
//     pathContainer: "/img/path-36-1-1@1x.png",
// };

// const pswdIcon2Data = {
//     className: "pswd-icon-1",
// };

// const resetPasswordData = {
//     bottomSemi: "/img/path-128@1x.png",
//     topQuarter: "/img/path-127@1x.png",
//     submit: "SUBMIT",
//     inputType1: "email",
//     inputPlaceholder1: "Confirm New Password",
//     inputType2: "number",
//     inputPlaceholder2: "New Password",
//     path143: "/img/path-143@1x.png",
//     path144: "/img/path-144@1x.png",
//     path145: "/img/path-145@1x.png",
//     path146: "/img/path-146@1x.png",
//     resetPassword: "/img/reset-password@1x.png",
//     inputType3: "password",
//     inputPlaceholder3: "show",
//     inputType4: "password",
//     inputPlaceholder4: "show",
//     cancel: "Cancel",
//     hmsIconScreenProps: hmsIconScreen2Data,
//     pswdIconProps: pswdIcon2Data,
// };

// const hmsIconScreen3Data = {
//     pathContainer: "/img/path-36-1-1@1x.png",
// };

// const or2Data = {
//     className: "or-2",
// };

// const forgotPasswordData = {
//     bottomSemi: "/img/path-128@1x.png",
//     topQuarter: "/img/path-127@1x.png",
//     sendOtp: "SEND OTP",
//     path127: "/img/path-127@1x.png",
//     path128: "/img/path-128@1x.png",
//     path129: "/img/path-129@1x.png",
//     path130: "/img/path-130@1x.png",
//     inputType1: "email",
//     inputPlaceholder1: "Enter Email                                                ",
//     padlock: "/img/padlock-1@1x.png",
//     inputType2: "number",
//     inputPlaceholder2: "Enter Mobile Number                     ",
//     path131: "/img/path-131-1@1x.png",
//     path132: "/img/path-132@1x.png",
//     forgotPassword: "/img/forgot-password@1x.png",
//     cancel: "Cancel",
//     hmsIconScreenProps: hmsIconScreen3Data,
//     orProps: or2Data,
// };

// const hmsIconScreen4Data = {
//     pathContainer: "/img/path-36-1-1@1x.png",
// };

// const loginSuccessfulData = {
//     bottomSemi: "/img/path-128@1x.png",
//     topQuarter: "/img/path-127@1x.png",
//     path124: "/img/path-124@1x.png",
//     path125: "/img/path-125-1@1x.png",
//     loginSuccessful: "/img/login-successful-@1x.png",
//     logOut: "Log Out",
//     hmsIconScreenProps: hmsIconScreen4Data,
// };

// const hmsIconScreen5Data = {
//     pathContainer: "/img/path-36-1-1@1x.png",
// };

// const pswdIcon3Data = {
//     className: "pswd-icon-2",
// };

// const loginPageData = {
//     bottomSemi: "/img/path-128@1x.png",
//     topQuarter: "/img/path-127@1x.png",
//     login: "LOGIN",
//     path124: "/img/path-124@1x.png",
//     path125: "/img/path-125-1@1x.png",
//     logIn: "/img/log-in-1@1x.png",
//     inputType1: "text",
//     inputPlaceholder1: "Username                                              ",
//     user_1_: "/img/user--1-@1x.png",
//     inputType2: "password",
//     inputPlaceholder2: "Password                                          ",
//     inputType3: "password",
//     inputPlaceholder3: "show",
//     forgotPassword: "/img/forgot-password-@1x.png",
//     hmsIconScreenProps: hmsIconScreen5Data,
//     pswdIconProps: pswdIcon3Data,
// };
