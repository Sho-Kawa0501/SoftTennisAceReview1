import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';

//favorited→favorite
interface AccountState {
  isAuthenticated: boolean,
  loginUser: { //ログインしているユーザー情報
    id: string,
    name:string,
    email:string,
    image:string,
    favorite_reviews: string[],
  },
  profiles: [ 
    {
      id: string,
      userProfile: number,
      nickName: string,
      img: string,
    },
  ],
  isEditProfile:boolean,
  authError: string | null,
  refreshToken:string,
  isDeleteUser: boolean,
}

const initialState: AccountState = {
  isAuthenticated: false,
  loginUser: { //ログインしているユーザー情報
    id: '',
    name:'',
    email:'',
    image:'',
    favorite_reviews: [],
  },
  profiles: [
    {
      id: '',
      userProfile: 0,
      nickName: '',
      img: '',
    },
  ],
  isEditProfile:false,
  authError: "",
  refreshToken:"",
  isDeleteUser:false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    //自動的にアクションクリエイターが裏で作成されている
    setIsAuthenticated(state) {
      state.isAuthenticated = true
    },
    resetIsAuthenticated(state) {
      state.isAuthenticated = false
    },
    setIsEditProfile(state) {
      state.isEditProfile = true
    },
    resetIsEditProfile(state) {
      state.isEditProfile = false
    },
    resetIsAuthErrorMessage(state) {
      state.authError = ""
    },
    setIsDeleteUser(state) {
      state.isDeleteUser = true
    },
    resetIsDeleteUser(state) {
      state.isDeleteUser = false
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(actions.fetchAsyncLogin.fulfilled,
      (state,action) => {
        state.isAuthenticated = true
        state.authError = ""
    })
    builder.addCase(actions.fetchAsyncLogin.rejected, 
      (state,action) => {
        if (typeof action.payload === 'string') {
          state.authError = action.payload;
        } else {
          state.authError = 'ログインに失敗しました。'
          state.isAuthenticated = false
        }
    })
    builder.addCase(actions.fetchAsyncRegister.fulfilled,
      (state, action) => {
          state.isAuthenticated = true
          state.authError = ""
        }
    )
    builder.addCase(actions.fetchAsyncRegister.rejected,
      (state, action) => {
        if (typeof action.payload === 'string') {
          state.authError = action.payload;
        } else {
          state.authError = 'アカウント登録失敗しました。';
        }
        state.isAuthenticated = false
      }
    )
    // builder.addCase(actions.fetchAsyncVerify.fulfilled, (state) => {
    //   return {
    //     ...state,
    //     isAuthenticated: true, 
    //   }
    // })
    builder.addCase(actions.fetchAsyncCheckAuth.rejected,(state) => {
      return {
        ...state,
        isAuthenticated:false
      }     
    })
    builder.addCase(actions.fetchAsyncCheckAuth.fulfilled, (state, action) => {
      if (typeof action.payload === 'string' || 'error' in action.payload) {
        // action.payloadがエラーメッセージまたは{ error: string }の場合の処理
        // ここでエラーハンドリングをするか、何もせずにreturn stateだけすることができます。
        return state;
      }
      return {
        ...state,
        loginUser: action.payload,
        isAuthenticated: true,
      }
    }) 
    builder.addCase(actions.fetchAsyncLogout.fulfilled, (state) => {
      return {
        ...state, 
        isAuthenticated: false,
        loginUser:{
          id: '',
          name: "",
          email:'',
          image: "",
          favorite_reviews: [],
        }
      }
    }) 
    builder.addCase(actions.fetchAsyncDeleteUser.fulfilled, (state) => {
      return {
        ...state, 
        isAuthenticated: false,
        loginUser:{
          id: '',
          name: "",
          email:'',
          image: "",
          favorite_reviews: [],
        }
      }
    }) 
  },
})


export const { 
  setIsAuthenticated,
  resetIsAuthenticated,
  setIsEditProfile,
  resetIsEditProfile,
  resetIsAuthErrorMessage,
  setIsDeleteUser,
  resetIsDeleteUser,
} =
  accountSlice.actions

export default accountSlice.reducer