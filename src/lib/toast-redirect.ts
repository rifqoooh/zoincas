import { APIError } from 'better-auth/api';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { toast as sonner } from 'sonner';

interface MessageProp {
  loading: string;
  success: string;
}

export const toast = async (actions: Promise<never>, message: MessageProp) => {
  const toastId = sonner('toastId');
  sonner.loading(message.loading, { id: toastId });
  try {
    await actions;
  } catch (error) {
    if (isRedirectError(error)) {
      sonner.success(message.success, { id: toastId });
      throw error;
    }
    if (error instanceof APIError) {
      sonner.error(error.message, { id: toastId });
    }
  }
};
