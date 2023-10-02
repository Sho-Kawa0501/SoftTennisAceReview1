import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { handleAxiosError } from 'lib/HandleAxiosError';
import { fetchCsrfToken } from 'features/account/apiService';
//ここは用改造

//引数にcsrfトークンを入れれば、この中でfetchcsrftokenを発動しなくてもいい
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // 405 Method Not Allowed
  }

  try {
    //この処理を外部で行う
    // const csrfToken = await fetchCsrfToken();
    // if (typeof csrfToken !== 'string') {
    //   throw new Error('Invalid CSRF Token');
    // }

    //const { csrfToken, refresh } = req.body

    const { csrfToken, refresh } = req.body
    const apiRes = await axios.post<{ data: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/token/`,
      { refresh: refresh },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrfToken,
        },
      }
    );
    
    // destroyCookie(null, "csrftoken"); // この処理はバックエンドで実装するとのこと

    res.status(200).json(apiRes.data);
  } catch (error:unknown) {
    res.status(500).json({ message: error.message });
  }
};

export default handler