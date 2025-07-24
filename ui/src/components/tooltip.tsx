import React, { useState } from 'react';

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const getPositionClasses = (position: TooltipProps['position']) => {
  switch (position) {
    case 'top':
      return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    case 'bottom':
      return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    case 'left':
      return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
    case 'right':
      return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
    default:
      return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
  }
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const baseTooltipClasses = 'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md transition-opacity duration-base ease-out pointer-events-none';
  const positionClasses = getPositionClasses(position);
  const visibilityClasses = isVisible ? 'opacity-100' : 'opacity-0';
  
  const tooltipClasses = [baseTooltipClasses, positionClasses, visibilityClasses].join(' ');

  return (
    <div 
      className={`relative inline-block ${className}`.trim()}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <div className={tooltipClasses} role="tooltip">
        {content}
      </div>
    </div>
  );
};