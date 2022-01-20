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
		 SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS, SUPPLIER_UPDATE_FAIL, 
		 PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
		 PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, 
		 PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,	
		 PRODUCT_DELETE_REQUEST ,PRODUCT_DELETE_SUCCESS ,PRODUCT_DELETE_FAIL, 
		 PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, 		 
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

		const { data } = await axios.get('/manufacturer', config)

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

		const { data } = await axios.post('/manufacturer', manufacturer, config)

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

		await axios.delete(`/manufacturer/${id}`, config)

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

    const { data } = await axios.get(`/manufacturer/${id}`, config)	  

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

    const { data } = await axios.put(`/manufacturer/${manufacturer.id}`, manufacturer,config)   

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

		const { data } = await axios.get('/supplier', config)

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

		const { data } = await axios.post('/supplier', supplier, config)

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

		await axios.delete(`/supplier/${id}`, config)

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

    const { data } = await axios.get(`/supplier/${id}`, config)	  

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

//update Supplier
export const updateSupplier = (supplier) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_UPDATE_REQUEST,
    })
    console.log(supplier)

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {    
         'Content-Type': 'application/json',             
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.put(`/supplier/${supplier.id}`, supplier,config)   

    dispatch({ type: SUPPLIER_UPDATE_SUCCESS, })
    dispatch({ type: SUPPLIER_DETAILS_SUCCESS, payload: data })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    dispatch({
      type: SUPPLIER_UPDATE_FAIL,
      payload: message,
    })
  }
}


// --------------------Products------------------
//get products
export const listProducts = () =>  async(dispatch, getState) => {
	try{
		dispatch({ type: PRODUCT_LIST_REQUEST })

		const { userLogin: { userInfo } } = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get('/product', config)

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data
		})


	} catch(error) {
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: PRODUCT_LIST_FAIL,
	          payload: message,
	        })

	}
}

//add Manufacturer
export const createProduct = (product) => async(dispatch, getState) => {
	try{
		dispatch({ type: PRODUCT_CREATE_REQUEST })

		const { userLogin:{ userInfo } } = getState()

		const config = {
			headers: {
			 	'Content-Type': 'application/json',
			 	Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.post('/product', product, config)

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: PRODUCT_CREATE_FAIL,
	          payload: message,
	        })
	}
}

//delete product
export const deleteProduct = (id) => async(dispatch, getState) => {
	try{
		dispatch({ type: PRODUCT_DELETE_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const config = {
						 headers: {
							'Content-Type' : 'application/json',								 
					         Authorization: `Bearer ${userInfo.token}`,
					      },
					} 

		await axios.delete(`/product/${id}`, config)

		dispatch({ type: PRODUCT_DELETE_SUCCESS })
		
	} catch(error){
			const message =
		      error.response && error.response.data.message
		        ? error.response.data.message
		        : error.message
		    
		    dispatch({
		      type: PRODUCT_DELETE_FAIL,
		      payload: message,
		    })
	}
}

//get product by Id
export const getProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    })

    const { userLogin: { userInfo }} = getState()

								  
    const config = {
			      headers: {								 
			         Authorization: `Bearer ${userInfo.token}`,
		     	 },
   			 }	

    const { data } = await axios.get(`/product/${id}`, config)	  

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
 		
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: message,
    })
  }
}

//update Product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    })
    console.log(product)

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {    
         'Content-Type': 'application/json',             
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.put(`/product/${product.id}`, product,config)   

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, })
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    })
  }
}