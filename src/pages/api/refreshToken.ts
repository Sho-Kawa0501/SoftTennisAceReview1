import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // 405 Method Not Allowed
  }

  try {
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    // if (!apiRes.ok) {
    //   throw new Error("API response was not ok.");
    // }

    const data = await apiRes.json();

    res.status(200).json(data);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
    console.log("refreshTokenError");
  }
};

export default handler;

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const apiRes = await axios.get<{refresh: string}>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`, 
//         // withCredentials: true
//       );
//       res.status(200).json(apiRes.data);
//     } catch (error) {
//       // const handledError = handleAxiosError(error); // ここではhandleAxiosError関数の返り値を適切に処理する必要があります。
//       res.status(500).json(error);
//       console.log("refreshTokenError")
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }