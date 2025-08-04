import React from 'react';

export default function Root({ children }) {
  // Fix gtag initialization timing issue
  React.useEffect(() => {
    // Ensure gtag is available before any calls are made
    if (typeof window !== 'undefined' && !window.gtag) {
      window.gtag = function() {
        // Queue gtag calls until the script is loaded
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(arguments);
      };
    }
  }, []);

  return <>{children}</>;
}