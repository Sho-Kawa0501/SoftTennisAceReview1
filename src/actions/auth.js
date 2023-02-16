import {
  // アカウント登録
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  LOGIN_SUCCESS,
  LOGIN_FAIL,

  // 読み込み中
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from './types'

export const register = (email,password) => async(dispatch) => {
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

export const login = (email,password) => async(dispatch) => {
  dispatch({
    type:SET_AUTH_LOADING,
  })

  //bodyにjson形式でemailとpasswordを設定
  const body = JSON.stringify({
    email,
    password,
  })

  try {
    const res = await fetch('/api/account/login', {
      method:'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body:body,
    })

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      })
      //ユーザー情報取得
      dispatch(user())
    } else {
      dispatch({
        type:LOGIN_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type:LOGIN_FAIL,
    })
  }
}