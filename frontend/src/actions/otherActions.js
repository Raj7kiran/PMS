import axios from 'axios'
import { 
		 MANUFACTURER_DETAILS_REQUEST, MANUFACTURER_DETAILS_SUCCESS, MANUFACTURER_DETAILS_FAIL,
		 MANUFACTURER_LIST_REQUEST, MANUFACTURER_LIST_SUCCESS, MANUFACTURER_LIST_FAIL,
		 MANUFACTURER_CREATE_REQUEST, MANUFACTURER_CREATE_SUCCESS, MANUFACTURER_CREATE_FAIL,
		 MANUFACTURER_DELETE_REQUEST ,MANUFACTURER_DELETE_SUCCESS ,MANUFACTURER_DELETE_FAIL,
		 MANUFACTURER_UPDATE_REQUEST, MANUFACTURER_UPDATE_SUCCESS, MANUFACTURER_UPDATE_FAIL,
		 SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS, SUPPLIER_DETAILS_FAIL,
		 SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_SUCCESS, SUPPLIER_CREATE_FAIL,
		 SUPPLIER_DELETE_REQUEST ,SUPPLIER_DELETE_SUCCESS ,SUPPLIER_DELETE_FAIL,
		 SUPPLIER_LIST_REQUEST, SUPPLIER_LIST_SUCCESS, SUPPLIER_LIST_FAIL,	 
	} from '../constants/otherConstants'


//get manufacturer
export const listManufacturers = () =>  async(dispatch, getState) => {
	try{
		dispatch({ type: MANUFACTURER_LIST_REQUEST })

		const { userLogin: { userInfo } } = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get('/users/manufacturer', config)

		dispatch({
			type: MANUFACTURER_LIST_SUCCESS,
			payload: data
		})


	} catch(error) {
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: MANUFACTURER_LIST_FAIL,
	          payload: message,
	        })

	}
}


//add Manufacturer
export const createManufacturer = (manufacturer) => async(dispatch, getState) => {
	try{
		dispatch({ type: MANUFACTURER_CREATE_REQUEST })

		const { userLogin:{ userInfo } } = getState()

		const config = {
			headers: {
			 	'Content-Type': 'application/json',
			 	Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.post('/users/manufacturer', manufacturer, config)

		dispatch({
			type: MANUFACTURER_CREATE_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: MANUFACTURER_CREATE_FAIL,
	          payload: message,
	        })
	}
}


//delete manfacturer
export const deleteManfacturer = (id) => async(dispatch, getState) => {
	try{
		dispatch({ type: MANUFACTURER_DELETE_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const config = {
						 headers: {
							'Content-Type' : 'application/json',								 
					         Authorization: `Bearer ${userInfo.token}`,
					      },
					} 

		await axios.delete(`/users/manufacturer/${id}`, config)

		dispatch({ type: MANUFACTURER_DELETE_SUCCESS })
		
	} catch(error){
			const message =
		      error.response && error.response.data.message
		        ? error.response.data.message
		        : error.message
		    
		    dispatch({
		      type: MANUFACTURER_DELETE_FAIL,
		      payload: message,
		    })
	}
}


//get man by Id
export const getManufacturerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANUFACTURER_DETAILS_REQUEST,
    })

    const { userLogin: { userInfo }} = getState()

								  
    const config = {
			      headers: {								 
			         Authorization: `Bearer ${userInfo.token}`,
		     	 },
   			 }	

    const { data } = await axios.get(`/users/manufacturer/${id}`, config)	  

    dispatch({
      type: MANUFACTURER_DETAILS_SUCCESS,
      payload: data,
    })
 		
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    dispatch({
      type: MANUFACTURER_DETAILS_FAIL,
      payload: message,
    })
  }
}

//update Manufacturer
export const updateManufacturer = (manufacturer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANUFACTURER_UPDATE_REQUEST,
    })
    console.log(manufacturer)

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {    
         'Content-Type': 'application/json',             
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.put(`/users/manufacturer/${manufacturer.id}`, manufacturer,config)   

    dispatch({ type: MANUFACTURER_UPDATE_SUCCESS, })
    dispatch({ type: MANUFACTURER_DETAILS_SUCCESS, payload: data })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    dispatch({
      type: MANUFACTURER_UPDATE_FAIL,
      payload: message,
    })
  }
}



// ----------------------Supplier------------------------


//get supplier
export const listSupplier = () =>  async(dispatch, getState) => {
	try{
		dispatch({ type: SUPPLIER_LIST_REQUEST })

		const { userLogin: { userInfo } } = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get('/users/supplier', config)

		dispatch({
			type: SUPPLIER_LIST_SUCCESS,
			payload: data
		})


	} catch(error) {
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: SUPPLIER_LIST_FAIL,
	          payload: message,
	        })

	}
}


//add Supplier
export const createSupplier = (supplier) => async(dispatch, getState) => {
	try{
		dispatch({ type: SUPPLIER_CREATE_REQUEST })

		const { userLogin:{ userInfo } } = getState()

		const config = {
			headers: {
			 	'Content-Type': 'application/json',
			 	Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.post('/users/supplier', supplier, config)

		dispatch({
			type: SUPPLIER_CREATE_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: SUPPLIER_CREATE_FAIL,
	          payload: message,
	        })
	}
}

//delete supplier
export const deleteSupplier = (id) => async(dispatch, getState) => {
	try{
		dispatch({ type: SUPPLIER_DELETE_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const config = {
						 headers: {
							'Content-Type' : 'application/json',								 
					         Authorization: `Bearer ${userInfo.token}`,
					      },
					} 

		await axios.delete(`/users/supplier/${id}`, config)

		dispatch({ type: SUPPLIER_DELETE_SUCCESS })
		
	} catch(error){
			const message =
		      error.response && error.response.data.message
		        ? error.response.data.message
		        : error.message
		    
		    dispatch({
		      type: SUPPLIER_DELETE_FAIL,
		      payload: message,
		    })
	}
}


//get Supplier by id
export const getSupplierDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_DETAILS_REQUEST,
    })

    const { userLogin: { userInfo }} = getState()

								  
    const config = {
			      headers: {								 
			         Authorization: `Bearer ${userInfo.token}`,
		     	 },
   			 }	

    const { data } = await axios.get(`/users/supplier/${id}`, config)	  

    dispatch({
      type: SUPPLIER_DETAILS_SUCCESS,
      payload: data,
    })
 		
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    dispatch({
      type: SUPPLIER_DETAILS_FAIL,
      payload: message,
    })
  }
}


