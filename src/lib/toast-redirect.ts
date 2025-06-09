import { APIError } from 'better-auth/api';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { toast as sonner } from 'sonner';

interface OptionsProp {
  loading: string;
  success: string;
  onSuccess?: () => void;
}

export const toast = async (actions: Promise<never>, options: OptionsProp) => {
  const toastId = sonner('toastId');
  sonner.loading(options.loading, { id: toastId });
  try {
    await actions;
  } catch (error) {
    if (isRedirectError(error)) {
      options.onSuccess?.();
      sonner.success(options.success, { id: toastId });
      throw error;
    }
    if (error instanceof APIError) {
      sonner.error(error.message, { id: toastId });
    }
  }
};
