import { ButtonHTMLAttributes, ReactElement } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'Primary' | 'Secondary';
  size: 'lg' | 'sm';
  text: string;
  customClassName?: string;
  onClick?: () => void;
}

const Button = ({
  buttonType,
  type,
  size,
  text,
  disabled = false,
  customClassName,
  onClick,
  onMouseOver,
}: Props): ReactElement => {
  const buttonStyles = {
    backgroundColor: buttonType === 'Primary' ? 'bg-orange' : 'bg-white',
    fontColor: buttonType === 'Primary' ? 'text-white' : 'text-orange',
    borderRadius: size === 'lg' ? 'rounded-[8px]' : 'rounded-[6px]',
    padding: buttonType === 'Primary' ? 'py-4 px-5' : 'py-2 px-5',
    border: buttonType === 'Secondary' && 'border border-solid border-orange',
    fontWeight: 'font-semibold',
    fontSize: size === 'lg' ? 'text-lg' : 'text-sm',
  } as const;
  return (
    <button
      type={type ?? 'button'}
      className={`flex justify-center items-center ${Object.values(
        buttonStyles,
      ).join(' ')} ${customClassName ?? ''}`}
      onClick={onClick}
      disabled={disabled}
      onMouseOver={onMouseOver}
    >
      {text}
    </button>
  );
};

export default Button;
