import React,{useEffect,useRef} from "react"
import { useSelector, useDispatch ,shallowEqual} from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { 
  fetchAsyncCheckAuth,
  fetchAsyncRefreshToken,
  fetchAsyncNewAccessToken,
  selectIsAuthenticated,
} from "features/account/accountSlice";
import { fetchCsrfToken } from "lib/account";
import { fetchAsyncMyReview } from "features/review/slice";
import useNavigation from "hooks/utils/useNavigation";


export const useReloadFunction = () => {
  const dispatch:AppDispatch = useDispatch();
  const { handleHome } = useNavigation()
  
  const isAuthenticated = useSelector(selectIsAuthenticated, shallowEqual);
  

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        // handleHome()
        return;
      }
      console.log("reloadF発動");

      try {
        const resultRefreshToken = await dispatch(fetchAsyncRefreshToken());
        const csrfToken = await fetchCsrfToken();
        if (fetchAsyncRefreshToken.fulfilled.match(resultRefreshToken) && csrfToken) {
          await dispatch(fetchAsyncNewAccessToken(
            { refresh: resultRefreshToken.payload.refresh, csrfToken: csrfToken }
          ));
          await dispatch(fetchAsyncMyReview());
          await dispatch(fetchAsyncCheckAuth());
        } 
      } catch (error) {
        console.error('Authentication failed:', error);
        handleHome()
      }
    };

    fetchData();
  }, [isAuthenticated,])
};
