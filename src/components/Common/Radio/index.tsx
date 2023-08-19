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
  ...props
}: Props): ReactElement => {
  return (
    <label className="flex items-center gap-2">
      <div className="relative">
        <input
          className="appearance-none w-4 h-4 bg-white border border-solid border-gray_300 rounded-lg checked:border checked:border-solid checked:border-orange"
          type="radio"
          name={name}
          checked={checked}
          value={value ?? name}
          onChange={handleChange}
          {...props}
        />
        <span
          className={`absolute top-[22.5%] left-[25%] w-2 h-2 rounded-[4px] bg-orange ${classNames(
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
