import { useFormContext } from 'react-hook-form'
import React, { ForwardRefRenderFunction } from 'react'

type TextAreaProps = {
  name: string
  label?: string
  placeholder: string
  errorMessage?: string
}

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = ({
  name, label, placeholder,
}: TextAreaProps,ref) => {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="mb-4">
      <div className="mb-1">{label}</div>
      <textarea
        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-4 hover:bg-gray-100 min-h-[150px]"
        placeholder={placeholder}
        {...register(name, )}
        ref={ref}
      />
    </div>
  )
}

export default React.forwardRef(TextArea)