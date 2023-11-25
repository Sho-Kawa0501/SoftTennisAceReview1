export interface Item {
  brand: Brand,
  id: number,
  item_name: string,
  item_photo: string,
  position: Position,
  release_date: Date,
  series: Series,
  slug: string,
}

export interface StaticItemMetaDataType {
  brands: Brand[]
  series: Series[]
  positions: Position[]
}

export interface Brand {
  id: number,
  name: string,
}

export interface Series {
  id: number,
  name: string,
  brand: Brand,
}

export interface Position {
  id: number,
  name: string,
}

//将来的にシリーズ以外の項目でもアイテムの絞り込みを行う可能性があるため
export interface ItemFilter {
  item_brand:Brand[] | null,
  item_series:Series[] | null,
  position:Position[] | null,
}

export interface ItemFilterModalProps {
  items: Item[],
  brands: Brand[],
  series: Series,
  positions: Position[],
}
