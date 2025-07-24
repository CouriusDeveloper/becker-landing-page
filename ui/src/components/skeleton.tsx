import React from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  lines?: number;
  className?: string;
}

const getVariantClasses = (variant: SkeletonProps['variant']) => {
  switch (variant) {
    case 'text':
      return 'h-4 rounded';
    case 'rectangular':
      return 'rounded';
    case 'circular':
      return 'rounded-full';
    default:
      return 'h-4 rounded';
  }
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'text',
  lines = 1,
  className = '',
}) => {
  const baseClasses = 'bg-gray-200 animate-pulse';
  const variantClasses = getVariantClasses(variant);
  
  const skeletonClasses = [baseClasses, variantClasses, className].filter(Boolean).join(' ');
  
  const getSkeletonStyle = () => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    return style;
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={skeletonClasses}
            style={{
              ...getSkeletonStyle(),
              width: index === lines - 1 ? '75%' : '100%'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={skeletonClasses}
      style={getSkeletonStyle()}
    />
  );
};