import { useFormContext } from 'react-hook-form'
import React, { useEffect,ForwardRefRenderFunction } from 'react'

type TextInputProps = {
  name: string
  label?: string
  type?: string
  placeholder?: string
}

const TextInputComponent: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = 
  ({ name, label, type, placeholder, }: TextInputProps,ref) => {
  const { register } = useFormContext()

  useEffect (() => {
    console.log("TextInputRegister"+register)
  },[register])

  return (
    <div className="mb-4">
  <label htmlFor={name} className="block text-gray-700 italic text-sm mb-2">{label}</label>
  <input 
    type={type}
    placeholder={placeholder}
    {...register(name)}
    ref={ref}
    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-4 hover:bg-gray-100"
  />
</div>
  )
}

// export default React.memo(React.forwardRef(TextInput))
const TextInput = React.forwardRef(TextInputComponent)
export default React.memo(TextInput)
