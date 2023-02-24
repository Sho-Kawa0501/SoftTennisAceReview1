import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '')
    const access = cookies.access ?? false

    if (access === false) {
      return res.status(401).json({
        error: 'アクセストークンがありません',
      })
    }

    return res.status(200).json({
      access: access,
    })
  } else {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}