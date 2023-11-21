import type { RootState } from "app/store"

export const selectLoginUser = (state: RootState) => state.account.loginUser
export const selectAuthError = (state: RootState) => state.account.authError
export const selectIsAuthenticated = (state: RootState) => state.account.isAuthenticated
export const selectIsLogin = (state: RootState) => state.account.isLogin
export const selectIsLogout = (state: RootState) => state.account.isLogout
export const selectIsRegister = (state: RootState) => state.account.isRegister
export const selectIsEditProfile = (state:RootState) => state.account.isEditProfile
export const selectIsDeleteUser = (state: RootState) => state.account.isDeleteUser