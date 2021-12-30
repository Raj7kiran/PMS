import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'
import { packageListReducer, packageCreateReducer, packageDeleteReducer, 
		 clientListReducer, clientCreateReducer, clientDeleteReducer } from './reducers/adminReducers'
import { manufacturerListReducer, manufacturerCreateReducer, manufacturerDeleteReducer,
		 manufacturerDetailsReducer,manufacturerUpdateReducer,
		 supplierListReducer, supplierCreateReducer, supplierDeleteReducer,supplierDetailsReducer
	 } from './reducers/otherReducers'
import { userListReducer, userDetailsReducer,userUpdateProfileReducer, userUpdateReducer, userDeleteReducer } from './reducers/userReducers'
import { countryListReducer, stateListReducer, cityListReducer } from './reducers/dropReducers'





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
	manufacturerList: manufacturerListReducer,
	manufacturerCreate: manufacturerCreateReducer,
	manufacturerDelete: manufacturerDeleteReducer,
	manufacturerDetails:manufacturerDetailsReducer,
	manufacturerUpdate:manufacturerUpdateReducer,
	supplierList: supplierListReducer,
	supplierCreate: supplierCreateReducer,
	supplierDelete: supplierDeleteReducer,
	supplierDetails:supplierDetailsReducer
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