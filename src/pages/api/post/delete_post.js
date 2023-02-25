import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    const cookies = cookie.parse(req.headers.cookie ?? '')
    const access = cookies.access ?? false

    if (access === false) {
      return res.status(401).json({
        error: 'アクセストークンがありません',
      })
    }

    const { id } = req.body

    try {
      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })

      if (apiRes.status === 204) {
        return res.status(200).json({
          success: '投稿削除に成功しました。',
        })
      } else {
        return res.status(apiRes.status).json({
          error: '投稿削除に失敗しました',
        })
      }
    } catch (err) {
      return res.status(500).json({
        error: '投稿削除に失敗しました',
      })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}