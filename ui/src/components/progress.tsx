import React from 'react';

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const getSizeClasses = (size: ProgressProps['size']) => {
  switch (size) {
    case 'sm':
      return 'h-1';
    case 'md':
      return 'h-2';
    case 'lg':
      return 'h-3';
    default:
      return 'h-2';
  }
};

const getColorClasses = (color: ProgressProps['color']) => {
  switch (color) {
    case 'primary':
      return 'bg-primary-600';
    case 'success':
      return 'bg-success-600';
    case 'warning':
      return 'bg-warning-600';
    case 'danger':
      return 'bg-danger-600';
    default:
      return 'bg-primary-600';
  }
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const containerClasses = [
    'w-full bg-gray-200 rounded-full overflow-hidden',
    getSizeClasses(size),
    className
  ].filter(Boolean).join(' ');

  const barClasses = [
    'h-full transition-all duration-300 ease-out rounded-full',
    getColorClasses(color)
  ].join(' ');

  return (
    <div className="space-y-1">
      {(showLabel || label) && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">{label || 'Progress'}</span>
          {showLabel && (
            <span className="text-gray-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={containerClasses}>
        <div 
          className={barClasses}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
          aria-valuemin={0}
        />
      </div>
    </div>
  );
};