import React,{useEffect,useLayoutEffect,useRef} from "react"
import { NextPage } from "next"
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { GetDerivedStateFromError } from "react"
import { setIsLoading,resetIsLoading } from "features/app/appSlice"
import { useReloadFunction } from "hooks/account/useReloadFunction"
// import { useReload } from "hooks/auth"
import { selectIsAuthenticated,selectLoginUser } from "features/account/accountSlice"

interface AuthProps {
  children: React.ReactNode;  // ここでchildrenの型を明示的に定義
}


export const Auth:React.FC<AuthProps> = ({ children }) => {
  const dispatch:AppDispatch = useDispatch()
  const loginUser = useSelector((selectLoginUser))
  const isAuthenticated = useSelector(selectIsAuthenticated)
  useEffect(() => {
    console.log("Auth Component Mounted");
  }, []);
  useReloadFunction()

  return (
    <>{children}</>
  )
}

export default React.memo(Auth)