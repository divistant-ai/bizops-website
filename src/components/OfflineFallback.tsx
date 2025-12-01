// React not needed 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import React from 'react';
import Button from './ui/Button';

const OfflineFallback: React.FC = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-900">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <WifiOff className="h-10 w-10 text-slate-400" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          You're Offline
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          Please check your internet connection and try again.
        </p>

        <Button onClick={handleRetry} className="mx-auto flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry Connection
        </Button>
      </div>
    </div>
  );
};

export default OfflineFallback;
