import React, { useCallback,useRef,ForwardRefRenderFunction } from 'react'
type InputImageProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputImage:ForwardRefRenderFunction<HTMLInputElement,InputImageProps> =
  ({ onChange }:InputImageProps,ref) => {

  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ref && 'current' in ref) {
      ref.current?.click();
    }
  },[ref])
  
  return (
    <div className="mb-4">
      <div>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        ref={ref}
        className="hidden cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded"
      />
      </div>
      <button 
        onClick={handleButtonClick} 
        className="cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded"
      >
        Upload Image
      </button>
    </div>
  )
}

InputImage.displayName = "InputImage"
export default React.forwardRef(InputImage)
