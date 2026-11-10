import React from 'react';

export default function Badge({ children, variant = 'stone', className = '', size = 'md' }) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-sm'
  };

  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    stone: 'bg-stone-100 text-stone-700 border-stone-200',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border tracking-wide uppercase ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.stone} ${className}`}
    >
      {children}
    </span>
  );
}

