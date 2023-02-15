import {
  // アカウント登録
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  // 読み込み中
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from './types'

export const register = (name,email,password) => async(dispatch) => {
  dispatch({
    type:SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/register',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:body,
    })

    if (res.status === 200) {
      dispatch({
        type:REGISTER_SUCCESS,
      })
    } else {
      dispatch({
        type:REGISTER_FAIL,
      })
    }

  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    })
  }
  dispatch({
    type:REMOVE_AUTH_LOADING,
  })
  
}