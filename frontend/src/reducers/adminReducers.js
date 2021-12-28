import { PACKAGE_LIST_REQUEST,PACKAGE_LIST_SUCCESS, PACKAGE_LIST_FAIL,
		 		 PACKAGE_CREATE_REQUEST,PACKAGE_CREATE_SUCCESS, PACKAGE_CREATE_FAIL, PACKAGE_CREATE_RESET,
		 		 PACKAGE_DELETE_REQUEST,PACKAGE_DELETE_SUCCESS, PACKAGE_DELETE_FAIL,
		 		 CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_LIST_RESET,
		 		 CLIENT_CREATE_REQUEST, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_FAIL, CLIENT_CREATE_RESET,
		 		 CLIENT_DELETE_REQUEST,CLIENT_DELETE_SUCCESS, CLIENT_DELETE_FAIL,
		} from '../constants/adminConstants'


export const packageListReducer = (state = { packages: [] }, action) => {
	switch(action.type) {
		case PACKAGE_LIST_REQUEST:
			return { loading:true, packages: [] }
		case PACKAGE_LIST_SUCCESS:
			return { loading:false, packages: action.payload, success:true }
		case PACKAGE_LIST_FAIL:
			return { loading:false, error: action.payload }
		default:
			return state
	}
}

export const packageCreateReducer = (state = {}, action) => {
	switch(action.type) {
		case PACKAGE_CREATE_REQUEST:
			return { loading:true }
		case PACKAGE_CREATE_SUCCESS:
			return { loading:false, success: true, package: action.payload }
		case PACKAGE_CREATE_FAIL:
			return { loading:false, error: action.payload }
		case PACKAGE_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const packageDeleteReducer = (state = {}, action) => {
	switch(action.type) {
		case PACKAGE_DELETE_REQUEST:
			return { loading:true }
		case PACKAGE_DELETE_SUCCESS:
			return { loading:false, success: true }
		case PACKAGE_DELETE_FAIL:
			return { loading:false, error: action.payload }
		default:
			return state
	}
}


// ------------------clients--------------------
export const clientListReducer = (state = { clients:[] }, action) => {
  switch (action.type) {
    case CLIENT_LIST_REQUEST:
      return { loading: true, clients:[] }
    case CLIENT_LIST_SUCCESS:
      return { loading: false,  clients: action.payload }
    case CLIENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CLIENT_LIST_RESET:
      return { clients: [] }
    default:
      return state
  }
}


export const clientCreateReducer = (state={}, action) => {
	switch(action.type){
		case CLIENT_CREATE_REQUEST:
			return { loading: true }
		case CLIENT_CREATE_SUCCESS:
			return { loading: false, success: true, user: action.payload }
		case CLIENT_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case CLIENT_CREATE_RESET:
			return {}
		default:
			return state
	}
}


export const clientDeleteReducer = (state = {}, action) => {
	switch(action.type) {
		case CLIENT_DELETE_REQUEST:
			return { loading:true }
		case CLIENT_DELETE_SUCCESS:
			return { loading:false, success: true }
		case CLIENT_DELETE_FAIL:
			return { loading:false, error: action.payload }
		default:
			return state
	}
}