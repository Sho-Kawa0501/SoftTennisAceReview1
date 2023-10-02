interface CheckBoxProps {
  label: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ label, isChecked, onChange }: CheckBoxProps) => {
  return (
    <div>
      <input type="checkbox" id={label} checked={isChecked} onChange={onChange} />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default CheckBox;