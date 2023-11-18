import { AnyAction } from '@reduxjs/toolkit'

export const handleActionError = <T>(
  state: T,
  action: AnyAction,
  defaultMessage: string,
  errorField: keyof T
) => {
  state[errorField] = (typeof action.payload === 'string' ? action.payload : defaultMessage) as T[keyof T]
}


