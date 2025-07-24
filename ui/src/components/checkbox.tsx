import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  indeterminate = false,
  className = '',
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  const checkboxClasses = [
    'h-4 w-4 rounded border-gray-300 text-primary-600',
    'focus:ring-primary-500 focus:ring-2 focus:ring-offset-2',
    'transition-colors duration-base',
    error ? 'border-danger-500' : '',
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-1">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            type="checkbox"
            className={checkboxClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
            ref={(input) => {
              if (input) {
                input.indeterminate = indeterminate;
              }
            }}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3 text-sm">
            <label 
              htmlFor={checkboxId}
              className={[
                'font-medium text-gray-700',
                props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              ].filter(Boolean).join(' ')}
            >
              {label}
            </label>
          </div>
        )}
      </div>
      {error && (
        <p id={`${checkboxId}-error`} className="text-sm text-danger-600 ml-7">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${checkboxId}-helper`} className="text-sm text-gray-500 ml-7">
          {helperText}
        </p>
      )}
    </div>
  );
};