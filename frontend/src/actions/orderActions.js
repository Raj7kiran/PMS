import axios from 'axios'

import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
         ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
         ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL,
         ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
         ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, 
         ORDER_APPROVE_REQUEST, ORDER_APPROVE_SUCCESS, ORDER_APPROVE_FAIL, 
         ORDER_FINANCEAPPROVE_REQUEST, ORDER_FINANCEAPPROVE_SUCCESS, ORDER_FINANCEAPPROVE_FAIL, 
         ORDER_FINALAPPROVE_REQUEST, ORDER_FINALAPPROVE_SUCCESS, ORDER_FINALAPPROVE_FAIL, 
         ORDER_REJECT_REQUEST, ORDER_REJECT_SUCCESS, ORDER_REJECT_FAIL, 
       } from '../constants/orderConstants'
import { logout } from './userActions'


export const createOrder = ({orderItems}) => async (dispatch, getState) => {
  console.log('actions')
  console.log(orderItems)
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

    const { data } = await axios.post(`/order`, orderItems, config)	  

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

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/order`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
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
          type: ORDER_LIST_FAIL,
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

export const approveOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_APPROVE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/order/${id}/approve`, {}, config)   

    dispatch({
      type: ORDER_APPROVE_SUCCESS,
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
          type: ORDER_APPROVE_FAIL,
          payload: message,
        })
    }
}


export const financeApproveOrder = (orderId, remarks) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: ORDER_FINANCEAPPROVE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      'Content-Type': 'application/json', 
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/order/${orderId}/financeapprove`, {remarks}, config)   

    dispatch({
      type: ORDER_FINANCEAPPROVE_SUCCESS,
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
          type: ORDER_FINANCEAPPROVE_FAIL,
          payload: message,
        })
    }
}

export const finalApproveOrder = (orderId, remarks, orderItems) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_FINALAPPROVE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/order/${orderId}/finalapprove`, {remarks, orderItems}, config)   

    dispatch({
      type: ORDER_FINALAPPROVE_SUCCESS,
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
          type: ORDER_FINALAPPROVE_FAIL,
          payload: message,
        })
    }
}

export const rejectOrder = (orderId, remarks) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_REJECT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/order/${orderId}/reject`, {remarks}, config)   

    dispatch({
      type: ORDER_REJECT_SUCCESS,
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
          type: ORDER_REJECT_FAIL,
          payload: message,
        })
    }
}