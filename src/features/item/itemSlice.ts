//現在のフィルタリング状況
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ItemProps,Brand,Series,Position,ItemFilter } from 'types'
import { Item } from './ItemTypes';
import axios from 'axios';
import { handleAxiosError } from 'lib/HandleAxiosError';
import { AppDispatch,RootState } from 'app/store';

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
};

export const fetchAsyncItemList = createAsyncThunk(
  'item/itemlist',
  async (_,thunkAPI) => {
  try {
    const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_list/`,{
      withCredentials: true,
  })
  return res.data
  } catch(error:unknown) {
    return handleAxiosError(error, thunkAPI)
  }
})

interface InitialState {
  items: Item[];
  brands: Brand[];
  series: Series[];
  positions: Position[];
  filteredItems: Item[];
  filter: ItemFilter
}

const initialState:InitialState = {
  items: [],
  brands: [],
  series: [],
  positions: [],
  filteredItems:[],
  filter: {
    item_brand: null,
    item_series: null,
    item_position: null,
  },
}
//Item一覧、 Item所属情報もcreateAsyncThunkで取得してもいいかもしれない

// スライスの作成
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload
      state.filteredItems = [...action.payload] // 初回はフィルタリングせず、すべてのアイテムを表示します
    },
    setFilter: (state, action: PayloadAction<ItemFilter>) => {
      state.filter = action.payload
      state.filteredItems = [...state.items]
      // ブランドでフィルタリング
      if (state.filter.item_brand && state.filter.item_brand.length > 0) {
        state.filteredItems = state.filteredItems.filter(item =>
        state.filter.item_brand!.some(brand => brand.name === item.brand.name));
      }
      //シリーズ
      if (state.filter.item_series && state.filter.item_series.length > 0) {
        state.filteredItems = state.filteredItems.filter(item =>
        state.filter.item_series!.some(series => series.name === item.series.name));
      }
      //ポジション  
      if (state.filter.item_position && state.filter.item_position.length > 0) {
        state.filteredItems = state.filteredItems.filter(item =>
        state.filter.item_position!.some(position => position.name === item.position.name));
      }
    },
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.brands = action.payload
    },
    setSeries: (state, action: PayloadAction<Series[]>) => {
      state.series = action.payload
    },
    setPositions: (state, action: PayloadAction<Position[]>) => {
      state.positions = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncItemList.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    });
  },
})

export const { setItems, setFilter,setBrands, setSeries, setPositions, } = itemSlice.actions;
export const selectItems = (state: RootState) => state.item.items

export default itemSlice.reducer