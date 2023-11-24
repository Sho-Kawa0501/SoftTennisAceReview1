import { 
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios,{ AxiosError } from 'axios'
import { AppDispatch} from 'app/store'
import { LoginUserInfo } from 'types/types'
import { handleAxiosError } from 'lib/utils/HandleAxiosError'
import { Credential,ProfileSubmitData } from 'types/accountTypes'


axios.defaults.withCredentials = true

type AsyncThunkConfig = {
  state?: unknown
  dispatch?: AppDispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
}

type AuthResponse = LoginUserInfo | { error: string } | string

//使ってない
export const fetchSession = createAsyncThunk(
  'account/fetchSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/session/`, 
      )
      
      const data = await response.data
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchAsyncLogin = createAsyncThunk<
  { data: Credential },
  Credential,
  AsyncThunkConfig
>
  (
    'account/Login',
    //payloadCreator
    async (auth:Credential,{ rejectWithValue }) => {
      try {
      const res = await axios.post<{data: Credential}>(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/login/`, 
        auth,
        {
          headers: {
            'Content-Type':'application/json',
          },
          withCredentials: true,
        }
      )
      return res.data
    } catch (error:unknown) {
      return rejectWithValue(error)
    }
  }
)

//プロフィールを変更後に再取得する処理が抜けている？
export const fetchAsyncRegister = createAsyncThunk<
  { data: Credential },
  Credential,
  AsyncThunkConfig
  >(
  'account/Register',
  async (auth:Credential,{ rejectWithValue }) => {
    try {
    const res = await axios.post<{ data: Credential }>(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/register/`, 
      auth,
      {
      headers: {
        'Content-Type':'application/json',
      },
      withCredentials: true,
    },
  )
    return res.data
  } catch(error:unknown) {
    return rejectWithValue(error)
  }
})

export const fetchAsyncCheckAuth = createAsyncThunk<
  AuthResponse,
  void
  >(
  'account/CheckAuth',
  async (_,{ rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/loginuser-information/`,{
      withCredentials: true,
    })
    return res.data
  } catch(error:unknown) {
    return rejectWithValue(error)
  }
})

export const fetchAsyncRefreshToken = createAsyncThunk<
  {refresh: string },
  void,
  AsyncThunkConfig
> (
  'account/Refresh',
  async (_,{rejectWithValue}) => {
  try {
    const res = await axios.get<{refresh:string}>(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/refresh-token/`,{
      withCredentials: true,
  })
  return res.data
  } catch(error:unknown) {
    return rejectWithValue(error)
  }
})

//RootAPIで使用
//newToken 取得したrefreshtokenとcsrftokenを使ってアクセストークンを新発行
export const fetchAsyncNewAccessToken = createAsyncThunk<
  { data: string },
  { refresh: string; csrfToken: string },//型を作成？
  AsyncThunkConfig
>(
  'account/NewAccessToken',
  async ({ refresh, csrfToken }, { rejectWithValue }) => {
    try {
      const res = await axios.post<{ data: string }>(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/token/refresh/`,
          {refresh:refresh},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json charset=utf-8",
            "X-CSRFToken": csrfToken,
          },
        }
      )
      
      return res.data

    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

//RootAPIで使用
//csrfトークンの取得
export const fetchCsrfToken = async (): Promise<string> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_PATHE_PATHE_PATHE_PATH}/api/auth/csrf-token/`,
      {
        withCredentials: true,
      }
    )
    return res.data.csrfToken
  } catch (error:unknown) {
    return handleAxiosError(error)
  }
}


export const fetchAsyncLogout = createAsyncThunk<
  string,
  void,
  AsyncThunkConfig
>(
  'account/Logout',
  async (_,{ rejectWithValue }) => {
    try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_PATHE_PATH}/api/auth/logout/`,
      {
        headers: {
          'Content-Type':'application/json',
        },
        withCredentials: true,
      },
    )
    return res.data
    } catch (error:unknown) {
      return rejectWithValue(error)
    }
  }
)

export const fetchAsyncDeleteUser = createAsyncThunk<
  string,
  void,
  AsyncThunkConfig
>(
  'account/Delete',
  async (_,{ rejectWithValue }) => {
    try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/delete/`,  
      {
        headers: {
          'Content-Type':'application/json',
        },
        withCredentials: true,
      },
    )
    return res.data
    } catch (error:unknown) {
      return rejectWithValue(error)
    }
  }
)

export const fetchAsyncEditProfile = createAsyncThunk<
  ProfileSubmitData,
  ProfileSubmitData,
  AsyncThunkConfig
>(
  'account/EditProfile',
  async (newProfile:ProfileSubmitData,{rejectWithValue }) => {
    const uploadData = new FormData()
    uploadData.append("name", newProfile.name)
    newProfile.image && uploadData.append("image", newProfile.image)
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/users/${newProfile.id}/`,
        uploadData, 
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      )
      return res.data
    } catch (error:unknown) {
      return rejectWithValue(error)
    }
  }
)
