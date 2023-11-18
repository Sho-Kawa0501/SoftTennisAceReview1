import React,{useEffect,useLayoutEffect,useRef} from 'react'
import { useAuthReload } from 'hooks/account/useAuthReload'

interface ReloadProps {
  children: React.ReactNode  // ここでchildrenの型を明示的に定義
}

export const AuthProvider:React.FC<ReloadProps> = ({ children }) => {
  useEffect(() => {
    console.log("Auth Component Mounted")
  }, [])
  useAuthReload()

  return (
    <>{children}</>
  )
}

export default React.memo(AuthProvider)