import { 
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios,{ AxiosError } from 'axios'
import { destroyCookie } from 'nookies'
import  * as reducers from './reducers'
import { Credential,UserInformation,Profile } from '../AccountTypes'
import { RootState } from 'app/store';
import { Dispatch } from 'react'
import { AppDispatch } from 'app/store';
import { stringify } from 'querystring';
import { IndexData,LoginUserInformation } from 'types';



axios.defaults.withCredentials = true

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
};

export const handleAxiosError = (error: unknown, thunkAPI?: any): ReturnType<typeof thunkAPI.rejectWithValue> => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    } else if (error.request) {
      return thunkAPI.rejectWithValue('サーバーからの応答がありません。');
    } else {
      return thunkAPI.rejectWithValue('通信に失敗しました。');
    }
  }
  return thunkAPI.rejectWithValue('通信に失敗しました。');
}

//ログイン関数
//authの型は必要？
//fetchの使用方法について
//rejectWithValue...ReduxToolkitのユーティリティの1つ
//axiosの処理が失敗した時、そのエラー情報をrejectWithValueを使用してreducerに渡す処理
//関数そのものがアクションクリエーターに該当する
//returnされる値がアクションに該当する...例えばres.dataやrejectWithValueなど
//
export const fetchAsyncLogin = createAsyncThunk<
  { data: Credential },
  Credential,
  AsyncThunkConfig
>
  (
    'account/login',
    //payloadCreator
    async (auth:Credential,thunkAPI) => {
      try {
      const res = await axios.post<{data: Credential}>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, 
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
      //エラーがaxios由来のものかどうかをチェック
      if (axios.isAxiosError(error)) {
        //サーバーからのレスポンスは存在するが、404,401などのエラーに関するステータスコードが返される場合、それを表示
        if (error.response) {
          return thunkAPI.rejectWithValue(error.response.data.error)
        //サーバーからの応答が受け取れない
        } else if (error.request) {
          // リクエストが作成されたが、応答がない場合
          return thunkAPI.rejectWithValue('サーバーからの応答がありません。');
        } else {
          // 何か別の問題が発生した場合
          return thunkAPI.rejectWithValue('ログインに失敗しました。');
        }
      } else {
        // axiosのエラーではない場合。コードのバグや、外部ライブラリのエラーなど
        return thunkAPI.rejectWithValue('ログインエラーが発生しました。');
      }
    }
  }
)

//新規登録した後、プロフィール編集画面に遷移すると、デフォルトで設定したニックネームと画像が非表示になっている。
//プロフィールを変更後に再取得する処理が抜けている？
export const fetchAsyncRegister = createAsyncThunk<
  { data: Credential },
  Credential,
  AsyncThunkConfig
  >(
  'account/register',
  async (auth:Credential, thunkAPI) => {
    try {
    const res = await axios.post<{ data: Credential }>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`, 
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
    return handleAxiosError(error, thunkAPI)
  }
})

type AuthResponse = UserInformation | { error: string } | string

//UserViewと連動している関数 //reduxtoolkitのまま定義→認証済みかどうかをstateで管理するため
export const fetchAsyncCheckAuth = createAsyncThunk<AuthResponse,void>(
  'account/checkAuth',
  async (_,thunkAPI) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/`,{
      withCredentials: true,
    })
    return res.data
  } catch(error:unknown) {
    return handleAxiosError(error, thunkAPI)
  }
})

//RootAPIで使用
export const fetchAsyncGetRefreshToken = createAsyncThunk<
{ refresh: string },
  void,
  AsyncThunkConfig
> (
  'account/refresh',
  async (_,thunkAPI) => {
  try {
    const res = await axios.get<{refresh:string}>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`,{
      withCredentials: true,
  })
  return res.data
  } catch(error:unknown) {
    return handleAxiosError(error, thunkAPI)
  }
})

//RootAPIで使用
//newToken
export const fetchAsyncNewToken = createAsyncThunk<
  { data: string },
  { refresh: string; csrfToken: string },
  AsyncThunkConfig
>(
  'account/newtoken',
  async ({ refresh, csrfToken }, thunkAPI) => {
    
    try {
      
      const res = await axios.post<{ data: string }>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/token/`,
          {refresh:refresh},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-CSRFToken": csrfToken,
          },
        }
      );
      //バックエンドで実装
      // destroyCookie(null, "csrftoken");
      
      return res.data;

    } catch (error: unknown) {
      return handleAxiosError(error, thunkAPI)
    }
  }
)



