import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const getPaddingClasses = (padding: CardProps['padding']) => {
  switch (padding) {
    case 'none':
      return '';
    case 'sm':
      return 'p-4';
    case 'md':
      return 'p-6';
    case 'lg':
      return 'p-8';
    default:
      return 'p-6';
  }
};

const getShadowClasses = (shadow: CardProps['shadow']) => {
  switch (shadow) {
    case 'none':
      return '';
    case 'sm':
      return 'shadow-sm';
    case 'md':
      return 'shadow-md';
    case 'lg':
      return 'shadow-lg';
    default:
      return 'shadow-sm';
  }
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'sm',
}) => {
  const baseClasses = 'bg-white border border-gray-200 rounded-lg';
  const paddingClasses = getPaddingClasses(padding);
  const shadowClasses = getShadowClasses(shadow);
  
  const classes = [baseClasses, paddingClasses, shadowClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};