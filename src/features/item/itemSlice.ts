//現在のフィルタリング状況
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Item,Brand,Series,Position,ItemFilter } from 'types/itemTypes'
import axios from 'axios';
import { AppDispatch,RootState } from 'app/store';

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
};

//この関数は使わない説ある
//理由...通常の関数を実行して、その結果をsetItems関数に渡せばreduxのstateに格納されるため
export const fetchAsyncItemList = createAsyncThunk(
  'item/ItemList',
  async (_,{rejectWithValue}) => {
  try {
    const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_list/`,{
      withCredentials: true,
  })
  return res.data
  } catch(error:unknown) {
    return rejectWithValue(error)
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
  items: [], //初回に入ってくるアイテム一覧
  brands: [], //初回に取得するアイテム情報
  series: [],
  positions: [],
  filteredItems:[], //フィルタリングされたアイテムリスト
  filter: { //フィルタリングされた各項目
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
      if (!state.filter.item_brand && !state.filter.item_series && !state.filter.item_position) {
        // 初回ロード時またはフィルタリングが適用されていない場合のみ、アイテムリストを更新
        state.items = action.payload;
        state.filteredItems = action.payload;
      }
    },
    //絞り込みボタンが押される時に実行される
    setFilter: (state, action: PayloadAction<ItemFilter>) => {
      //filterに格納
      state.filter = action.payload
      //フィルタリングされたアイテムリストを格納
      state.filteredItems = [...state.items]
      // ブランドでフィルタリング
      //item_brandはItemFilterModalから送られてきたSetFilterの引数
      //filter.item_brandが存在し、配列が0以上なら、
      if (state.filter.item_brand && state.filter.item_brand.length > 0) {
        //最終的には配列にフィルタリングされたアイテムが格納される。
        // state.filteredItems = state.filteredItems.filter(item =>
        // //フィルタリングで選択されたブランド銘のいずれかが一致すればTrue
        // state.filter.item_brand!.some(brand => brand.name === item.brand.name));
      }
      //シリーズ
      if (state.filter.item_series && state.filter.item_series.length > 0) {
        state.filteredItems = state.filteredItems.filter(item =>
        state.filter.item_series!.some(series => series.name === item.series.name));
      }
      //ポジション  
      if (state.filter.item_position && state.filter.item_position.length > 0) {
        state.filteredItems = state.filteredItems.filter(item =>
        state.filter.item_position!.some(position => position.name === item.item_position.name));
      }
    },
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.brands = action.payload
    },
    setSeries: (state, action: PayloadAction<Series[]>) => {
      state.series = action.payload
      console.log()
    },
    setPositions: (state, action: PayloadAction<Position[]>) => {
      state.positions = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncItemList.fulfilled, (state, action: PayloadAction<Item[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    });
  },
})

export const { setItems, setFilter,setBrands, setSeries, setPositions, } = itemSlice.actions;
export const selectItems = (state: RootState) => state.item.items
export const selectBrands = (state: RootState) => state.item.brands
export const selectSeries = (state: RootState) => state.item.series
export const selectPositions = (state: RootState) => state.item.positions
export const selectFilterdItems = (state: RootState) => state.item.filteredItems
export const selectFilterdSeries = (state: RootState) => state.item.filter.item_series
console.log("series"+selectSeries)
console.log("series"+selectFilterdSeries)
export default itemSlice.reducer