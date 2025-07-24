import React from 'react';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const getAlertClasses = (type: AlertProps['type']) => {
  switch (type) {
    case 'success':
      return 'bg-success-50 border-success-200 text-success-800';
    case 'warning':
      return 'bg-warning-50 border-warning-200 text-warning-800';
    case 'error':
      return 'bg-danger-50 border-danger-200 text-danger-800';
    case 'info':
    default:
      return 'bg-primary-50 border-primary-200 text-primary-800';
  }
};

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const alertClasses = [
    'rounded-md border p-4',
    getAlertClasses(type),
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClasses}>
      <div className="flex">
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>
        {dismissible && onDismiss && (
          <div className="ml-auto pl-3">
            <button
              onClick={onDismiss}
              className="inline-flex text-current hover:opacity-75"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};