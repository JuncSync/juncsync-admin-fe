import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  title?: string;
  value?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({
  checked,
  name,
  title,
  value,
  handleChange,
  disabled = false,
  ...props
}: Props): ReactElement => {
  return (
    <label className="flex items-center gap-2">
      <div className="relative flex items-center">
        <input
          className={`appearance-none w-4 h-4 border border-solid border-gray_300 rounded-lg checked:border checked:border-solid checked:border-orange ${classNames(
            {
              'bg-white': !disabled,
              'bg-gray_100': disabled,
            },
          )}`}
          type="radio"
          name={name}
          checked={checked}
          value={value ?? name}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <span
          className={`absolute top-1/4 left-1/4 w-2 h-2 rounded-[4px] bg-orange ${classNames(
            {
              hidden: !checked,
              block: checked,
            },
          )}`}
        ></span>
      </div>
      {title && (
        <span className="text-lg font-medium text-gray_900">{title}</span>
      )}
    </label>
  );
};

export default Radio;
