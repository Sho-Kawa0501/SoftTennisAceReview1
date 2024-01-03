import { AnyAction } from '@reduxjs/toolkit'

export const handleActionError = <T>(
  state: T,
  action: AnyAction,
  defaultMessage: string,
  errorField: keyof T
) => {
  console.log("error action "+  JSON.stringify(action.payload, null, 2))
  if (action.payload && typeof action.payload === 'object' && action.payload.detail) {
    state[errorField] = action.payload.detail as T[keyof T];
  } else {
    // オブジェクトにdetailキーがない場合、デフォルトメッセージを使用
    state[errorField] = defaultMessage as T[keyof T];
  }
}


