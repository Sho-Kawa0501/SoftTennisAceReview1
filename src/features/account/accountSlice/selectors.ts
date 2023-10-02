import type { RootState } from "app/store"

export const selectIsAuthenticated = (state: RootState) => state.account.isAuthenticated
export const selectLoginUser = (state: RootState) => state.account.loginUser
export const selectEditProfile = (state:RootState) => state.account.isEditProfile
export const selectDeleteUser = (state: RootState) => state.account.isDeleteUser