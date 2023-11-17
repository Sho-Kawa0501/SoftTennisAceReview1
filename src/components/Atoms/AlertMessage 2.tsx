import React from "react"

type AlertMessageProps = {
  message:string,
  color:string,

}
export const AlertMessage = ({message,color}:AlertMessageProps) => {
  if (!message) {
    return
  }
  const backgroundColors = {
    red: 'bg-red-200',
    green: 'bg-green-200',
    blue: 'bg-blue-200',
  };

  const textColors = {
    red: 'text-red-700',
    green: 'text-green-700',
    blue: 'text-blue-700',
  };
  
  return (
    <>
    <div className={`${backgroundColors[color]} ${textColors[color]} p-4 mb-4 rounded-md text-center`}>
      {message}
    </div>
    </>
  )
}

export default AlertMessage