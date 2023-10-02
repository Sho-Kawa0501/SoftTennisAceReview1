import React,{ useState,useEffect,useMemo,useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { 
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { fetcherWithCredential } from 'lib/posts'
import cookie from 'cookie'
import { AppDispatch,RootState } from 'app/store'
import { useRouter } from 'next/router'
import { 
  getItemDetail,
  getItemIds
}from 'lib/posts'
import { fetchAsyncGetMyReview } from 'features/review/slice'
import useSWR,{ mutate } from 'swr'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
// import { IndexData } from 'types'
import { PlusCircleIcon } from '@heroicons/react/outline'
import FavoriteReview from 'features/review/FavoriteReview'
import ReviewDeleteModal from 'features/review/ReviewDeleteModal'
import ItemDetail from 'components/ItemDetailCard'
import ReviewCard from 'components/ReviewCard'
import ReviewCardList from 'components/ReviewCardList'

export interface IndexData {
  id:string,
  title:string,
  content:string,
  image: string,
  favorites_count:number,
  user:{
    id:string,
    name:string,
    image:string,
  },
  item:{
    id:number,
  }
}


type ReviewPageProps = InferGetStaticPropsType<typeof getStaticProps>

const fetcher = (url:string) => fetch(url).then((res) => res.json())


//変更点...
//Itemの情報をSSGではなくてcontextから取得する
//レビューリストはSSRで取得
export const ItemDetailPage: NextPage<ReviewPageProps> = ({staticItem,}) => {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const loginUser = useSelector((state: RootState) => state.account.loginUser)
  const isAuthenticated = useSelector((state:RootState) => state.account.isAuthenticated)
  const isDeleteReview = useSelector((state: RootState) => state.review.isDeleteReview)
  // const isMyReview = useSelector((state:RootState) => state.review.myReview)
  // console.log(isMyReview)
  // const [isMyReview,setIsMyReview] = useState<IndexData | null>()

  
  //レビュー対象のレビューリスト取得
  // const {data: myReviewData} = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/myreview_list/${staticItem.id}`,
  //   fetcher,
  // )
  
  const { data: allReview,error:allReviewError,mutate: mutateAllReview} = useSWR<IndexData[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review_list/${staticItem.id}`,
    fetcher,
  )
  console.log("allReview",allReview && allReview)

  const separateReviews = (allReview: IndexData[], userId: string) => {
    const result = allReview.reduce(
      (acc, review) => {
        if (review.user.id === userId) {
          acc.isMyReview = review;
        } else {
          acc.OtherUserReviews = [...acc.OtherUserReviews, review];
        }
        return acc;
      },
      { isMyReview: null as IndexData | null, OtherUserReviews: [] as IndexData[] }
    );
    return result;
  }
  const reviewsSeparated = useMemo(() => {
    if (allReview && loginUser && loginUser.id) {
      return separateReviews(allReview, loginUser.id);
    }
    return { isMyReview: null, OtherUserReviews: [] };
  }, [allReview, loginUser]);

  const { isMyReview, OtherUserReviews } = reviewsSeparated
  
  
  

  useEffect(() => {
    mutateAllReview()
    if (loginUser.id) {
      separateReviews
    }

  },[])

  
  return (
    <>
      <Head>
        <title>Review Detail</title>  
      </Head>
      <ItemDetail item={staticItem} />
      {/* ここで分岐処理を記述する。 */}
      {!isAuthenticated && 
        (
          <ReviewCardList reviews={allReview} />
        //   allReview 
        //   ? allReview.map(review => (
        //     <div key={review.id}>
        //       <p>{review.id}</p>
        //     </div>
        //   ))
        // :<><p>no data</p></>
      )}
      {isAuthenticated && 
        (
          isMyReview && isMyReview.id
            ? <>

              <p>You've already reviewed a review for this item.</p>
              {/* <p>{isMyReview.title}</p> */}
              <ReviewCard review={isMyReview} />
              <div>
                {loginUser && loginUser.id === isMyReview.user.id && (
                  
                <div className="text-sm flex space-x-4">
                  <div>
                    <Link href={`/review/${isMyReview.id}/edit`}>
                      編集
                    </Link>
                  </div>
                  <ReviewDeleteModal reviewId={isMyReview.id} {...isMyReview} />
                </div>
                )}
              </div>
              </>
            : <Link href={`/review/new?itemId=${staticItem.id}`}>
                <PlusCircleIcon className="h-7 w-7" />
              </Link>
        )
      }
    {/* コンポーネントで分けられる...itemidを渡す */}
      
      <div className="col-span-2">
      {/* コンポーネント分け...reviews情報を渡す */}
      {/* 全ての投稿のuserIdの中にログインユーザーのidと一致するものがあればTrueにする関数 */}
      {OtherUserReviews && (
        <ReviewCardList reviews={OtherUserReviews} />
    //     OtherUserReviews.map((data: IndexData) => (
    //       <div className="border mb-6 bg-white" key={data.id}>
    //         <div className="flex items-center space-x-4 p-4">
    //           <Image
    //             src={data.user.image}
    //             className="rounded-full"
    //             alt={data.user.name}
    //             width={50}
    //             height={50} />
    //           <Image
    //             src={data.image}
    //             alt={data.title}
    //             width={100}
    //             height={100} />
    //           <div>
    //             <div>{data.user.name}</div>
    //             <div>{data.title}</div>
    //             <div>{data.item.id}</div>
                
    //             {isAuthenticated && (
    //               <FavoriteReview reviewId={data.id} userId={loginUser.id} />
    //             )}
                
    //           </div>
    //         </div>
    //           {loginUser && loginUser.id === data.user.id && (
    //             <div className="text-sm flex space-x-4">
    //               <div>
    //                 <Link href={`/review/${data.id}/edit`}>
    //                   編集
    //                 </Link>
    //               </div>
    //               <ReviewDeleteModal reviewId={data.id} {...data} />
    //             </div>
    //           )}
    //           <div className="m-4">
    //             <div>{data.user.name}</div>
    //             <div className="truncate">{data.content}</div>
    //           </div>
    //         </div>
        )}
      </div>
    </>
  )
}


export default ItemDetailPage

export const getStaticPaths: GetStaticPaths = async () => {
  //const reviewId = (await getReviewIds()) //reviewからidだけを取り出し、string型に変換する関数

  const paths = await getItemIds()

  return {
    paths,
    fallback: false,
  }
}


export const getStaticProps: GetStaticProps = async ({ params } :GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined')
  }

  const itemNumberId = Number(params.itemId)
  const staticItem = await getItemDetail(itemNumberId)

  return {
    props: {
      staticItem,
    },
    revalidate: 64800,
  }
}

//allReviewで全てのレビューを持ってくる
  //ログインしているならレビューをループさせて自分のレビューとそれ以外のレビューを振り分ける
  //
  
  // const { data: otherUserReviews, error:otherUserReviewsError,mutate: mutateReviews } = isAuthenticated 
  //   ? useSWR<IndexData[]>(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/otherusers_review_list/${staticItem.id}`,
  //       (url: string) => fetcherWithCredential(url, 'get')
  //     )
  //   : { data: null,error: null, mutate: null };
  

  // const { data: otherUserReviews, mutate: mutateReviews } = isAuthenticated ?  // isAuthenticatedをチェック
  //   useSWR(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/otherusers_review_list/${staticItem.id}`,
  //     (url: string) => fetcherWithCredential(url, 'get',)
  //   )
  //   : { data: null, mutate: null }

  // const memoizedReviews = useMemo(() => reviews, [reviews])
  
//   useEffect(() => {    
//   if (loginUser.id) {  // isAuthenticatedをチェック
//     dispatch(fetchAsyncGetMyReview(staticItem.id))
//   }
// }, [])

  // useEffect(() => {
  //   if (loginUser.id && mutateReviews) {
  //     mutateReviews()

  //   }
  // }, [])