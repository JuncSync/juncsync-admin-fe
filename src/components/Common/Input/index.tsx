import classNames from 'classnames';
import { InputHTMLAttributes, ReactElement, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      containerClassName,
      inputClassName,
      type,
      disabled,
      onClick,
      value,
      ...args
    },
    ref,
  ): ReactElement => {
    return (
      <div
        className={`relative flex items-center ${containerClassName} `}
        onClick={onClick}
      >
        <input
          className={`font-normal text-lg text-gray_900 border border-solid border-gray_300 rounded-lg placeholder:text-lg placeholder-gray_400 ${classNames(
            {
              'cursor-not-allowed bg-gray_100': disabled,
              'bg-white': !disabled,
            },
          )} ${inputClassName}`}
          type={type}
          disabled={disabled ?? false}
          ref={ref}
          value={value}
          {...args}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
