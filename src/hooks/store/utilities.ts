import { create } from 'zustand';

export interface onOpenProps {
  id?: string;
  onSuccess?: () => void;
}

export interface onCloseProps {
  reset: boolean;
}

export interface ModalStore {
  id: string | undefined;
  isOpen: boolean;
  onOpen: (props?: onOpenProps) => void;
  onClose: (props?: onCloseProps) => void;
  onSuccessCallback: (() => void) | undefined;
}

export const createModalStore = () => {
  return create<ModalStore>((set, get) => ({
    id: undefined,
    onSuccessCallback: undefined,
    isOpen: false,
    onOpen: (props?: onOpenProps) => {
      set({
        id: props?.id,
        isOpen: true,
        onSuccessCallback: props?.onSuccess,
      });
    },
    onClose: (props: onCloseProps = { reset: false }) => {
      const id = props.reset ? undefined : get().id;
      const onSuccessCallback = props.reset
        ? undefined
        : get().onSuccessCallback;

      set({ id, isOpen: false, onSuccessCallback });
    },
  }));
};

export interface onOpenManyProps {
  ids?: string[];
  onSuccess?: () => void;
}

export interface onCloseManyProps {
  reset: boolean;
}

export interface ModalManyStore {
  ids: string[] | undefined;
  isOpen: boolean;
  onOpen: (props?: onOpenManyProps) => void;
  onClose: (props?: onCloseManyProps) => void;
  onSuccessCallback: (() => void) | undefined;
}

export const createModalManyStore = () => {
  return create<ModalManyStore>((set, get) => ({
    ids: undefined,
    onSuccessCallback: undefined,
    isOpen: false,
    onOpen: (props?: onOpenManyProps) => {
      set({
        ids: props?.ids,
        isOpen: true,
        onSuccessCallback: props?.onSuccess,
      });
    },
    onClose: (props: onCloseManyProps = { reset: false }) => {
      const ids = props.reset ? undefined : get().ids;
      const onSuccessCallback = props.reset
        ? undefined
        : get().onSuccessCallback;

      set({ ids, isOpen: false, onSuccessCallback });
    },
  }));
};
