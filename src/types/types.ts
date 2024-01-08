export interface Review {
  id:string,
  title:string,
  content:string,
  image: string | null,
  favorites_count:number,
  is_edited:boolean,
  user:{
    id:string,
    name:string,
    image:string,
  },
  item:{
    id:number,
    item_name:string,
  }
}

export interface LoginUserInfo {
  id:string
  email:string
  name:string
  image:string
  favorite_reviews:string[]
}

