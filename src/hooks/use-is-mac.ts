import * as React from 'react';

export function useIsMac() {
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    // Use userAgentData if available (modern browsers)
    if ('userAgentData' in navigator && navigator.userAgentData) {
      // @ts-expect-error - userAgentData API not fully typed in DOM lib yet
      navigator.userAgentData.getHighEntropyValues(['platform']).then((ua) => {
        setIsMac(ua.platform.toLowerCase().includes('mac'));
      });
    } else {
      // Fallback to userAgent parsing
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMac(userAgent.includes('mac'));
    }
  }, []);

  return isMac;
}
