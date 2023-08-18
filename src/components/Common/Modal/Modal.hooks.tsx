import { ReactElement, useEffect, useState } from 'react';

import Modal from './Modal';
import { IModal, ModalProps } from './Modal.type';

interface Props {
  onCustomCloseAction?: () => void;
}

export const useModal: ({ onCustomCloseAction }?: Props) => IModal = (
  { onCustomCloseAction } = { onCustomCloseAction: () => {} },
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<ModalProps>({
    modalChildren: '',
    buttons: [],
  });

  const open = (): void => {
    setIsOpen(true);
  };
  const close = (): void => {
    setIsOpen(false);
  };

  const render = (): ReactElement => (
    <Modal
      modalChildren={data.modalChildren}
      buttons={data.buttons}
      setIsOpen={setIsOpen}
      onCustomCloseAction={onCustomCloseAction}
    />
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, [isOpen]);

  return { isOpen, open, close, setData, render };
};
