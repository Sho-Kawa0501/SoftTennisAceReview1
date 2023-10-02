export type Params = {
  id:string
}

export type ParamsNum = {
  id:number
}

export type POST_FORM_TEXT_DATA = {
  title:string,
  content:string,
}

export type POST_FORM_DATA = {
  brand:string,
  id:number,
  item_name:string,
  item_photo:string,
  item_position:string,
  release_date:Date,
  series:string,
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