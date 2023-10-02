import { AppDispatch } from "app/store";
import { 
  fetchAsyncCheckAuth,
  fetchAsyncGetRefreshToken,
  fetchAsyncNewToken
} from "./accountSlice";
import axios from "axios";

export const reloadFunction = async (dispatch: AppDispatch) => {
  try {
    // const resultCheckAuth = await dispatch(fetchAsyncCheckAuth())
    // if(fetchAsyncCheckAuth.fulfilled.match(resultCheckAuth)) {
      const result = await dispatch(fetchAsyncGetRefreshToken());
      const csrfToken = await fetchCsrfToken()
      if (fetchAsyncGetRefreshToken.fulfilled.match(result)) {
        console.log(result.payload.refresh)
        await dispatch(fetchAsyncNewToken(
          {refresh:result.payload.refresh,csrfToken:csrfToken}
        )); // Use access token
        // await dispatch(fetchAsyncCheckAuth())
        //ここにログインユーザーを取得するauth系の非同期関数を使用する
      } else {
        // 例: refreshTokenが失敗した場合、ログインページへリダイレクトする
        console.log()
      }
    // } else if (fetchAsyncCheckAuth.rejected.match(resultCheckAuth))
    // console.log()
} catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};

export const authenticateAndFetchNewToken = async (dispatch: AppDispatch) => {
  try {
    const authResult = await dispatch(fetchAsyncCheckAuth());

    if (fetchAsyncCheckAuth.fulfilled.match(authResult)) {
      const csrfToken = await fetchCsrfToken();
      console.log("csrftoken"+csrfToken)
      const refreshTokenData = await getRefreshToken();
      console.log("refresh"+refreshTokenData)
     

      if (csrfToken && refreshTokenData?.refresh) {
        const newToken = await getNewToken(refreshTokenData.refresh, csrfToken);
        return newToken; // You might want to dispatch an action here to save the new token in your state
      } else {
        console.error("Failed to obtain either CSRF token or refresh token");
        throw new Error("Token retrieval failed");
      }
    } else {
      console.error("Authentication check failed");
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error('Error in the authentication flow:', error);
    throw error;
  }
  
}




//csrfトークン取得
export const fetchCsrfToken = async (): Promise<string> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/csrf/create/`,
    {
      withCredentials: true,
    }
    )
    return res.data.csrfToken;
  } catch (error) {
    throw new Error("Failed to fetch CSRF Token");
  }
};


// refreshToken APIを呼び出す関数
export const getRefreshToken = async () => {
  try {
    const res = await axios.get('/api/refreshToken',{
      withCredentials: true,
    });
    if (!res.data || !res.data.refresh) {
      console.error("Error fetching refresh token: Unexpected response format.");
      throw new Error("Unexpected response format.");
    }
    console.log("getRefresh"+res.data)
    return res.data
  } catch (error) {
    console.error("Error fetching refresh token:", error.message);
    throw error;
  }
}

//pages/api/refreshToken.tsのRouteAPIのコードを使用する関数
//pages/api/refresTokens.ts

// newToken APIを呼び出す関数
//csrftokenを引数に設定
export const getNewToken = async (refreshToken:string,csrfToken: string) => {
  try {
    const response = await axios.post('/api/newToken', { 
      refresh: refreshToken, 
      csrfToken: csrfToken,
    });
    return response.data;  // この戻り値には新しいtokenが含まれているはずです
  } catch (error) {
    console.error("Error fetching new token:", error);
    throw error;
  }
}

//csrfトークンを取得する処理もこの中で定義してしまう。


// 上記2つの関数を組み合わせ、まずrefreshTokenを取得し、次にnewTokenを取得する関数
// export const refreshAndGetNewToken = async () => {
//     try {

//         const { refresh } = await getRefreshToken();
//         const newToken = await getNewToken(refresh);
//         return newToken;
//     } catch (error) {
//         console.error("Error in refreshAndGetNewToken:", error);
//         throw error;
//     }
// }

//戻り値は


// 使用例
// refreshAndGetNewToken()
//     .then(newToken => {
//         console.log("New token received:", newToken);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });
