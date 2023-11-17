import React,{useEffect,useRef} from "react"
import { useRouter } from "next/router";
import { useSelector, useDispatch ,shallowEqual} from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { 
  selectIsAuthenticated,
} from "features/account/accountSlice";
export const useAuthGuard = () => {
  const router = useRouter()
  const isAuthenticated = useSelector(selectIsAuthenticated)


  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    //両方falseならsigninに移動させる
    
    if (!isAuthenticated) {
      const currentPath = router.pathname

      router.push({
        pathname: '/',
        query: {
          redirect_to: currentPath,
        },
      })
    }
  }, [router, isAuthenticated])
}
