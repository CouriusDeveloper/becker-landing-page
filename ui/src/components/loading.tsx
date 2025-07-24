import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export interface LoadingProps extends LoadingSpinnerProps {
  overlay?: boolean;
  message?: string;
}

const getSizeClasses = (size: LoadingSpinnerProps['size']) => {
  switch (size) {
    case 'sm':
      return 'w-4 h-4';
    case 'md':
      return 'w-6 h-6';
    case 'lg':
      return 'w-8 h-8';
    default:
      return 'w-6 h-6';
  }
};

const getColorClasses = (color: LoadingSpinnerProps['color']) => {
  switch (color) {
    case 'primary':
      return 'text-primary-500';
    case 'white':
      return 'text-white';
    case 'gray':
      return 'text-gray-500';
    default:
      return 'text-primary-500';
  }
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = getSizeClasses(size);
  const colorClasses = getColorClasses(color);
  
  return (
    <div className={`animate-spin ${sizeClasses} ${colorClasses} ${className}`.trim()}>
      <svg fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export const Loading: React.FC<LoadingProps> = ({
  overlay = false,
  message,
  ...spinnerProps
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <LoadingSpinner {...spinnerProps} />
      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {content}
    </div>
  );
};