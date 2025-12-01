import React, { memo } from 'react';

const Loading: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-colors duration-300 dark:bg-slate-950">
      <div className="relative">
        {/* Outer Ring */}
        <div className="h-16 w-16 rounded-full border-4 border-slate-100 dark:border-slate-800"></div>
        {/* Spinning Ring */}
        <div className="border-primary-600 absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
        {/* Logo Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="bg-primary-600 h-3 w-3 rotate-45 rounded-sm"></div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">BizOps</h3>
        <p className="mt-1 animate-pulse text-xs tracking-widest text-slate-500 uppercase dark:text-slate-400">Loading Environment</p>
      </div>
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;
