interface InputErrorMessageProps {
  errorMessage:string | null
}

const InputErrorMessage = ({errorMessage}:InputErrorMessageProps) => {
  return (
    <p className="text-red-600">{errorMessage}</p>
  )
}

export default InputErrorMessage

// {errors.password && 
//   <InputErrorMessage errorMessage={errors.password.message || null} />
// }