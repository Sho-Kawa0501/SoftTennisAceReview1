export interface Credential {
  email: string
  password: string
}

export interface ProfileFormData {
  name:string
  image: string | null
}

export interface SubmitFormData {
  name: string
  image: File | null
}

export interface ProfileInputData {
  name: string
  image: File | null
}
export interface ProfileSubmitData {
  id:string
  name:string
  image:File | null
}


