import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // 405 Method Not Allowed
  }

  try {
    const apiRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/csrf/create/`,
      {
        withCredentials: true,
      }
    );

    res.status(200).json({ csrfToken: apiRes.data.csrfToken });
  } catch (error:unknown) {
    res.status(500).json({ message: error.message });
  }
};

export default handler