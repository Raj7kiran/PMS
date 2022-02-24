import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'
import { packageListReducer, packageCreateReducer, packageDeleteReducer, 
		 clientListReducer, clientCreateReducer, clientDeleteReducer } from './reducers/adminReducers'
import { manufacturerListReducer, manufacturerCreateReducer, manufacturerDeleteReducer,
		 manufacturerDetailsReducer,manufacturerUpdateReducer,
		 supplierListReducer, supplierCreateReducer, supplierDeleteReducer,supplierDetailsReducer,
		 supplierUpdateReducer,
		 productListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer,
		 productUpdateReducer,
	 } from './reducers/otherReducers'
import { userListReducer, userDetailsReducer,userUpdateProfileReducer, userUpdateReducer, userDeleteReducer,doctorListReducer } from './reducers/userReducers'
import { countryListReducer, stateListReducer, cityListReducer } from './reducers/dropReducers'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderDeleteReducer,
		 orderApproveReducer, orderFinanceApproveReducer, orderFinalApproveReducer, orderRejectReducer
		  } from './reducers/orderReducers'
import { saleCreateReducer, saleListMyReducer, saleDetailsReducer, saleListReducer, saleDeleteReducer,
		 saleSubmitReducer, saleSubmittedListReducer, salePayReducer, saleBillReducer, saleBilledListReducer,
		 saleCollectReducer, saleCollectedListReducer, saleDeliverReducer, 
		 saleDeliveredListReducer, sendBackReducer, saleRejectReducer, saleCardPayReducer
		} from './reducers/saleReducers'
import { inboundCreateReducer, inboundListReducer } from './reducers/inboundReducers'


const reducer = combineReducers({
	packageList: packageListReducer,
	packageCreate: packageCreateReducer,
	packageDelete:packageDeleteReducer,
	userLogin: userLoginReducer,
	clientList : clientListReducer,
	clientCreate: clientCreateReducer,
	clientDelete:clientDeleteReducer,
	userList: userListReducer,
	countryList: countryListReducer,
	stateList: stateListReducer,
	cityList: cityListReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	userDelete:userDeleteReducer,
	doctorList: doctorListReducer,
	manufacturerList: manufacturerListReducer,
	manufacturerCreate: manufacturerCreateReducer,
	manufacturerDelete: manufacturerDeleteReducer,
	manufacturerDetails:manufacturerDetailsReducer,
	manufacturerUpdate:manufacturerUpdateReducer,
	supplierList: supplierListReducer,
	supplierCreate: supplierCreateReducer,
	supplierDelete: supplierDeleteReducer,
	supplierDetails:supplierDetailsReducer,
	supplierUpdate:supplierUpdateReducer,
	productList: productListReducer,
	productCreate: productCreateReducer,
	productDelete: productDeleteReducer,
	productDetails:productDetailsReducer,
	productUpdate:productUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
	orderDelete:orderDeleteReducer,
	orderApprove: orderApproveReducer,
	orderFinanceApprove: orderFinanceApproveReducer,
	orderFinalApprove: orderFinalApproveReducer,
	orderReject:orderRejectReducer,
	saleCreate: saleCreateReducer,
	saleListMy: saleListMyReducer,
	saleDetails: saleDetailsReducer,
	saleList: saleListReducer,
	saleDelete: saleDeleteReducer,
	saleSubmit: saleSubmitReducer,
	saleSubmittedList: saleSubmittedListReducer,
	salePay: salePayReducer,
	saleBill: saleBillReducer,
	saleBilledList: saleBilledListReducer,
	saleCollect: saleCollectReducer,
	saleCollectedList: saleCollectedListReducer,
	saleDeliver: saleDeliverReducer,
	saleDeliveredList: saleDeliveredListReducer,
	sendBack: sendBackReducer,
	saleReject: saleRejectReducer,
	saleCardPay: saleCardPayReducer,
	inboundCreate: inboundCreateReducer,
	inboundList: inboundListReducer
})


const userInfoFromStorage = localStorage.getItem('userInfo')
							 ? JSON.parse(localStorage.getItem('userInfo'))
							 : null


const initialState ={ userLogin: { userInfo: userInfoFromStorage } }

const middleware =[thunk]

const store = createStore(
		reducer,
		initialState,
		composeWithDevTools(applyMiddleware(...middleware))
	)


export default store