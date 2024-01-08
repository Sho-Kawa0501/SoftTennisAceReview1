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
  rejectValue?: any
  serializedErrorType?: unknown
}

type AuthResponse = LoginUserInfo | { error: string } | string

export const fetchAsyncLogin = createAsyncThunk<
  { data: Credential },
  Credential,
  AsyncThunkConfig
>
  (
    'account/Login',
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
    } catch (error:any) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)

export const fetchAsyncRegister = createAsyncThunk<
  { data: Credential },
  Credential,
  AsyncThunkConfig
  >(
  'account/Register',
  async (auth:Credential,{ rejectWithValue }) => {
    try {
    const res = await axios.post<{ data: Credential }>(
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/register/`, 
      auth,
      {
      headers: {
        'Content-Type':'application/json',
      },
      withCredentials: true,
    },
  )
    return res.data
  } catch(error:any) {
    console.log("erd"+error.response.data)
    if (error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error)
    }
  }
})

//ログインしているなら、ログインユーザーの情報が返ってくる
export const fetchAsyncCheckAuth = createAsyncThunk<
  AuthResponse,
  void
  >(
  'account/CheckAuth',
  async (_,{ rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/check-auth/`,{
      withCredentials: true,
    })
    return res.data
  } catch(error:any) {
    if (error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error)
    }
  }
})

export const fetchAsyncGetRefreshToken = createAsyncThunk<
  {refresh: string },
  void,
  AsyncThunkConfig
> (
  'account/Refresh',
  async (_,{rejectWithValue}) => {
  try {
    const res = await axios.get<{refresh:string}>(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/get-refresh-token/`,{
      withCredentials: true,
  })
  return res.data
  } catch(error:any) {
    if (error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error)
    }
  }
})


//newToken 取得したrefreshtokenとcsrftokenを使ってアクセストークンを新発行
export const fetchAsyncCreateAccessToken = createAsyncThunk<
  { data: string },
  { refresh: string; csrfToken: string },
  AsyncThunkConfig
>(
  'account/CreateAccessToken',
  async ({ refresh, csrfToken }, { rejectWithValue }) => {
    try {
      const res = await axios.post<{ data: string }>(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/create-accesstoken/`,
          {refresh:refresh},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        }
      )
      return res.data
    } catch (error: any) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)

//csrfトークンの取得
export const fetchCsrfToken = async (): Promise<string> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/csrf-token/`,
      {
        withCredentials: true,
      }
    )
    return res.data.csrfToken
  } catch (error:any) {
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
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/logout/`,
      {
        headers: {
          'Content-Type':'application/json',
        },
        withCredentials: true,
      },
    )
    return res.data
    } catch (error:any) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error)
      }
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
    } catch (error:any) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error)
      }
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
    // newProfile.image && uploadData.append("image", newProfile.image)
    // if (newProfile.image !== null) {
    //   // 画像がある場合、その画像を追加
    //   newProfile.image && uploadData.append("image", newProfile.image);
    // } else {
    //   // 画像がnullの場合、空の文字列を追加して画像を削除することを示す
    //   uploadData.append("image", "");
    // }
    
    if (newProfile.image !== null) {
      uploadData.append("image", newProfile.image);
    } else {
      uploadData.append("image", "") // 空のファイルを追加して明示的に画像をリセット
    }

    try {
      const res = await axios.patch<ProfileSubmitData>(
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
    } catch (error:any) {
      return rejectWithValue(error)
    }
  }
)
