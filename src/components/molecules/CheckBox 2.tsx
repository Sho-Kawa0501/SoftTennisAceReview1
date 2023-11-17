interface CheckBoxProps {
  label: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ label, isChecked, onChange }: CheckBoxProps) => {
  return (
    <div className="flex items-center mb-1">
      <label htmlFor={label} className={`p-2 cursor-pointer ${isChecked ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-black'} rounded-md`}>
        <input type="checkbox" id={label} className="sr-only" checked={isChecked} onChange={onChange} />
        {label}
      </label>
    </div>
  )
}

export default CheckBox;