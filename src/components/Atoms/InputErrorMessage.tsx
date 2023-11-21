type InputErrorMessageProps = {
  errorMessage:string | null
}

const InputErrorMessage = ({errorMessage}:InputErrorMessageProps) => {
  return (
    <p className="text-red-600">{errorMessage}</p>
  )
}

InputErrorMessage.displayName = "InputErrorMessage"
export default InputErrorMessage