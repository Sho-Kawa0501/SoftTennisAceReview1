//これを使用する
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';

import accountReducer from '../features/account/accountSlice/reducers'
import reviewReducer from '../features/review/slice/reducers'
import itemReducer from 'features/item/itemSlice';
import appReducer from 'features/app/appSlice';
import thunkMiddleware from 'redux-thunk'
//store定義、slice管理


//Reduxは、全てのコンポーネントからアクセスできるstoreファイルを作成する必要がある。
export const store = configureStore({
  reducer: {
    //storeの中のReducerそのものを形作っている
    //作成したsliceをsotre.js内でインポートしてreducerに設定する
    app: appReducer,
    account: accountReducer,
    review: reviewReducer,
    item: itemReducer,

  },
  //devTools: true,
})

//型定義  typeofで型を指定
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch
