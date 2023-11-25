import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'
import { handleActionError } from 'lib/utils/handleActionError'

type InitialState = {
  loginUser: {
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
  authError: string | null,
  isAuthenticated: boolean,
  isDeleteUser: boolean,
  isLogin:boolean,
  isLogout:boolean,
  isRegister:boolean,
  isEditProfile:boolean,
}

const initialState: InitialState = {
  loginUser: {
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
  authError: "",
  isAuthenticated: false,
  isEditProfile:false,
  isDeleteUser:false,
  isLogin:false,
  isLogout:false,
  isRegister:false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetIsAuthErrorMessage(state) {
      state.authError = ""
    },
    setIsAuthenticated(state) {
      state.isAuthenticated = true
    },
    resetIsAuthenticated(state) {
      state.isAuthenticated = false
    },
    setIsRegister(state) {
      state.isRegister = true
    },
    resetIsRegister(state) {
      state.isRegister = false
    },
    setIsLogin(state) {
      state.isLogin = true
    },
    resetIsLogin(state) {
      state.isLogin = false
    },
    setIsLogout(state) {
      state.isLogout = true
    },
    resetIsLogout(state) {
      state.isLogout = false
    },
    setIsEditProfile(state) {
      state.isEditProfile = true
    },
    resetIsEditProfile(state) {
      state.isEditProfile = false
    },
    setIsDeleteUser(state) {
      state.isDeleteUser = true
    },
    resetIsDeleteUser(state) {
      state.isDeleteUser = false
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(actions.fetchSession.fulfilled, 
      (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated
    })
    builder.addCase(actions.fetchAsyncLogin.fulfilled,
      (state) => {
        state.isAuthenticated = true
        state.authError = ""
    })
    builder.addCase(actions.fetchAsyncLogin.rejected, 
      (state,action) => {
        handleActionError(state, action, 'ログインに失敗しました。','authError')
    })
    builder.addCase(actions.fetchAsyncRegister.fulfilled,
      (state) => {
        state.isAuthenticated = true
        state.authError = ""
      }
    )
    builder.addCase(actions.fetchAsyncRegister.rejected,
      (state, action) => {
        handleActionError(state, action, 'アカウント登録に失敗しました','authError')
      }
    )
    builder.addCase(actions.fetchAsyncCheckAuth.fulfilled, 
      (state, action) => {
        if (typeof action.payload === 'string' || 'error' in action.payload) {
          return state
        }
        return {
          ...state,
          loginUser: action.payload,
          isAuthenticated: true, 
        }
      }
    ) 
    builder.addCase(actions.fetchAsyncCheckAuth.rejected,
      (state, action) => {
        handleActionError(state, action, 'アカウント情報取得に失敗しました','authError')
        state.isAuthenticated = false
      }
    )
    builder.addCase(actions.fetchAsyncLogout.fulfilled,
      (state) => {
      return {
        ...state, 
        isAuthenticated: false,
        authError:  "",
        loginUser:{
          id: '',
          name: "",
          email:'',
          image: "",
          favorite_reviews: [],
        }
      }
    })
    builder.addCase(actions.fetchAsyncLogout.rejected,
      (state, action) => {
        handleActionError(state, action, 'アカウント情報取得に失敗しました','authError')
      }
    )
    builder.addCase(actions.fetchAsyncEditProfile.rejected,
      (state, action) => {
        handleActionError(state, action, 'プロフィール保存に失敗しました','authError')
    })
    builder.addCase(actions.fetchAsyncDeleteUser.fulfilled, 
      (state) => {
      return {
        ...state, 
        setIsDeleteUser: true,
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
  setIsLogin,
  resetIsLogin,
  setIsLogout,
  resetIsLogout,
  setIsRegister,
  resetIsRegister,
  setIsDeleteUser,
  resetIsDeleteUser,
} =
  accountSlice.actions

export default accountSlice.reducer