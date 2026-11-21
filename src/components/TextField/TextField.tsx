import { useId } from 'react';
import './TextField.css';

export interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** 入力の誤り。欄の下に赤で出る */
  error?: string;
  id?: string;
  type?: 'text' | 'search';
}

/** 見出しつきの1行の文字入力。 */
export function TextField({ label, value, onChange, placeholder, error, id, type = 'text' }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {error && <p className="field__error">{error}</p>}
    </div>
  );
}