//RootAPIで使用
//csrfトークンの取得
//関数名も後ほど変更する
//thunkAPIがなくても使えるようにしたい
export const fetchCsrfToken = async (): Promise<string> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/csrf/create/`,
      {
        withCredentials: true,
      }
    )
    return res.data.csrfToken;
  } catch (error:unknown) {
    return handleAxiosError(error)
  }
};


export const fetchAsyncLogout = createAsyncThunk<
  string,
  void,
  AsyncThunkConfig
>(
  'account/logout',
  async (_,thunkAPI) => {
    try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`,
      {
        headers: {
          'Content-Type':'application/json',
        },
        withCredentials: true,
      },
      
    );
    return res.data;
    } catch (error:unknown) {
      return handleAxiosError(error, thunkAPI)
    }
  }
)


export const fetchAsyncDeleteUser = createAsyncThunk<
  string,
  void,
  AsyncThunkConfig
>(
  'account/delete',
  async (_,thunkAPI) => {
    try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/delete/`,  
      {
        headers: {
          'Content-Type':'application/json',
        },
        withCredentials: true,
      },
    )
    return res.data
    } catch (error:unknown) {
      return handleAxiosError(error, thunkAPI)
    }
  }
)

//プロフィール編集
//変更した後、プロフィール編集画面に遷移すると、変更前のプロフィールが表示される。
//プロフィールを変更後に再取得する処理が抜けている？
export const fetchAsyncEditProfile = createAsyncThunk<
  Profile,
  Profile,
  AsyncThunkConfig
>(
  'account/editProfile',
  async (newProfile:Profile,thunkAPI,) => {
    const uploadData = new FormData()
    uploadData.append("name", newProfile.name)
    newProfile.image && uploadData.append("image", newProfile.image)
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/${newProfile.id}/`,
        uploadData, 
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      )
      thunkAPI.dispatch(reducers.setIsEditProfile())
      return res.data
    } catch (error:unknown) {
      return thunkAPI.rejectWithValue(handleAxiosError(error, thunkAPI))
    }
  }
)


//TokenRefreshView
// export const fetchAsyncNewToken = createAsyncThunk<
//   { data: string },
//   void,
//   AsyncThunkConfig
// >(
//   'account/newtoken',
//   async (_, thunkAPI) => {
//     try {
//       const csrfToken = await fetchAsyncGetCsrfToken();
//       if (typeof csrfToken !== 'string') {
//         throw new Error('Invalid CSRF Token'); // csrfTokenが文字列でない場合のエラーハンドリング
//       }
//       // console.log(refresh)
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/token/`,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json; charset=utf-8",
//             "X-CSRFToken": csrfToken,
//           },
//         }
//       );
//       destroyCookie(null, "csrftoken");
//       return res.data;

//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           return thunkAPI.rejectWithValue(error.response.data.detail || "エラーが発生しました");
//         } else {
//           return thunkAPI.rejectWithValue('サーバーからの応答がありません。');
//         }
//       } else {
//         return thunkAPI.rejectWithValue('通信エラーが発生しました。');
//       }
//     }
//   }
// );


// export const fetchAsyncGetCsrfToken = createAsyncThunk<
//   string,
//   void,
//   AsyncThunkConfig
// >('account/getCsrfToken',
//   async (_,thunkAPI) => {
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/csrf/create/`,
//       {
//         withCredentials: true,
//       }
//     )
//     return res.data.csrfToken
//   } catch(error:unknown) {
//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         return thunkAPI.rejectWithValue(error.response.data.error)
//       } else if (error.request) {
//         return thunkAPI.rejectWithValue('サーバーからの応答がありません。')
//       } else {
//         return thunkAPI.rejectWithValue('通信に失敗しました。')
//       }
//     } else {
//       return thunkAPI.rejectWithValue('通信エラーが発生しました。')
//     }
//   }
// })


//verify
//成功したらuser発動
// export const fetchAsyncVerify = createAsyncThunk(
//   'account/verify',
//   async () => {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify/`,  
//       {
//         headers: {
//           'Content-Type':'application/json',
//         },
//         withCredentials: true,
//       }
//     )
//     return res.data
//   }
// )
