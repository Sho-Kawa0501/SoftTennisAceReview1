import React,{useState,useContext,createContext} from 'react'
import { Rings } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { RootState } from "app/store"

const LoadingSpinner = () => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white flex justify-center items-center">
        <Rings color="#F59E00" width={100} height={100} />
      </div>
      )}
    </>
  )
}

export default LoadingSpinner