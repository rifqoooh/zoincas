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
  id: string | undefined;
}

export type ModalStoreId = {
  id: string | undefined;
  isOpen: boolean;
  onOpen: (props?: onOpenProps) => void;
  onClose: () => void;
};

export const createModalStoreId = () => {
  return create<ModalStoreId>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (props?: onOpenProps) => set({ id: props?.id, isOpen: true }),
    onClose: () => set({ id: undefined, isOpen: false }),
  }));
};
