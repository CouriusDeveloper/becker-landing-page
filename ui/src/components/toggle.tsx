import React, { useState } from 'react';

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  description,
  size = 'md',
  className = '',
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          switch: 'h-5 w-9',
          thumb: 'h-4 w-4',
          translate: isChecked ? 'translate-x-4' : 'translate-x-0'
        };
      case 'md':
      default:
        return {
          switch: 'h-6 w-11',
          thumb: 'h-5 w-5',
          translate: isChecked ? 'translate-x-5' : 'translate-x-0'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const switchClasses = [
    sizeClasses.switch,
    'relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full',
    'cursor-pointer transition-colors ease-in-out duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    isChecked ? 'bg-primary-600' : 'bg-gray-200',
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  ].filter(Boolean).join(' ');

  const thumbClasses = [
    sizeClasses.thumb,
    'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0',
    'transition ease-in-out duration-200',
    sizeClasses.translate
  ].join(' ');

  return (
    <div className={`flex items-start ${className}`.trim()}>
      <button
        type="button"
        className={switchClasses}
        onClick={handleToggle}
        disabled={disabled}
        aria-checked={isChecked}
        role="switch"
      >
        <span className={thumbClasses} />
      </button>
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <div className="text-sm font-medium text-gray-900">
              {label}
            </div>
          )}
          {description && (
            <div className="text-sm text-gray-500">
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};