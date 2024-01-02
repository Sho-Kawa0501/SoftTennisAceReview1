import React,{useEffect,useRef} from 'react'
import { useSelector, useDispatch ,shallowEqual} from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { 
  fetchAsyncCheckAuth,
  fetchAsyncGetRefreshToken,
  fetchAsyncCreateAccessToken,
  selectIsAuthenticated,
} from 'features/account/accountSlice'
import { fetchCsrfToken } from 'lib/account'
import { fetchAsyncMyReview } from 'features/review/slice'
import useNavigation from 'hooks/utils/useNavigation'

export const useAuthReload = () => {
  const dispatch:AppDispatch = useDispatch()
  const { handleHome } = useNavigation()
  const isAuthenticated = useSelector(selectIsAuthenticated, shallowEqual)
  
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        return
      }
      console.log("reloadF発動")

      try {
        const resultRefreshToken = await dispatch(fetchAsyncGetRefreshToken())
        const csrfToken = await fetchCsrfToken()
        if (fetchAsyncGetRefreshToken.fulfilled.match(resultRefreshToken) && csrfToken) {
          await dispatch(fetchAsyncCreateAccessToken(
            { refresh: resultRefreshToken.payload.refresh, csrfToken: csrfToken }
          ))
          await dispatch(fetchAsyncMyReview())
          await dispatch(fetchAsyncCheckAuth())
        }
      } catch (error) {
        console.error('Authentication failed:', error)
        handleHome()
      }
    }

    fetchData()
  }, [isAuthenticated,])
}
