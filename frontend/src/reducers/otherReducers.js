import { 
	MANUFACTURER_DETAILS_REQUEST, MANUFACTURER_DETAILS_SUCCESS, MANUFACTURER_DETAILS_FAIL,
	MANUFACTURER_LIST_REQUEST, MANUFACTURER_LIST_SUCCESS, MANUFACTURER_LIST_FAIL,
	MANUFACTURER_CREATE_REQUEST, MANUFACTURER_CREATE_SUCCESS, MANUFACTURER_CREATE_FAIL, MANUFACTURER_CREATE_RESET,
	MANUFACTURER_DELETE_REQUEST ,MANUFACTURER_DELETE_SUCCESS ,MANUFACTURER_DELETE_FAIL,
	MANUFACTURER_UPDATE_REQUEST, MANUFACTURER_UPDATE_SUCCESS, MANUFACTURER_UPDATE_FAIL, MANUFACTURER_UPDATE_RESET,
	SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS, SUPPLIER_DETAILS_FAIL,
	SUPPLIER_LIST_REQUEST, SUPPLIER_LIST_SUCCESS, SUPPLIER_LIST_FAIL,
	SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_SUCCESS, SUPPLIER_CREATE_FAIL, SUPPLIER_CREATE_RESET,
	SUPPLIER_DELETE_REQUEST ,SUPPLIER_DELETE_SUCCESS ,SUPPLIER_DELETE_FAIL, SUPPLIER_DELETE_RESET		 
} from '../constants/otherConstants'


export const manufacturerListReducer = ( state={ manufacturers:[] }, action ) => {
	switch(action.type){
		case MANUFACTURER_LIST_REQUEST:
			return { loading: true, manufacturers:[] }
		case MANUFACTURER_LIST_SUCCESS:
		 	return { loading: false, manufacturers: action.payload }
		 case MANUFACTURER_LIST_FAIL:
		 	return { loading: false, error: action.payload }
		 default:
		 	return state
	}
}

export const manufacturerCreateReducer = (state={}, action) => {
	switch(action.type){
		case MANUFACTURER_CREATE_REQUEST:
			return { loading: true }
		case MANUFACTURER_CREATE_SUCCESS:
			return { loading: false, success: true, manufacturer: action.payload }
		case MANUFACTURER_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case MANUFACTURER_CREATE_RESET:
			return {}
		default:
			return state
	}
}


//delete manufacturer
export const manufacturerDeleteReducer = ( state={}, action ) => {
	switch(action.type){
		case MANUFACTURER_DELETE_REQUEST:
			return{ loading: true }
		case MANUFACTURER_DELETE_SUCCESS:
			return { loading: false, success: true }
		case MANUFACTURER_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state

	}
}

//get manufacturer by id
export const manufacturerDetailsReducer = (state = { manufacturer: {} }, action) => {
  switch (action.type) {
    case MANUFACTURER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case MANUFACTURER_DETAILS_SUCCESS:
      return { loading: false, manufacturer: action.payload }
    case MANUFACTURER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//update Manufacturer
export const manufacturerUpdateReducer = (state = { manufacturer: {} }, action) => {
  switch (action.type) {
    case MANUFACTURER_UPDATE_REQUEST:
      return { loading: true }
    case MANUFACTURER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case MANUFACTURER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case MANUFACTURER_UPDATE_RESET:
      return {
        manufacturer: {} 
      }

    default:
      return state
  }
}




// ---------------Supplier-----------------------

export const supplierListReducer = ( state={ suppliers:[] }, action ) => {
	switch(action.type){
		case SUPPLIER_LIST_REQUEST:
			return { loading: true, suppliers:[] }
		case SUPPLIER_LIST_SUCCESS:
		 	return { loading: false, suppliers: action.payload }
		 case SUPPLIER_LIST_FAIL:
		 	return { loading: false, error: action.payload }
		 default:
		 	return state
	}
}


export const supplierCreateReducer = (state={}, action) => {
	switch(action.type){
		case SUPPLIER_CREATE_REQUEST:
			return { loading: true }
		case SUPPLIER_CREATE_SUCCESS:
			return { loading: false, success: true, supplier: action.payload }
		case SUPPLIER_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case SUPPLIER_CREATE_RESET:
			return { }
		default:
			return state
	}
}

//delete supplier
export const supplierDeleteReducer = ( state={}, action ) => {
	switch(action.type){
		case SUPPLIER_DELETE_REQUEST:
			return{ loading: true }
		case SUPPLIER_DELETE_SUCCESS:
			return { loading: false, success: true }
		case SUPPLIER_DELETE_FAIL:
			return { loading: false, error: action.payload }
		case SUPPLIER_DELETE_RESET:
			return {}
		default:
			return state

	}
}

//get supplier by id
export const supplierDetailsReducer = (state = { supplier: {} }, action) => {
  switch (action.type) {
    case SUPPLIER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SUPPLIER_DETAILS_SUCCESS:
      return { loading: false, supplier: action.payload }
    case SUPPLIER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}