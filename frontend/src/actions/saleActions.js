import axios from 'axios'
import {SALE_CREATE_REQUEST, SALE_CREATE_SUCCESS, SALE_CREATE_FAIL,
        SALE_LIST_MY_REQUEST, SALE_LIST_MY_SUCCESS, SALE_LIST_MY_FAIL,
        SALE_DETAILS_REQUEST, SALE_DETAILS_SUCCESS, SALE_DETAILS_FAIL,
        SALE_LIST_REQUEST, SALE_LIST_SUCCESS, SALE_LIST_FAIL,
        SALE_DELETE_REQUEST, SALE_DELETE_SUCCESS, SALE_DELETE_FAIL, SALE_DELETE_RESET,
        SALE_SUBMIT_REQUEST, SALE_SUBMIT_SUCCESS, SALE_SUBMIT_FAIL, SALE_SUBMIT_RESET
	} from '../constants/saleConstants'
import { logout } from './userActions'


export const createSale = (sales) => async (dispatch, getState) => {
  console.log('actions')
  console.log(sales)
  try {
    dispatch({
      type: SALE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

								  
    const config = {
      headers: {
		    'Content-Type' : 'application/json',								 
         Authorization: `Bearer ${userInfo.token}`,
      },
    }	

    const { data } = await axios.post(`/sale`, sales, config)	  

    dispatch({
      type: SALE_CREATE_SUCCESS,
      payload: data,
    })
 		

  } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        //   }
        dispatch({
          type: SALE_CREATE_FAIL,
          payload: message,                   
         })
      }
  }


  export const listMySales = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_LIST_MY_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/sale/mysales`, config)

    dispatch({
      type: SALE_LIST_MY_SUCCESS,
      payload: data
    })

  } catch (error) {
    const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
            dispatch(logout())
          }
      dispatch({
          type: SALE_LIST_MY_FAIL,
          payload: message,
         })
     }
}

export const listSales = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_LIST_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/sale`, config)

    dispatch({
      type: SALE_LIST_SUCCESS,
      payload: data
    })

  } catch (error) {
      const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
          dispatch(logout())
        }
        dispatch({
          type: SALE_LIST_FAIL,
          payload: message,
           })
      }
}


export const deleteSale = (id) => async(dispatch, getState) => {
  try{
    dispatch({ type: SALE_DELETE_REQUEST })

    const { userLogin: {userInfo}, } = getState()

    const config = {
             headers: {
              'Content-Type' : 'application/json',                 
                   Authorization: `Bearer ${userInfo.token}`,
                },
          } 

    await axios.delete(`/sale/${id}`, config)

    dispatch({ type: SALE_DELETE_SUCCESS })
    
  } catch(error){
      const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        
        dispatch({
          type: SALE_DELETE_FAIL,
          payload: message,
        })
  }
}

export const getSaleDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SALE_DETAILS_REQUEST,})

    const {userLogin: { userInfo } } = getState()

                  
    const config = {
      headers: {                
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.get(`/sale/${id}`, config)   

    dispatch({
      type: SALE_DETAILS_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
          dispatch(logout())
        }
      dispatch({
          type: SALE_DETAILS_FAIL,
          payload: message,                           
          })
    }
}


export const submitSale = (saleId, remarks) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_SUBMIT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/sale/${saleId}/submit`, {remarks}, config)

    dispatch({
      type: SALE_SUBMIT_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      if (message === 'Not authorized, token failed') {
          dispatch(logout())
        }
        dispatch({
          type: SALE_SUBMIT_FAIL,
          payload: message,
        })
    }
}