import axios from 'axios'
import {  SALE_CREATE_REQUEST, SALE_CREATE_SUCCESS, SALE_CREATE_FAIL,
          SALE_LIST_MY_REQUEST, SALE_LIST_MY_SUCCESS, SALE_LIST_MY_FAIL,
          SALE_DETAILS_REQUEST, SALE_DETAILS_SUCCESS, SALE_DETAILS_FAIL,
          SALE_LIST_REQUEST, SALE_LIST_SUCCESS, SALE_LIST_FAIL,
          SALE_DELETE_REQUEST, SALE_DELETE_SUCCESS, SALE_DELETE_FAIL, 
          SALE_SUBMIT_REQUEST, SALE_SUBMIT_SUCCESS, SALE_SUBMIT_FAIL, 
          SALE_SUBMITTED_LIST_REQUEST, SALE_SUBMITTED_LIST_SUCCESS, SALE_SUBMITTED_LIST_FAIL,
          SALE_PAY_REQUEST, SALE_PAY_SUCCESS, SALE_PAY_FAIL, SALE_PAY_RESET,
          SALE_BILL_REQUEST, SALE_BILL_SUCCESS, SALE_BILL_FAIL, SALE_BILL_RESET,
          SALE_BILLED_LIST_REQUEST, SALE_BILLED_LIST_SUCCESS, SALE_BILLED_LIST_FAIL,
          SALE_COLLECT_REQUEST, SALE_COLLECT_SUCCESS, SALE_COLLECT_FAIL, 
          SALE_COLLECTED_LIST_REQUEST, SALE_COLLECTED_LIST_SUCCESS, SALE_COLLECTED_LIST_FAIL,
          SALE_DELIVER_REQUEST, SALE_DELIVER_SUCCESS, SALE_DELIVER_FAIL, SALE_DELIVER_RESET,
          SALE_DELIVERED_LIST_REQUEST, SALE_DELIVERED_LIST_SUCCESS, SALE_DELIVERED_LIST_FAIL,
          SALE_SB_REQUEST, SALE_SB_SUCCESS, SALE_SB_FAIL,
          SALE_REJECT_REQUEST, SALE_REJECT_SUCCESS, SALE_REJECT_FAIL, SALE_REJECT_RESET,
          SALE_CARD_PAY_REQUEST, SALE_CARD_PAY_SUCCESS, SALE_CARD_PAY_FAIL, SALE_CARD_PAY_RESET,
          SALE_PAID_LIST_REQUEST, SALE_PAID_LIST_SUCCESS, SALE_PAID_LIST_FAIL,
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

// -------------------------

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


export const listSubmittedSales = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_SUBMITTED_LIST_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/sale/submitted`, config)

    dispatch({
      type: SALE_SUBMITTED_LIST_SUCCESS,
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
          type: SALE_SUBMITTED_LIST_FAIL,
          payload: message,
           })
      }
}


// -----------------------------

export const paySale = (saleId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/sale/${saleId}/pay`, {}, config)

    dispatch({
      type: SALE_PAY_SUCCESS,
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
          type: SALE_PAY_FAIL,
          payload: message,
        })
    }
}

export const rejectSale = (saleId, remarks) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_REJECT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/sale/${saleId}/reject`, {remarks}, config)

    dispatch({
      type: SALE_REJECT_SUCCESS,
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
          type: SALE_REJECT_FAIL,
          payload: message,
        })
    }
}


export const billSale = (saleId, remarks) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_BILL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/sale/${saleId}/bill`, {remarks}, config)

    dispatch({
      type: SALE_BILL_SUCCESS,
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
          type: SALE_BILL_FAIL,
          payload: message,
        })
    }
}

export const listBilledSales = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_BILLED_LIST_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/sale/billed`, config)

    dispatch({
      type: SALE_BILLED_LIST_SUCCESS,
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
          type: SALE_BILLED_LIST_FAIL,
          payload: message,
           })
      }
}


// -----------------------------

export const collectSale = (saleId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_COLLECT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/sale/${saleId}/collect`, {}, config)

    dispatch({
      type: SALE_COLLECT_SUCCESS,
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
          type: SALE_COLLECT_FAIL,
          payload: message,
        })
    }
}

export const listCollectedSales = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_COLLECTED_LIST_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/sale/collected`, config)

    dispatch({
      type: SALE_COLLECTED_LIST_SUCCESS,
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
          type: SALE_COLLECTED_LIST_FAIL,
          payload: message,
           })
      }
}


// -----------------------------

export const deliverSale = (saleId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/sale/${saleId}/deliver`, {}, config)

    dispatch({
      type: SALE_DELIVER_SUCCESS,
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
          type: SALE_DELIVER_FAIL,
          payload: message,
        })
    }
}

export const listDeliveredSales = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_DELIVERED_LIST_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/sale/delivered`, config)

    dispatch({
      type: SALE_DELIVERED_LIST_SUCCESS,
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
          type: SALE_DELIVERED_LIST_FAIL,
          payload: message,
           })
      }
}


// -----------------------------


export const sendBackSale = (saleId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_SB_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.put(`/sale/${saleId}/sendback`, {}, config)

    dispatch({
      type: SALE_SB_SUCCESS,
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
          type: SALE_SB_FAIL,
          payload: message,
        })
    }
}


// -----------------------------------

export const payCardSale = (token, price) => async (dispatch, getState) => {
  console.log('action')
  console.log(token)
  console.log(price)
  try {
    dispatch({
      type: SALE_CARD_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
                  
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}`,},
    } 

    const { data } = await axios.post(`/payment`, {token, price}, config)

    dispatch({
      type: SALE_CARD_PAY_SUCCESS,
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
          type: SALE_CARD_PAY_FAIL,
          payload: message,
        })
    }
}

export const listPaidSales = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_PAID_LIST_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/sale/paid`, config)

    dispatch({
      type: SALE_PAID_LIST_SUCCESS,
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
          type: SALE_PAID_LIST_FAIL,
          payload: message,
           })
      }
}