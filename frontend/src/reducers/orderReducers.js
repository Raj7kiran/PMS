import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,ORDER_CREATE_RESET,
		 ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
		 ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_RESET,
		 ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
		 ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_RESET,
		 ORDER_APPROVE_REQUEST, ORDER_APPROVE_SUCCESS, ORDER_APPROVE_FAIL, ORDER_APPROVE_RESET,
		 ORDER_FINANCEAPPROVE_REQUEST, ORDER_FINANCEAPPROVE_SUCCESS, ORDER_FINANCEAPPROVE_FAIL, ORDER_FINANCEAPPROVE_RESET,
		 ORDER_FINALAPPROVE_REQUEST, ORDER_FINALAPPROVE_SUCCESS, ORDER_FINALAPPROVE_FAIL, ORDER_FINALAPPROVE_RESET,
		 ORDER_REJECT_REQUEST, ORDER_REJECT_SUCCESS, ORDER_REJECT_FAIL, ORDER_REJECT_RESET,
	 } from '../constants/orderConstants'


export const orderCreateReducer = (state={}, action) => {
	switch(action.type) {
		case ORDER_CREATE_REQUEST :
			return {
				loading: true
			}

		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order : action.payload
			}

		case ORDER_CREATE_FAIL:
			return{
				loading: false,
				error: action.payload
			}		

		case ORDER_CREATE_RESET:
     		 return {}

		default:
			return state
	}
}


export const orderDetailsReducer = (state={ loading:true, order:{ } }, action) => {
	switch(action.type) {
		case ORDER_DETAILS_REQUEST :
			return {...state,loading: true}

		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order : action.payload
			}

		case ORDER_DETAILS_FAIL:
			return{
				loading: false,
				error: action.payload
			}		

		default:
			return state
	}
}

export const orderListMyReducer = (state ={orders:[]}, action) => {
	switch(action.type) {
		case ORDER_LIST_MY_REQUEST:
			return {
				loading: true, orders: []
			}

		case ORDER_LIST_MY_SUCCESS:
			return {
				loading: false,
				orders: action.payload
			}

		case ORDER_LIST_MY_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case ORDER_LIST_MY_RESET:
			return { orders: []}

		default:
			return state
	}
}

export const orderListReducer = (state ={orders:[]}, action) => {
	switch(action.type) {
		case ORDER_LIST_REQUEST:
			return {
				loading: true, orders: []
			}

		case ORDER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload
			}

		case ORDER_LIST_FAIL:
			return{
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}

export const orderDeleteReducer = ( state={}, action ) => {
	switch(action.type){
		case ORDER_DELETE_REQUEST:
			return{ loading: true }
		case ORDER_DELETE_SUCCESS:
			return { loading: false, success: true }
		case ORDER_DELETE_FAIL:
			return { loading: false, error: action.payload }
		case ORDER_DELETE_RESET:
			return {}
		default:
			return state
	}
}

export const orderApproveReducer = (state={}, action) => {
	switch(action.type) {
		case ORDER_APPROVE_REQUEST :
			return {
				loading: true
			}

		case ORDER_APPROVE_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case ORDER_APPROVE_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case ORDER_APPROVE_RESET:
			return{}		

		default:
			return state
	}
}

export const orderFinanceApproveReducer = (state={}, action) => {
	switch(action.type) {
		case ORDER_FINANCEAPPROVE_REQUEST :
			return {
				loading: true
			}

		case ORDER_FINANCEAPPROVE_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case ORDER_FINANCEAPPROVE_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case ORDER_FINANCEAPPROVE_RESET:
			return{}		

		default:
			return state
	}
}

export const orderFinalApproveReducer = (state={}, action) => {
	switch(action.type) {
		case ORDER_FINALAPPROVE_REQUEST :
			return {
				loading: true
			}

		case ORDER_FINALAPPROVE_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case ORDER_FINALAPPROVE_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case ORDER_FINALAPPROVE_RESET:
			return{}		

		default:
			return state
	}
}

export const orderRejectReducer = (state={}, action) => {
	switch(action.type) {
		case ORDER_REJECT_REQUEST :
			return {
				loading: true
			}

		case ORDER_REJECT_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case ORDER_REJECT_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case ORDER_REJECT_RESET:
			return{}		

		default:
			return state
	}
}
