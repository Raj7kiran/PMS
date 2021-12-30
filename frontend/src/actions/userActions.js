import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,
		 		 USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
		 		 USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,USER_DETAILS_FAIL, 
		 		 USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
         USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
         USER_DELETE_REQUEST,USER_DELETE_SUCCESS, USER_DELETE_FAIL,
		} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
	try{
		dispatch({
			type : USER_LOGIN_REQUEST
		})

		//this is to set the header type
			const config ={
				headers : {	'Content-Type' : 'application/json'	}
			}

			const { data } = await axios.post(
								'/users/login',
								 {email, password},
								 config
								 )

      		// console.log(`logindata: ${...data}`)
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload : data
			})

			//set user to local storage
			localStorage.setItem('userInfo', JSON.stringify(data))
		
	} catch (error){
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message 
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	
	dispatch ({ type: USER_LOGOUT })
	
	document.location.href = '/'
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {                 
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.get(`/users`, config)    

    dispatch({
      type: USER_LIST_SUCCESS,
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
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const { userLogin: { userInfo }} = getState()

								  
    const config = {
			      headers: {								 
			         Authorization: `Bearer ${userInfo.token}`,
		     	 },
   			 }	

    const { data } = await axios.get(`/users/${id}`, config)	  

    dispatch({
      type: USER_DETAILS_SUCCESS,
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
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(`/users/profile`, user, config)	  

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
 		
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}


export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })
    console.log(user)

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {    
         'Content-Type': 'application/json',             
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.put(`/users/${user.id}`, user,config)   

    dispatch({ type: USER_UPDATE_SUCCESS, })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    // const { userLogin: {userInfo}, } = getState()

    // const config = {
    //   headers : { Authorization: `Bearer ${userInfo.token}` }, 
    // }

    await axios.delete(`/users/${id}`)

    dispatch({
      type: USER_DELETE_SUCCESS,
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
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}