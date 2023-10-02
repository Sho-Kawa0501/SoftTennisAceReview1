import { useFormContext } from 'react-hook-form'
import React, { ForwardRefRenderFunction } from 'react'

// TextAreaコンポーネントのProps型
type TextAreaProps = {
  name: string;
  label: string;
  placeholder: string;
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
        className="input-form h-72"
        placeholder={placeholder}
        {...register(name, )}
        ref={ref}
      />
      {/* {errorMessage && <p className="text-red-600">{errorMessage}</p>} */}
    </div>
  )
}

export default React.forwardRef(TextArea)