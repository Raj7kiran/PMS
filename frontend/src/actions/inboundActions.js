import { INBOUND_CREATE_REQUEST, INBOUND_CREATE_SUCCESS, INBOUND_CREATE_FAIL,INBOUND_CREATE_RESET,
         INBOUND_LIST_REQUEST, INBOUND_LIST_SUCCESS, INBOUND_LIST_FAIL,
  } from '../constants/inboundConstants'
import axios from 'axios'
import { logout } from './userActions'


export const createInbound = (inboundData) => async (dispatch, getState) => {
  console.log('actions')
  console.log(inboundData)
  try {
    dispatch({
      type: INBOUND_CREATE_REQUEST,
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

    const { data } = await axios.post(`/inbound`, inboundData, config)	  

    dispatch({
      type: INBOUND_CREATE_SUCCESS,
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
          type: INBOUND_CREATE_FAIL,
          payload: message,                   
         })
      }
  }

export const listInbound = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INBOUND_LIST_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    const { data } = await axios.get(`/inbound`, config)

    dispatch({
      type: INBOUND_LIST_SUCCESS,
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
          type: INBOUND_LIST_FAIL,
          payload: message,
           })
      }
}