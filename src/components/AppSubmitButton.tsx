import React from 'react'
import { Rings } from 'react-loader-spinner'

type AppSubmitButtonProps = {
  text: string
  onClick?: () => void
}

const AppSubmitButton = React.memo(({ text,onClick }:AppSubmitButtonProps) => {
  return (
    <button className="button-yellow" type="submit" onClick={onClick}>
      {text}
    </button>
  )
})

export default AppSubmitButton
