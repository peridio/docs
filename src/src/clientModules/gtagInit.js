// Safely initialize gtag to prevent "window.gtag is not a function" errors

export default (function() {
  if (typeof window !== 'undefined') {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Create a safe gtag function that queues calls until the real gtag is loaded
    if (!window.gtag) {
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
    }
  }
})();