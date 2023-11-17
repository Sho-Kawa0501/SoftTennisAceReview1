import React,{useState,useContext,createContext,ReactNode} from 'react'
import { Rings } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { RootState } from "app/store"

type LoadingSpinnerProps = {
  children: ReactNode
}

const LoadingSpinner = ({ children }: LoadingSpinnerProps) => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex justify-center items-center">
        <Rings color="#F59E00" width={100} height={100} />
      </div>
    );
  }
  return <>{children}</>;
}

export default LoadingSpinner