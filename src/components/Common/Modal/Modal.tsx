import classNames from 'classnames';
import {
  Dispatch,
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
  const onClose = (): void => {
    if (onCustomCloseAction) {
      onCustomCloseAction();
    }
    setIsOpen(false);
  };

  const onClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget === event.target) {
      if (onCustomCloseAction) {
        onCustomCloseAction();
      }
      setIsOpen(false);
    }
  };

  return (
    <div
      className="z-50 fixed top-0 left-0 w-screen h-screen bg-[#ACACAC]"
      onClick={onClickOutside}
    >
      <div className="min-w-[936px] min-h-[410px] fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white px-[58px] pt-[36px] pb-[53px] rounded-xl flex flex-col">
        <header className="w-full flex items-center justify-end">
          {/* <img
            className="w-6 h-6 cursor-pointer"
            src="/icons/close.svg"
            alt="닫기"
            onClick={onClose}
          /> */}
        </header>
        <main className="flex flex-col mb-[65px] items-center justify-center text-center whitespace-pre-line flex-grow font-normal text-black">
          {modalChildren}
        </main>
        <footer className="flex items-center justify-end gap-[14px]">
          {buttons.map((button) => (
            <button
              key={button.type}
              className={classNames(
                'w-[204px] h-[50px] flex justify-center items-center border border-solid rounded-[8px] font-bold text-base cursor-pointer',
                {
                  'bg-orange text-white border-[#D9D9D9]':
                    button.type === 'Primary',
                  'bg-white text-black': button.type === 'Secondary',
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
