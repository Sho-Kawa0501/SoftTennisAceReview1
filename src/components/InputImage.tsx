import React, { useCallback,useRef,ForwardRefRenderFunction } from "react"

interface InputImageProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputImage:ForwardRefRenderFunction<HTMLInputElement,InputImageProps> =
  ({ onChange }:InputImageProps,ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  },[])
  
    //↓親コンポーネントにuseContextFormが使われているパターン
  return (
    <div>
      <input
        type="file"
        onChange={onChange}
        ref={fileInputRef}
      />
      <button onClick={handleButtonClick}>
      </button>
    </div>
  )
  }

  export default React.forwardRef(InputImage)
