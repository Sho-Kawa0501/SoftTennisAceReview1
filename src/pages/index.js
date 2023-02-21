import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getPostList } from '../lib/posts'
import useSWR from 'swr'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

//json形式で返す関数
const fetcher = (url) => fetch(url).then((res) => res.json())

const Index = ({ staticPosts }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state) => state.auth.user)

  const { data: posts, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post_list/`,
    fetcher,
    {
      fallbackData: staticPosts,
    }
  )

  useEffect(() => {
    mutate()
  }, [])

  if (router.isFallback || !posts) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <>
      <Head>
        <title>FullStackChannel</title>
      </Head>
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {posts &&
              posts.map((data) => (
                <div className="border mb-6 bg-white" key={data.id}>
                  <div className="flex items-center space-x-4 p-4">
                    <Image
                      src={data.user.image}
                      className="rounded-full"
                      alt={data.user.name}
                      width={40}
                      height={40}
                      objectFit="cover"
                    />
                    <div>
                      <div>{data.user.name}</div>
                      <div>{data.title}</div>
                    </div>
                  </div>
                  <div>
                    <Link href={`/post/${data.id}`} legacyBehavior>
                      <a>
                        <Image
                          src={data.image}
                          className=""
                          alt={data.title}
                          width={1000}
                          height={1000}
                          objectFit="cover"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="m-4">
                    <div>{data.user.name}</div>
                    <div className="truncate">{data.content}</div>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-span-1">
            {user && (
              <div className="flex items-center space-x-4">
                <Image
                  src={user.image}
                  className="rounded-full"
                  alt={user.name}
                  width={50}
                  height={50}
                  objectFit="cover"
                />
                <div>{user.name}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const staticPosts = await getPostList()

  return {
    props: { staticPosts },
    revalidate: 1,
  }
}

export default Index