import React,{useEffect,} from "react"
import { useRouter } from "next/router"
import { useSelector, } from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { 
  selectIsAuthenticated,
} from "features/account/accountSlice"
export const useAuthGuard = () => {
  const router = useRouter()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
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
