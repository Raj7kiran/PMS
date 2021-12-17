import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,
		 USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_RESET,USER_LIST_FAIL,
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