import axios from 'axios'
import { COUNTRY_LIST_REQUEST, COUNTRY_LIST_SUCCESS, COUNTRY_LIST_FAIL,
		 STATE_LIST_REQUEST, STATE_LIST_SUCCESS, STATE_LIST_FAIL,
		 CITY_LIST_REQUEST, CITY_LIST_SUCCESS, CITY_LIST_FAIL
 } from '../constants/dropConstants'



export const getCountry = () => async(dispatch,getState) => {
	try{
		dispatch({type: COUNTRY_LIST_REQUEST})

		const { data } = await axios.get('/drop/country')

		console.log(data)

		dispatch({
			type: COUNTRY_LIST_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: COUNTRY_LIST_FAIL,
	          payload: message,
	        })
	}
}



export const getStatesName = (country) => async(dispatch,getState) => {
	try{
		dispatch({type: STATE_LIST_REQUEST})
		
		const { data } = await axios.get(`/drop/state/${country}`)

		console.log(data)

		dispatch({
			type: STATE_LIST_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: STATE_LIST_FAIL,
	          payload: message,
	        })
	}
}


export const getCity = (astate) => async(dispatch,getState) => {
	try{
		dispatch({type: CITY_LIST_REQUEST})
		
		const { data } = await axios.get(`/drop/city/${astate}`)

		console.log(data)

		dispatch({
			type: CITY_LIST_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: CITY_LIST_FAIL,
	          payload: message,
	        })
	}
}
