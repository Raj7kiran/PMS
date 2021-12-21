import { COUNTRY_LIST_REQUEST, COUNTRY_LIST_SUCCESS, COUNTRY_LIST_FAIL,
		 STATE_LIST_REQUEST, STATE_LIST_SUCCESS, STATE_LIST_FAIL,
		 CITY_LIST_REQUEST, CITY_LIST_SUCCESS, CITY_LIST_FAIL
 } from '../constants/dropConstants'


export const countryListReducer = (state={ countries:[] }, action) => {
	switch(action.type){
		case COUNTRY_LIST_REQUEST:
			return { countries:[] }
		case COUNTRY_LIST_SUCCESS:
			return { success:true, countries: action.payload }
		case COUNTRY_LIST_FAIL:
			return { error: action.payload }
		default:
			return state
	}
}


export const stateListReducer = (state={ states:[] }, action) => {
	switch(action.type){
		case STATE_LIST_REQUEST:
			return { states:[] }
		case STATE_LIST_SUCCESS:
			return { success:true, states: action.payload }
		case STATE_LIST_FAIL:
			return { error: action.payload }
		default:
			return state
	}
}


export const cityListReducer = (state={ cities:[] }, action) => {
	switch(action.type){
		case CITY_LIST_REQUEST:
			return { cities:[] }
		case CITY_LIST_SUCCESS:
			return { success:true, cities: action.payload }
		case CITY_LIST_FAIL:
			return { error: action.payload }
		default:
			return state
	}
}