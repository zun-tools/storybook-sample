import './Checkbox.css';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

/** 1つの項目をオン・オフするチェックボックス。 */
export function Checkbox({ label, checked, onChange, disabled }: CheckboxProps) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
