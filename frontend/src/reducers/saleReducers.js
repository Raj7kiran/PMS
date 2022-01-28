import { SALE_CREATE_REQUEST, SALE_CREATE_SUCCESS, SALE_CREATE_FAIL,SALE_CREATE_RESET,
		 SALE_LIST_MY_REQUEST, SALE_LIST_MY_SUCCESS, SALE_LIST_MY_FAIL, SALE_LIST_MY_RESET,
		 SALE_DETAILS_REQUEST, SALE_DETAILS_SUCCESS, SALE_DETAILS_FAIL,
		 SALE_LIST_REQUEST, SALE_LIST_SUCCESS, SALE_LIST_FAIL,
		 SALE_DELETE_REQUEST, SALE_DELETE_SUCCESS, SALE_DELETE_FAIL, SALE_DELETE_RESET,
		 SALE_SUBMIT_REQUEST, SALE_SUBMIT_SUCCESS, SALE_SUBMIT_FAIL, SALE_SUBMIT_RESET
	} from '../constants/saleConstants'


export const saleCreateReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_CREATE_REQUEST :
			return {
				loading: true
			}

		case SALE_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				sale : action.payload
			}

		case SALE_CREATE_FAIL:
			return{
				loading: false,
				error: action.payload
			}		

		case SALE_CREATE_RESET:
     		 return {}

		default:
			return state
	}
}

export const saleListMyReducer = (state ={sales:[]}, action) => {
	switch(action.type) {
		case SALE_LIST_MY_REQUEST:
			return {
				loading: true, sales: []
			}

		case SALE_LIST_MY_SUCCESS:
			return {
				loading: false,
				sales: action.payload
			}

		case SALE_LIST_MY_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_LIST_MY_RESET:
			return { sales: []}

		default:
			return state
	}
}


export const saleDetailsReducer = (state={ loading:true, sale:{ } }, action) => {
	switch(action.type) {
		case SALE_DETAILS_REQUEST :
			return {...state,loading: true}

		case SALE_DETAILS_SUCCESS:
			return {
				loading: false,
				sale : action.payload
			}

		case SALE_DETAILS_FAIL:
			return{
				loading: false,
				error: action.payload
			}		

		default:
			return state
	}
}


export const saleListReducer = (state ={sales:[]}, action) => {
	switch(action.type) {
		case SALE_LIST_REQUEST:
			return {
				loading: true, sales: []
			}

		case SALE_LIST_SUCCESS:
			return {
				loading: false,
				sales: action.payload
			}

		case SALE_LIST_FAIL:
			return{
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}

export const saleDeleteReducer = ( state={}, action ) => {
	switch(action.type){
		case SALE_DELETE_REQUEST:
			return{ loading: true }
		case SALE_DELETE_SUCCESS:
			return { loading: false, success: true }
		case SALE_DELETE_FAIL:
			return { loading: false, error: action.payload }
		case SALE_DELETE_RESET:
			return {}
		default:
			return state
	}
}

export const saleSubmitReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_SUBMIT_REQUEST :
			return {
				loading: true
			}

		case SALE_SUBMIT_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case SALE_SUBMIT_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_SUBMIT_RESET:
			return{}		

		default:
			return state
	}
}