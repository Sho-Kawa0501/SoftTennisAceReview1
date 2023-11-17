import axios from "axios";
import { handleAxiosError } from "./utils/HandleAxiosError";

export const fetchCsrfToken = async (): Promise<string> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/csrf-token/`,
    {
      withCredentials: true,
    }
    )
    return res.data.csrfToken;
  } catch (error) {
    throw handleAxiosError(error)
  }
};