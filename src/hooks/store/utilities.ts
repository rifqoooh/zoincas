import { create } from 'zustand';

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

export interface onOpenWithSuccessCallbackProps {
  id?: string;
  onSuccess?: () => void;
}

export interface onCloseWithSuccessCallbackProps {
  reset: boolean;
}

export type ModalStoreIdWithSuccessCallback = {
  id: string | undefined;
  onSuccessCallback: (() => void) | undefined;
  isOpen: boolean;
  onOpen: (props?: onOpenWithSuccessCallbackProps) => void;
  onClose: (props?: onCloseWithSuccessCallbackProps) => void;
};

export const createModalStoreIdWithSuccessCallback = () => {
  return create<ModalStoreIdWithSuccessCallback>((set, get) => ({
    id: undefined,
    onSuccessCallback: undefined,
    isOpen: false,
    onOpen: (props?: onOpenWithSuccessCallbackProps) => {
      set({
        id: props?.id,
        isOpen: true,
        onSuccessCallback: props?.onSuccess,
      });
    },
    onClose: (props: onCloseWithSuccessCallbackProps = { reset: false }) => {
      const id = props.reset ? undefined : get().id;
      const onSuccessCallback = props.reset
        ? undefined
        : get().onSuccessCallback;

      set({ id, isOpen: false, onSuccessCallback });
    },
  }));
};
