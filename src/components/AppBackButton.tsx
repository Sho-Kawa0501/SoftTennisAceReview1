import React from "react";
type ButtonProps = {
  text: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

const AppBackButton = React.memo(({ text, onClick, className = "" }: ButtonProps) => {
  return (
    <button 
      className={`button-default ${className}`} 
      onClick={onClick} 
    >
      {text}
    </button>
  );
})

export default AppBackButton;