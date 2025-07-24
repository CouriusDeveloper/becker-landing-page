import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const getVariantClasses = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-500 hover:bg-primary-600 text-white border-transparent';
    case 'secondary':
      return 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-200';
    case 'danger':
      return 'bg-danger-500 hover:bg-danger-600 text-white border-transparent';
    case 'ghost':
      return 'bg-transparent hover:bg-slate-100 text-slate-700 border-transparent';
    default:
      return 'bg-primary-500 hover:bg-primary-600 text-white border-transparent';
  }
};

const getSizeClasses = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return 'text-sm px-3 py-1.5 h-8';
    case 'md':
      return 'text-base px-4 py-2 h-10';
    case 'lg':
      return 'text-lg px-6 py-3 h-12';
    default:
      return 'text-base px-4 py-2 h-10';
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium border rounded-md transition-colors duration-base ease-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  
  const classes = [baseClasses, variantClasses, sizeClasses, className].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};