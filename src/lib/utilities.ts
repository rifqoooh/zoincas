import type * as React from 'react';

import { type ClassValue, clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';

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
