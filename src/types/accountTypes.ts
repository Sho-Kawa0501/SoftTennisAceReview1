export interface Credential {
  email: string;
  password: string;
}

export interface ProfileFormData {
  name:string
  image: string | null
}

export type SubmitFormData = {
  name: string;
  image: File | null;
}

export type ProfileInputData = {
  name: string;
  image: File | null;
}

//FILE→File
export interface ProfileSubmitData {
  id:string;
  name:string;
  image:File | null;
}

export interface FILE extends Blob {
  readonly lastModified: number;
  name: string;
}