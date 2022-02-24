import { SALE_CREATE_REQUEST, SALE_CREATE_SUCCESS, SALE_CREATE_FAIL,SALE_CREATE_RESET,
		 SALE_LIST_MY_REQUEST, SALE_LIST_MY_SUCCESS, SALE_LIST_MY_FAIL, SALE_LIST_MY_RESET,
		 SALE_DETAILS_REQUEST, SALE_DETAILS_SUCCESS, SALE_DETAILS_FAIL,
		 SALE_LIST_REQUEST, SALE_LIST_SUCCESS, SALE_LIST_FAIL,
		 SALE_DELETE_REQUEST, SALE_DELETE_SUCCESS, SALE_DELETE_FAIL, SALE_DELETE_RESET,
		 SALE_SUBMIT_REQUEST, SALE_SUBMIT_SUCCESS, SALE_SUBMIT_FAIL, SALE_SUBMIT_RESET,
		 SALE_SUBMITTED_LIST_REQUEST, SALE_SUBMITTED_LIST_SUCCESS, SALE_SUBMITTED_LIST_FAIL,
		 SALE_PAY_REQUEST, SALE_PAY_SUCCESS, SALE_PAY_FAIL, SALE_PAY_RESET,
		 SALE_BILL_REQUEST, SALE_BILL_SUCCESS, SALE_BILL_FAIL, SALE_BILL_RESET,
		 SALE_BILLED_LIST_REQUEST, SALE_BILLED_LIST_SUCCESS, SALE_BILLED_LIST_FAIL,
		 SALE_COLLECT_REQUEST, SALE_COLLECT_SUCCESS, SALE_COLLECT_FAIL, SALE_COLLECT_RESET,
		 SALE_COLLECTED_LIST_REQUEST, SALE_COLLECTED_LIST_SUCCESS, SALE_COLLECTED_LIST_FAIL,
		 SALE_DELIVER_REQUEST, SALE_DELIVER_SUCCESS, SALE_DELIVER_FAIL, SALE_DELIVER_RESET,
		 SALE_DELIVERED_LIST_REQUEST, SALE_DELIVERED_LIST_SUCCESS, SALE_DELIVERED_LIST_FAIL,
		 SALE_SB_REQUEST, SALE_SB_SUCCESS, SALE_SB_FAIL, SALE_SB_RESET,
		 SALE_REJECT_REQUEST, SALE_REJECT_SUCCESS, SALE_REJECT_FAIL, SALE_REJECT_RESET,
		 SALE_CARD_PAY_REQUEST, SALE_CARD_PAY_SUCCESS, SALE_CARD_PAY_FAIL, SALE_CARD_PAY_RESET,
		 SALE_PAID_LIST_REQUEST, SALE_PAID_LIST_SUCCESS, SALE_PAID_LIST_FAIL,
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

// --------------------------
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


export const saleSubmittedListReducer = (state ={sales:[]}, action) => {
	switch(action.type) {
		case SALE_SUBMITTED_LIST_REQUEST:
			return {
				loading: true, sales: []
			}

		case SALE_SUBMITTED_LIST_SUCCESS:
			return {
				loading: false,
				sales: action.payload
			}

		case SALE_SUBMITTED_LIST_FAIL:
			return{
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}

// -----------------------------------

export const salePayReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_PAY_REQUEST :
			return {
				loading: true
			}

		case SALE_PAY_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case SALE_PAY_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_PAY_RESET:
			return{}		

		default:
			return state
	}
}

export const saleBillReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_BILL_REQUEST :
			return {
				loading: true
			}

		case SALE_BILL_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case SALE_BILL_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_BILL_RESET:
			return{}		

		default:
			return state
	}
}

export const saleRejectReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_REJECT_REQUEST :
			return {
				loading: true
			}

		case SALE_REJECT_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case SALE_REJECT_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_REJECT_RESET:
			return{}		

		default:
			return state
	}
}

export const saleBilledListReducer = (state ={sales:[]}, action) => {
	switch(action.type) {
		case SALE_BILLED_LIST_REQUEST:
			return {
				loading: true, sales: []
			}

		case SALE_BILLED_LIST_SUCCESS:
			return {
				loading: false,
				sales: action.payload
			}

		case SALE_BILLED_LIST_FAIL:
			return{
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}

// ---------------------------

export const saleCollectReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_COLLECT_REQUEST :
			return {
				loading: true
			}

		case SALE_COLLECT_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case SALE_COLLECT_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_COLLECT_RESET:
			return{}		

		default:
			return state
	}
}

export const saleCollectedListReducer = (state ={sales:[]}, action) => {
	switch(action.type) {
		case SALE_COLLECTED_LIST_REQUEST:
			return {
				loading: true, sales: []
			}

		case SALE_COLLECTED_LIST_SUCCESS:
			return {
				loading: false,
				sales: action.payload
			}

		case SALE_COLLECTED_LIST_FAIL:
			return{
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}

// ---------------------------

export const saleDeliverReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_DELIVER_REQUEST :
			return {
				loading: true
			}

		case SALE_DELIVER_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case SALE_DELIVER_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_DELIVER_RESET:
			return{}		

		default:
			return state
	}
}

export const saleDeliveredListReducer = (state ={sales:[]}, action) => {
	switch(action.type) {
		case SALE_DELIVERED_LIST_REQUEST:
			return {
				loading: true, sales: []
			}

		case SALE_DELIVERED_LIST_SUCCESS:
			return {
				loading: false,
				sales: action.payload
			}

		case SALE_DELIVERED_LIST_FAIL:
			return{
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}

// ----------------------

export const sendBackReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_SB_REQUEST :
			return {
				loading: true
			}

		case SALE_SB_SUCCESS:
			return {
				loading: false,
				success: true
			}

		case SALE_SB_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_SB_RESET:
			return{}		

		default:
			return state
	}
}


// -----------------------------
export const saleCardPayReducer = (state={}, action) => {
	switch(action.type) {
		case SALE_CARD_PAY_REQUEST :
			return {
				loading: true
			}

		case SALE_CARD_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
				paymentResult: action.payload
			}

		case SALE_CARD_PAY_FAIL:
			return{
				loading: false,
				error: action.payload
			}

		case SALE_CARD_PAY_RESET:
			return{}		

		default:
			return state
	}
}

export const salePaidListReducer = (state ={sales:[]}, action) => {
	switch(action.type) {
		case SALE_PAID_LIST_REQUEST:
			return {
				loading: true, sales: []
			}

		case SALE_PAID_LIST_SUCCESS:
			return {
				loading: false,
				sales: action.payload
			}

		case SALE_PAID_LIST_FAIL:
			return{
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}