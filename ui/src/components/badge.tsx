import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

const getVariantClasses = (variant: BadgeProps['variant']) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-100 text-primary-800 border-primary-200';
    case 'success':
      return 'bg-success-100 text-success-800 border-success-200';
    case 'warning':
      return 'bg-warning-100 text-warning-800 border-warning-200';
    case 'danger':
      return 'bg-danger-100 text-danger-800 border-danger-200';
    case 'default':
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSizeClasses = (size: BadgeProps['size']) => {
  switch (size) {
    case 'sm':
      return 'px-2 py-1 text-xs';
    case 'md':
    default:
      return 'px-2.5 py-1.5 text-sm';
  }
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium border rounded-full';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  
  const classes = [baseClasses, variantClasses, sizeClasses, className].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
};