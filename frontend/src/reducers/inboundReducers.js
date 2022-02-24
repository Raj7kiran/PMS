import { INBOUND_CREATE_REQUEST, INBOUND_CREATE_SUCCESS, INBOUND_CREATE_FAIL,INBOUND_CREATE_RESET,
		 INBOUND_LIST_REQUEST, INBOUND_LIST_SUCCESS, INBOUND_LIST_FAIL,
	} from '../constants/inboundConstants'



export const inboundCreateReducer = (state={}, action) => {
	switch(action.type) {
		case INBOUND_CREATE_REQUEST :
			return {
				loading: true
			}

		case INBOUND_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				inboundOrder : action.payload
			}

		case INBOUND_CREATE_FAIL:
			return{
				loading: false,
				error: action.payload
			}		

		case INBOUND_CREATE_RESET:
     		 return {}

		default:
			return state
	}
}


export const inboundListReducer = (state ={inboundOrder:[]}, action) => {
	switch(action.type) {
		case INBOUND_LIST_REQUEST:
			return {
				loading: true, inboundOrder:[]
			}

		case INBOUND_LIST_SUCCESS:
			return {
				loading: false,
				inboundOrder: action.payload
			}

		case INBOUND_LIST_FAIL:
			return{
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}
