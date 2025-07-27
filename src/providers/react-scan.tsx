'use client';

import { scan } from 'react-scan';

// react-scan must be imported before react
import { type JSX, useEffect } from 'react';

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return <></>;
}
