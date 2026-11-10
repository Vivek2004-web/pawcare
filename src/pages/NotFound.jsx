import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-3xl border border-stone-100 shadow-soft">
        <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-500 mx-auto flex items-center justify-center animate-bounce">
          <PawPrint className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-stone-900">404</h1>
          <h2 className="text-xl font-bold text-stone-800">Page Not Found</h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Oops! It seems this tail has wandered off. The page you requested doesn't exist or has moved.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" size="md">
              <Home className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

