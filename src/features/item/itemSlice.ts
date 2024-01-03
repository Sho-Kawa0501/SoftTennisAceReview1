//現在のフィルタリング状況
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Item,Brand,Series,Position,ItemFilter } from 'types/itemTypes'
import axios from 'axios'
import { AppDispatch,RootState } from 'app/store'


export const fetchAsyncItemList = createAsyncThunk(
  'item/ItemList',
  async (_,{rejectWithValue}) => {
  try {
    const res = await axios(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/item/item_list/`,{
      withCredentials: true,
  })
  return res.data
  } catch(error:any) {
    if (error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error)
    }
  }
})

type InitialState = {
  items: Item[]
  brands: Brand[]
  series: Series[]
  positions: Position[]
  filteredItems: Item[]
  filter: ItemFilter
}

const initialState:InitialState = {
  items: [], //初回に入ってくるアイテム一覧
  brands: [], //初回に取得するアイテムブランド情報
  series: [], //シリーズ
  positions: [], //ポジション
  filteredItems:[], //フィルタリングされたアイテムリスト
  filter: { //フィルタリングされた各アイテム情報
    item_brand: null,
    item_series: null,
    position: null,
  },
}


const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      if (!state.filter.item_brand && !state.filter.item_series && !state.filter.position) {
        // 初回ロード時またはフィルタリングが適用されていない場合のみ、アイテムリストを更新
        state.items = action.payload
        state.filteredItems = action.payload
      }
    },
    
    setFilter: (state, action: PayloadAction<ItemFilter>) => {
      //filterに格納
      state.filter = action.payload
      //フィルタリングされたアイテムリストを格納
      state.filteredItems = [...state.items]
      if (state.filter.item_series && state.filter.item_series.length > 0) {
        state.filteredItems = state.filteredItems.filter(item =>
        state.filter.item_series!.some(series => series.name === item.series.name))
      }
    },
    setSeries: (state, action: PayloadAction<Series[]>) => {
      state.series = action.payload
      console.log()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncItemList.fulfilled, (state, action: PayloadAction<Item[]>) => {
      return {
        ...state,
        items: action.payload,
      }
    })
  },
})

export const { setItems, setFilter, setSeries, } = itemSlice.actions
export const selectItems = (state: RootState) => state.item.items
export const selectBrands = (state: RootState) => state.item.brands
export const selectSeries = (state: RootState) => state.item.series
export const selectPositions = (state: RootState) => state.item.positions
export const selectFilterdItems = (state: RootState) => state.item.filteredItems
export const selectFilterdSeries = (state: RootState) => state.item.filter.item_series
console.log("series"+selectSeries)
console.log("series"+selectFilterdSeries)
export default itemSlice.reducer