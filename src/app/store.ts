//これを使用する
import { configureStore, ThunkAction, Action,combineReducers,PayloadAction,AnyAction } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'
import accountReducer from '../features/account/accountSlice/reducers'
import reviewReducer from '../features/review/slice/reducers'
import itemReducer from 'features/item/itemSlice'
import appReducer from 'features/app/appSlice'
import { persistStore, persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const rootReducer = combineReducers({
  app: appReducer,
  account: accountReducer,
  review: reviewReducer,
  item: itemReducer,
})

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null)
    },
    setItem(_key, value) {
      return Promise.resolve(value)
    },
    removeItem(_key) {
      return Promise.resolve()
    },
  }
}
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account','item'], // 永続化したいstateを指定
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//Reduxは、全てのコンポーネントからアクセスできるstoreファイルを作成する必要がある。
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  //devTools: true,
})

export type AsyncThunkConfig = {
  state?: unknown
  dispatch?: ThunkDispatch<unknown, unknown, AnyAction>
  extra?: unknown
  serializedErrorType?: unknown
  rejectWithValue: (value: any) => PayloadAction<any>
}

//型定義  typeofで型を指定
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)