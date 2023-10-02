import React,{ useEffect,createContext,useMemo} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { useRouter } from 'next/router'
import { getReviewList,getItemList, } from '../lib/posts'
import ItemFilterModal from 'features/item/ItemFilterModal'
import { setIsLoading,resetIsLoading } from 'features/app/appSlice'
import { fetchAsyncCheckAuth,fetchAsyncGetRefreshToken,fetchAsyncNewToken } from 'features/account/accountSlice'
import useSWR from 'swr'
import Head from 'next/head'
import { InferGetStaticPropsType,NextPage,GetStaticProps } from 'next'
import { IndexData } from 'types'
import { setItems,setBrands,setSeries,setPositions } from 'features/item/itemSlice'
import { Brand,Series,Position,ItemProps,Item } from 'features/item/ItemTypes'
import ItemCardList from 'components/ItemCardList'
import ReviewCardList from 'components/ReviewCardList'
import { getItemMetaDataList } from 'features/item/apiService'


type IcontextProps = {
  items: ItemProps[],
  brands: Brand[],
  series: Series[],
  positions: Position[],
}

export const ItemContext = createContext<IcontextProps>({
  items: [],
  brands: [],
  series: [],
  positions: [],
})

type ReviewPageProps = InferGetStaticPropsType<typeof getStaticProps>

//json形式で返す関数
const fetcher = (url:string) => fetch(url).then((res) => res.json())

const Index:NextPage<ReviewPageProps> = React.memo(({ staticReviews,staticItems,staticItemMetaData }:ReviewPageProps) => {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  
  const filteredItems = useSelector((state: RootState) => state.item.filteredItems)
  const { data: reviews,error, } = useSWR<IndexData[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/latest_review_list/`,
    fetcher,
    {
      fallbackData: staticReviews,
    }
  )


  // 選択されたそれぞれの値を更新して、ReduxStoreに保存するためにuseEffectを使用
  useEffect(() => {
    if(staticItems) dispatch(setItems(staticItems))
    if(staticItemMetaData) {
      dispatch(setBrands(staticItemMetaData.brands))
      dispatch(setSeries(staticItemMetaData.series))
      dispatch(setPositions(staticItemMetaData.positions))
    }
  }, [staticItems, staticItemMetaData,])

  const contextValue = useMemo(() => ({
    ...staticItemMetaData
  }), [staticItemMetaData])

  return (
    <>
      <Head>
        <title>AceRacketRealm</title>
      </Head>
      <ItemContext.Provider value={contextValue}>
        <ItemFilterModal />
      </ItemContext.Provider>
      <div className="flex flex-wrap">
        <ItemCardList items={filteredItems} />
      </div>
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-3 gap-4">
          </div>
          <div className="col-span-2">
            <ReviewCardList reviews={reviews} />
          </div>
      </div>
    </>
  )
})

export default Index

export const getStaticProps: GetStaticProps = async() =>  {
  //const staticReviews = await getReviewList()
  //Itemを取得する関数を使用して、変数に代入
  //関数3つ用意しなくても、1つ用意してbrand,series,position全て取得する方がいい
  //ItemInformation{Positionlist,BrandList,SeriesList}という形で取得できそう
  const staticItems = await getItemList()
  const staticItemMetaData = await getItemMetaDataList()

  return {
    props: { 
      staticItems,
      staticItemMetaData,
    },
    revalidate: 86400
  }
}