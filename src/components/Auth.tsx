import React,{useEffect,useLayoutEffect,useRef} from "react"
import { NextPage } from "next"
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { setIsLoading,resetIsLoading } from "features/app/appSlice"
import { useRouter } from 'next/router'
import { 
  fetchAsyncCheckAuth,
  fetchAsyncGetRefreshToken,
  fetchAsyncNewToken
} from 'features/account/accountSlice'
import { authenticateAndFetchNewToken,reloadFunction } from "features/account/apiService"

interface AuthProps {
  children: React.ReactNode;  // ここでchildrenの型を明示的に定義
}

export const Auth:NextPage<AuthProps> = ({ children }) => {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const loginUser = useSelector((state:RootState) => state.account.loginUser)
  // const loginUserId = loginUser.id
  const isAuthenticated = useSelector((state:RootState) => state.account.isAuthenticated)
  
  const fn = async () => {  
    try {
      await dispatch(setIsLoading())
      
      await reloadFunction(dispatch)
      
     
    
    }catch(error) {
      console.log(error)
    } finally {
      setTimeout(async () => {
        dispatch(resetIsLoading())
        await dispatch (fetchAsyncCheckAuth())
      }, 200)
    }
  }

  
    
  const isInitialMount = useRef(true);

    if (isInitialMount.current) {
        fn()
        isInitialMount.current = false;
    }

  // useEffect(() => {
  //   const fn = async () => {
  //     try {
  //       await dispatch(setIsLoading());
  //       await authenticateAndFetchNewToken(dispatch);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setTimeout(() => {
  //         dispatch(resetIsLoading());
  //       }, 200);
  //     }
  //   };
    
  //   fn();
  // }, [dispatch]);
  
  return (
    <>{children}</>
  )
}

//   const resultCheckAuth = await dispatch(fetchAsyncCheckAuth())
    //     if(fetchAsyncCheckAuth.fulfilled.match(resultCheckAuth)) {
    //       const result = await dispatch(fetchAsyncGetRefreshToken());
    //       if (fetchAsyncGetRefreshToken.fulfilled.match(result)) {
    //         await dispatch(fetchAsyncNewToken(result.payload.)); // Use access token
    //       } else {
    //         // 例: refreshTokenが失敗した場合、ログインページへリダイレクトする
    //         console.log("error")
    //       }
    //     } else if (fetchAsyncCheckAuth.rejected.match(resultCheckAuth))
    //     console.log("checkauthrejected")
    // } catch (error) {
    //   console.log("authError")
    //   console.error("An error occurred:", error);
    //   // 必要に応じてエラーハンドリングをここに追加する