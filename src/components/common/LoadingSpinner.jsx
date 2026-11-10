import React from 'react';
import { PawPrint } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading paw pals...', fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-orange-500 animate-pulse">
          <PawPrint className="w-6 h-6" />
        </div>
      </div>
      <p className="text-sm font-semibold text-stone-600 tracking-wide">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

