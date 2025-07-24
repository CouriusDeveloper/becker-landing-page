import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  name,
  options,
  value,
  onChange,
  error,
  helperText,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`.trim()}>
      {options.map((option) => {
        const isSelected = value === option.value;
        const radioId = `${name}-${option.value}`;
        
        return (
          <div key={option.value} className="flex items-center">
            <input
              id={radioId}
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={option.disabled}
              className={[
                'h-4 w-4 border-gray-300 text-primary-600',
                'focus:ring-primary-500 focus:ring-2 focus:ring-offset-2',
                'transition-colors duration-base',
                error ? 'border-danger-500' : '',
                option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              ].filter(Boolean).join(' ')}
              aria-invalid={error ? 'true' : 'false'}
            />
            <label 
              htmlFor={radioId}
              className={[
                'ml-3 text-sm font-medium text-gray-700',
                option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              ].filter(Boolean).join(' ')}
            >
              {option.label}
            </label>
          </div>
        );
      })}
      {error && (
        <p className="text-sm text-danger-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};