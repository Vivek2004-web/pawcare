import React, { useState } from 'react';
import { isFirebaseConfigured } from '../../firebase/config';
import { Info, Sparkles, X, KeyRound, Cloud } from 'lucide-react';

export default function NotificationBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 shadow-xs relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <Sparkles className="w-4 h-4 flex-shrink-0 text-amber-200" />
          <p className="truncate">
            <span className="font-bold">Cloud Computing & DevOps Showcase:</span>{' '}
            {isFirebaseConfigured ? (
              <span>Connected to live <strong>Firebase Project & Firestore</strong>. Hosted on Azure Static Web Apps.</span>
            ) : (
              <span>
                Running in <strong>Interactive Demo Mode</strong> with instant test logins (Admin: <code className="bg-amber-700/60 px-1.5 py-0.5 rounded font-mono text-xs">admin@pawcare.com</code> | Adopter: <code className="bg-amber-700/60 px-1.5 py-0.5 rounded font-mono text-xs">adopter@pawcare.com</code>). Add keys in <code className="bg-amber-700/60 px-1.5 py-0.5 rounded font-mono text-xs">.env</code> to sync live Firebase.
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-100 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

