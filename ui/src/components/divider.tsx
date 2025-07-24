import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: 'gray' | 'primary' | 'light';
  className?: string;
  children?: React.ReactNode;
}

const getOrientationClasses = (orientation: DividerProps['orientation']) => {
  switch (orientation) {
    case 'vertical':
      return 'h-full w-px';
    case 'horizontal':
    default:
      return 'w-full h-px';
  }
};

const getVariantClasses = (variant: DividerProps['variant']) => {
  switch (variant) {
    case 'dashed':
      return 'border-dashed';
    case 'dotted':
      return 'border-dotted';
    case 'solid':
    default:
      return 'border-solid';
  }
};

const getThicknessClasses = (thickness: DividerProps['thickness'], orientation: DividerProps['orientation']) => {
  const isVertical = orientation === 'vertical';
  
  switch (thickness) {
    case 'thin':
      return isVertical ? 'border-l' : 'border-t';
    case 'medium':
      return isVertical ? 'border-l-2' : 'border-t-2';
    case 'thick':
      return isVertical ? 'border-l-4' : 'border-t-4';
    default:
      return isVertical ? 'border-l' : 'border-t';
  }
};

const getColorClasses = (color: DividerProps['color']) => {
  switch (color) {
    case 'primary':
      return 'border-primary-300';
    case 'light':
      return 'border-gray-100';
    case 'gray':
    default:
      return 'border-gray-200';
  }
};

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color = 'gray',
  className = '',
  children,
}) => {
  if (children) {
    // Divider with text
    return (
      <div className={`relative ${className}`.trim()}>
        <div className="absolute inset-0 flex items-center">
          <div className={[
            'w-full',
            getThicknessClasses(thickness, orientation),
            getVariantClasses(variant),
            getColorClasses(color)
          ].join(' ')} />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">
            {children}
          </span>
        </div>
      </div>
    );
  }

  // Simple divider
  const dividerClasses = [
    getOrientationClasses(orientation),
    getThicknessClasses(thickness, orientation),
    getVariantClasses(variant),
    getColorClasses(color),
    className
  ].filter(Boolean).join(' ');

  return <div className={dividerClasses} />;
};