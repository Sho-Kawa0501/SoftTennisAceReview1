import { useFormContext } from 'react-hook-form'
import React, { ForwardRefRenderFunction } from 'react'

type TextInputProps = {
  name: string
  label: string
  type?: string
  placeholder?: string
  
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = 
  ({ name, label, type, placeholder, }: TextInputProps,ref) => {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        {...register(name,)}
        ref={ref}
      />
    </div>
  )
}

export default React.forwardRef(TextInput)
