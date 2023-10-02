import React,{} from "react"
import { useSelector } from "react-redux"
import { RootState } from "app/store"
import LoadingSpinner from "./LoadingSpinner"

interface AppRootProps {
  children: React.ReactNode;  // ここでchildrenの型を明示的に定義
}

export const AppRoot: React.FC<AppRootProps> = ({ children }) => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  
  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return <>{children}</>;
}