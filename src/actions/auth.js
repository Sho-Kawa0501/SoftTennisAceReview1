import {
  // アカウント登録
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  //ログイン
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  // ユーザー情報取得
  USER_SUCCESS,
  USER_FAIL,

  // プロフィール編集
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,

  //　リフレッシュトークン
  REFRESH_SUCCESS,
  REFRESH_FAIL,

  // 認証チェック
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,

  // ログアウト
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

  // 読み込み中
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,

  // 状態解除
  RESET_AUTH_STATUS,
} from './types'

// ユーザー登録
export const register = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  const body = JSON.stringify({
    email,
    password,
  })

  try {
    const res = await fetch('/api/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    if (res.status === 200) {
      dispatch({
        type: REGISTER_SUCCESS,
      })
      await dispatch(login(email, password))
    } else {
      dispatch({
        type: REGISTER_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
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

  // APIコール
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

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

//ユーザー情報取得
export const user = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/user', {
      method: 'GET',
    })

    const data = await res.json()

    if (res.status === 200) {
      dispatch({
        type: USER_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: USER_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: USER_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}


export const refresh = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/refresh', {
      method: 'GET',
    })

    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS,
      })
      dispatch(verify())
    } else {
      dispatch({
        type: REFRESH_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}


export const verify = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/verify', {
      method: 'GET',
    })

    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      })
      dispatch(user())
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

//ログアウト
export const logout = () => async(dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/logout', {
      method:'POST',
    })

    if (res.status === 200) {
      dispatch({
        type:LOGOUT_SUCCESS,
      })
    } else {
      dispatch({
        type:LOGOUT_FAIL,
      })
    }

  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    })
  }

  dispatch ({
    type:REMOVE_AUTH_LOADING,
  })
}

// プロフィール編集
export const edit_profile = (id, name, image) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  const formData = new FormData()
  formData.append('name', name)
  if (image) {
    formData.append('image', image)
  }

  try {
    const res = await fetch('/api/post/edit_post', {
      method: 'GET',
    })
    const data = await res.json()

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/${id}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${data.access}`,
      },
      body: formData,
    })

    if (res2.status === 200) {
      dispatch({
        type: EDIT_PROFILE_SUCCESS,
      })
      await dispatch(user())
    } else {
      dispatch({
        type: EDIT_PROFILE_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

// 状態解除
export const reset_auth_status = () => (dispatch) => {
  dispatch({
    type: RESET_AUTH_STATUS,
  })
}