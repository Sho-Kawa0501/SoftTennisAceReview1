import { FILE } from "types"
export interface BRAND_LIST {
  brand:string,
}

export interface SERIES_LIST {
  series:string,
}

export interface POSITION_LIST {
  position:string,
}

export interface ItemProps {
  brand: Brand,
  id: number,
  item_name: string,
  item_photo: string,
  item_position: Position,
  release_date: Date,
  series: Series,
  slug: string,
}

export interface Brand {
  id: number,
  name: string,
}

export interface Series {
  id: number,
  name: string,
}


export interface Position {
  id: number,
  name: string,
}




export interface ItemFilterModalProps {
  items: ItemProps[],
  brands: Brand[],
  series: Series,
  positions: Position[],
}

//優先
export interface Item {
  id:number,
  item_name:string,
  brand:Brand,
  series:Series,
  position:Position,
  item_photo:string,
  release_date:Date,
  slug:string,
}


interface CREATE_FAVORITE {
  userId: string
  postId: string
}

type Review = {
  id: string
  user: string
  item: string
  text: string
  created_at: string
  favorites_count: number
  is_favorite_by_user: boolean
}

export interface ItemProps {
  brand: Brand,
  id: number,
  item_name: string,
  item_photo: string,
  item_position: Position,
  release_date: Date,
  series: Series,
  slug: string,
}

interface BSP {
  id:number,
  name:string,
}



export interface ItemProps {
  brand: Brand,
  id: number,
  item_name: string,
  item_photo: string,
  item_position: Position,
  release_date: Date,
  series: Series,
  slug: string,
}

export interface Brand {
  id: number,
  name: string,
}

export interface Series {
  id: number,
  name: string,
}


export interface Position {
  id: number,
  name: string,
}

export interface Item {
  id:number,
  item_name:string,
  brand:Brand,
  series:Series,
  position:Position,
  item_photo:string,
  release_date:Date,
  slug:string,
}

type IcontextProps = {
  items: ItemProps[],
  brands: Brand[],
  series: Series[],
  positions: Position[],
}


interface PROFILE {
  id:string;
  name:string;
  image:FILE | null;
}

