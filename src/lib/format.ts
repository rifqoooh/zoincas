import { format } from 'date-fns';

export function formatDate(date: Date | string | number | undefined) {
  if (!date) {
    return '';
  }

  return format(date, 'dd MMM yyyy');
}
