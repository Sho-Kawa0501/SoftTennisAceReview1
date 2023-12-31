import axios from "axios"
import { handleAxiosError } from "./utils/HandleAxiosError"
import jwt from 'jsonwebtoken'
import { GetServerSidePropsContext } from 'next';

export const fetchCsrfToken = async (): Promise<string> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/csrf-token/`,
    {
      withCredentials: true,
    }
    )
      return res.data.csrfToken
  } catch (error) {
    throw handleAxiosError(error)
  }
} 

// export const checkUserAuthentication = async (context: GetServerSidePropsContext) => {

//   // // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/loginuser-information/`,{
//   //   withCredentials: true,
//   // })
//   // return res.data

//   try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/loginuser-information/`,{
//       withCredentials: true,
//     })
//     return res.data.isAccessAuthenticated
//   } catch (error) {
//     console.error('Error verifying JWT:', error); // エラーの出力
//     return false;
//   }
// };



// export const checkUserAuthentication = (context: GetServerSidePropsContext) => {
//   const jwtToken = context.req.cookies['access_token'];

//   if (!jwtToken) {
//     return false;
//   }

//   try {
//     const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
//     console.log('Decoded JWT:', decoded)
//     return !!decoded;
//   } catch (error) {
//     return false;
//   }
// };
