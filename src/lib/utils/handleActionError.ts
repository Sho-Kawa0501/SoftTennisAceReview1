import { AnyAction } from '@reduxjs/toolkit'

export const handleActionError = <T>(
  state: T,
  action: AnyAction,
  defaultMessage: string,
  errorField: keyof T
) => {
  console.log("error action "+  JSON.stringify(action.payload, null, 2))
  if (Array.isArray(action.payload) && action.payload.length > 0) {
    state[errorField] = action.payload[0] as T[keyof T];
  } else {
    // 配列でない場合、デフォルトメッセージを使用
    state[errorField] = defaultMessage as T[keyof T];
  }
}


