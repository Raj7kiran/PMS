import axios from 'axios'

import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
         ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
         ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL,
         ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_RESET
       } from '../constants/orderConstants'
import { logout } from './userActions'


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post(`/order`, order, config)	  

    dispatch({
      type: ORDER_CREATE_SUCCESS,
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
          type: ORDER_CREATE_FAIL,
          payload: message,                   
         })
      }
  }


  export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/order/myorders`, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
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
          type: ORDER_LIST_MY_FAIL,
          payload: message,
         })
     }
}

export const deleteOrder = (id) => async(dispatch, getState) => {
  try{
    dispatch({ type: ORDER_DELETE_REQUEST })

    const { userLogin: {userInfo}, } = getState()

    const config = {
             headers: {
              'Content-Type' : 'application/json',                 
                   Authorization: `Bearer ${userInfo.token}`,
                },
          } 

    await axios.delete(`/order/${id}`, config)

    dispatch({ type: ORDER_DELETE_SUCCESS })
    
  } catch(error){
      const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        
        dispatch({
          type: ORDER_DELETE_FAIL,
          payload: message,
        })
  }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST,})

    const {userLogin: { userInfo } } = getState()

                  
    const config = {
      headers: {                
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.get(`/order/${id}`, config)   

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
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
          type: ORDER_DETAILS_FAIL,
          payload: message,                           
          })
    }
}