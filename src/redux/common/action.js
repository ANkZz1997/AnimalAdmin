import { startLoader, stopLoader } from './types';

// Start Loader
export const startLoading = () => ({
  type: startLoader,
});

// Stop Loader
export const stopLoading = () => ({
  type: stopLoader,
});