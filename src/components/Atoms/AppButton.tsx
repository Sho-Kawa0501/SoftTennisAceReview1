import React,{ButtonHTMLAttributes} from 'react'

type AppSubmitButtonProps = {
  text: string
  onClick?: () => void
  type:ButtonHTMLAttributes<HTMLButtonElement>['type']
  color:string
  className?:string,
}

const AppButton = React.memo(({ text,onClick,type,color,className}:AppSubmitButtonProps) => {
  const backgroundColors = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
  }
  const hoverColors = {
    red: 'hover:bg-red-600',
    green: 'hover:bg-green-600',
    blue: 'hover:bg-blue-600',
  }
  return (
    <button 
      className={`${backgroundColors[color]} ${hoverColors[color]} ${className} m-1 text-white px-4 py-2 rounded-md mr-2 transition duration-300`}
      type={type}
      onClick={onClick}>
      {text}
    </button>
  )
})

AppButton.displayName = "AppSubmitButton"
export default AppButton
