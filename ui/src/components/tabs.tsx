import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTab,
  onChange,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeItem = items.find(item => item.id === activeTab);

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {items.map((item) => {
            const isActive = item.id === activeTab;
            const tabClasses = [
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-base',
              isActive
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              item.disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            ].filter(Boolean).join(' ');

            return (
              <button
                key={item.id}
                className={tabClasses}
                onClick={() => !item.disabled && handleTabChange(item.id)}
                disabled={item.disabled}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeItem?.content}
      </div>
    </div>
  );
};