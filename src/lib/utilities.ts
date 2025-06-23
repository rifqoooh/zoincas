import type * as React from 'react';

import { type ClassValue, clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';

export type Prettify<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & unknown;


export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const mergeRefs = <T = any>(
  refs: Array<React.RefObject<T> | React.Ref<T> | undefined | null>
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.RefObject<T | null>).current = value;
      }
    });
  };
};


export function formatCurrency(
  value: number | string,
  options: {
    currency?: 'USD' | 'IDR';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'IDR', notation = 'standard' } = options;

  // convert to float if passed price is string
  const number = typeof value === 'string' ? parseFloat(value) : value;

  return new Intl.NumberFormat('id', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(number);
}

