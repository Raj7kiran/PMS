import axios from 'axios'
import { PACKAGE_LIST_REQUEST,PACKAGE_LIST_SUCCESS, PACKAGE_LIST_FAIL,
		     PACKAGE_CREATE_REQUEST,PACKAGE_CREATE_SUCCESS, PACKAGE_CREATE_FAIL,
         PACKAGE_DELETE_REQUEST,PACKAGE_DELETE_SUCCESS, PACKAGE_DELETE_FAIL, 
         CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, 
         CLIENT_CREATE_REQUEST, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_FAIL,
         CLIENT_DELETE_REQUEST,CLIENT_DELETE_SUCCESS, CLIENT_DELETE_FAIL, 
		} from '../constants/adminConstants'
import { logout } from './userActions'


// -------------------Packages---------------
export const listPackages = () => async (dispatch, getState) => {
	try {
		dispatch({ type: PACKAGE_LIST_REQUEST })

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {                 
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 
		
		const { data } = await axios.get(`/admin/packages`, config)

		dispatch({
			type: PACKAGE_LIST_SUCCESS,
			payload: data
		})

	} catch (error) {
      const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not Authorized, please login again!') {
            dispatch(logout())
          }
        dispatch({
          type: PACKAGE_LIST_FAIL,
          payload: message,
        })
      }
}

export const createPackage = (pack) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PACKAGE_CREATE_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { 
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${userInfo.token}` 
      }, 
    }

    const {data} = await axios.post(`/admin/packages`, pack, config)

    dispatch({
      type: PACKAGE_CREATE_SUCCESS,
      payload: data
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not Authorized, please login again!') {
      dispatch(logout())
    }
    dispatch({
      type: PACKAGE_CREATE_FAIL,
      payload: message,
    })
  }
}


export const deletePackage = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PACKAGE_DELETE_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    await axios.delete(`/admin/packages/${id}`, config)

    dispatch({
      type: PACKAGE_DELETE_SUCCESS,
    })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, please login again!') {
      dispatch(logout())
    }
    dispatch({
      type: PACKAGE_DELETE_FAIL,
      payload: message,
    })
  }
}

// --------------------Users-----------------


export const listClients = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_LIST_REQUEST,
    })

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {                 
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.get(`/admin/client`, config)    

    dispatch({
      type: CLIENT_LIST_SUCCESS,
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
      type: CLIENT_LIST_FAIL,
      payload: message,
    })
  }
}


//add user
export const createUser = (user) => async(dispatch, getState) => {
  try{
    dispatch({ type: CLIENT_CREATE_REQUEST })

    const { userLogin:{ userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post('/admin/client', user, config)

    dispatch({
      type: CLIENT_CREATE_SUCCESS,
      payload: data
    })

  } catch(error){
    const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          
          dispatch({
            type: CLIENT_CREATE_FAIL,
            payload: message,
          })
  }
}


export const deleteClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_DELETE_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    await axios.delete(`/admin/client/${id}`, config)

    dispatch({
      type: CLIENT_DELETE_SUCCESS,
    })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, please login again!') {
      dispatch(logout())
    }
    dispatch({
      type: CLIENT_DELETE_FAIL,
      payload: message,
    })
  }
}