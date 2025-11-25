import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import './index.css';
import './i18n/config';
import App from './App.tsx';

const errorCounts = new Map<string, number>();

const showError = (message: string) => {
  const currentCount = errorCounts.get(message) || 0;
  const newCount = currentCount + 1;
  errorCounts.set(message, newCount);

  const displayMessage = newCount > 1 ? `${message} (x${newCount})` : message;
  
  toast.error(displayMessage, {
    id: message, // Use message as ID to prevent duplicates
    onDismiss: () => {
      errorCounts.delete(message);
    },
    onAutoClose: () => {
      errorCounts.delete(message);
    }
  });
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showError(`Error de conexión: ${error.message}`);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showError(`Error: ${error.message}`);
    },
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  </StrictMode>,
);
