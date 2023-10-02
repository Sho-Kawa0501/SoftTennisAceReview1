//Account
//FileExtended
export interface FILE extends Blob {
  readonly lastModified: number;
  name: string;
}

export interface LoginUserInformation {
  id:string
  email:string
  name:string
  image:string
  favoriteReviews:string[]
}


//Review
export interface NewReview {
  title:string,
  content:string,
  image:File | null,
  itemId: number,
}

export interface NewReviewFormData {
  title: string;
  content: string;
  image: string | null;
}

export interface EditReview {
  id: number
  title: string
  content: string
  image: string | null
}

export interface RETURN_POST {
  id: number 
  title: string
  content: string
  image: FILE | null
  user: {
    id:number;
    name:string;
    image:FILE | null;
  }
}

export type ACCESS = string | boolean

export interface Props {
  staticReview: {
    id: string,
    title: string,
    content: string,
    image:File | null,
  },
  id: number,
}


export interface IndexData {
  id:string,
  title:string,
  content:string,
  image: string,
  favorites_count:number,
  user:{
    id:string,
    name:string,
    image:string,
  },
  item:{
    id:number, //itemのid
  }
}

export interface Params {
  id:string
}

export interface ParamsNum {
  id:number
}

export interface POST_FORM_TEXT_DATA {
  title:string,
  content:string,
}

export interface ReviewFormData {
  brand:string,
  id:number,
  item_name:string,
  item_photo:string,
  item_position:string,
  release_date:Date,
  series:string,
  slug:string,
}

//Item

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

export interface ItemFilter {
  item_brand:Brand[] | null,
  item_series:Series[] | null,
  item_position:Position[] | null,
}

export interface ItemFilterModalProps {
  items: ItemProps[],
  brands: Brand[],
  series: Series,
  positions: Position[],
}
