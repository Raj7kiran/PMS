import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'
import { packageListReducer, packageCreateReducer, clientListReducer, clientCreateReducer } from './reducers/adminReducers'
import { userListReducer, userDetailsReducer,userUpdateProfileReducer } from './reducers/userReducers'
import { countryListReducer, stateListReducer, cityListReducer } from './reducers/dropReducers'





const reducer = combineReducers({
	packageList: packageListReducer,
	packageCreate: packageCreateReducer,
	userLogin: userLoginReducer,
	clientList : clientListReducer,
	clientCreate: clientCreateReducer,
	userList: userListReducer,
	countryList: countryListReducer,
	stateList: stateListReducer,
	cityList: cityListReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
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