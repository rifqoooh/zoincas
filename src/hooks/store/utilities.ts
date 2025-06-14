import { create } from "zustand";

export type ModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const createModalStore = () => {
  return create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};

export interface onOpenProps {
  id?: string;
}

export interface onCloseProps {
  reset: boolean;
}

export type ModalStoreId = {
  id: string | undefined;
  isOpen: boolean;
  onOpen: (props?: onOpenProps) => void;
  onClose: (props?: onCloseProps) => void;
};

export const createModalStoreId = () => {
  return create<ModalStoreId>((set, get) => ({
    id: undefined,
    isOpen: false,
    onOpen: (props?: onOpenProps) => {
      set({ id: props?.id, isOpen: true });
    },
    onClose: (props: onCloseProps = { reset: false }) => {
      props.reset
        ? set({ id: undefined, isOpen: false })
        : set({ id: get().id, isOpen: false });
    },
  }));
};
