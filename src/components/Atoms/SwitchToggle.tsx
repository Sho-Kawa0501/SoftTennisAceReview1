type CheckBoxProps = {
  label: string
  isChecked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SwitchToggle = ({ label, isChecked, onChange }: CheckBoxProps) => {
  return (
    <div className="flex items-center justify-start">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="ml-2 relative">
        <input type="checkbox" id={`switch-${label}`} className="sr-only" checked={isChecked} onChange={onChange} />
        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
          isChecked ? 'translate-x-6' : ''
        }`}></div>
      </div>
    </div>
  )
}

export default SwitchToggle
