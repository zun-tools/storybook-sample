import './Spinner.css';

export interface SpinnerProps {
  /** 画面には出さず、読み上げにだけ使う */
  label?: string;
  size?: 'sm' | 'md';
}

/** 終わるのを待っている間に出す回転の印。 */
export function Spinner({ label = '読み込み中', size = 'md' }: SpinnerProps) {
  return (
    <span className={`spinner spinner--${size}`} role="status">
      <span className="spinner__ring" />
      <span className="spinner__label">{label}</span>
    </span>
  );
}
