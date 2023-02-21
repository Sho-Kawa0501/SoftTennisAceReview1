//投稿に関する関数

//投稿一覧取得
export async function getPostList() {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post_list/`, {
    method: 'GET',
  })
  const posts = await apiRes.json()
  return posts
}

//投稿一覧ID取得
export async function getPostIds() {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post_list/`, {
    method: 'GET',
  })
  const posts = await apiRes.json()

  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    }
  })
}


//投稿詳細取得
export async function getPostDetail(id) {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post_detail/${id}/`, {
    method: 'GET',
  })
  const post = await apiRes.json()
  return post
}

