import { Dispatch, ReactNode, SetStateAction } from 'react';

export type ModalButton = {
  type: 'Primary' | 'Secondary';
  text: string;
  action: () => void;
};

export type ModalProps = {
  modalChildren: ReactNode;
  buttons: ModalButton[];
};

export interface IModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setData: Dispatch<SetStateAction<ModalProps>>;
  render: () => ReactNode;
}
