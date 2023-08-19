import classNames from 'classnames';
import {
  Dispatch,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  SetStateAction,
} from 'react';

import { ModalProps } from './Modal.type';

const Modal = ({
  modalChildren,
  buttons,
  setIsOpen,
  onCustomCloseAction,
}: ModalProps & {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onCustomCloseAction?: (() => void) | undefined;
}): ReactElement => {
  const onClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget === event.target) {
      if (onCustomCloseAction) {
        onCustomCloseAction();
      }
      setIsOpen(false);
    }
  };

  const onKeyUpOutside: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      if (onCustomCloseAction) {
        onCustomCloseAction();
      }
      setIsOpen(false);
    }
  };

  return (
    <div
      className="z-50 fixed top-0 left-0 w-screen h-screen bg-black_300"
      onClick={onClickOutside}
      onKeyUp={onKeyUpOutside}
    >
      <div className="min-w-[736px] min-h-[460px] fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white p-8 rounded-xl flex flex-col">
        <header className="w-full flex items-center justify-end"></header>
        <main className="flex flex-col items-center justify-center text-center whitespace-pre-line flex-grow font-normal text-black">
          {modalChildren}
        </main>
        <footer className="flex items-center justify-end gap-2 mt-5">
          {buttons.map((button) => (
            <button
              key={button.type}
              className={classNames(
                'min-w-[78px] min-h-[30px] py-[6px] px-4 flex justify-center items-center rounded-[6px] cursor-pointer font-semibold text-sm',
                {
                  'bg-orange text-white': button.type === 'Primary',
                  'bg-white text-orange border-orange border border-solid':
                    button.type === 'Secondary',
                },
              )}
              onClick={button.action}
            >
              {button.text}
            </button>
          ))}
        </footer>
      </div>
    </div>
  );
};

export default Modal;
