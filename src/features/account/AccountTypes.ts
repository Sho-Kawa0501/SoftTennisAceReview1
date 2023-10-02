import { FILE } from "types";


export interface Credential {
  email: string;
  password: string;
}

export interface UserInformation {
  id: string; // UUIDなのでstringとしています
  email: string;
  name: string;
  image: string; // 画像のパスなのでstringとしています
  favorite_reviews: string[]; // reviewのタイトルの配列としています
}

export interface ProfileFormData {
  editName:string
  image: string | null
}

export type SubmitFormData = {
  editName: string;
  image: File | null;
}

export interface Profile {
  id:string;
  name:string;
  image:FILE | null;
}

export interface NEWPOST {
  title:string,
  content:string,
  image:File | null,
  itemId: number,
}

export interface EDIT_POST {
  id: string
  title: string
  content: string
  image: FILE | null
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

type FormData = {
  name: string;
  image: File | null;
}


