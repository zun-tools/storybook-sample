import { useId } from 'react';
import './Select.css';

export interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  id?: string;
}

/** 見出しつきの選択欄。選べる項目が少なく、決まっているときに使う。 */
export function Select({ label, value, onChange, options, id }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className="select">
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
