import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const getSizeClasses = (size: AvatarProps['size']) => {
  switch (size) {
    case 'xs':
      return 'w-6 h-6 text-xs';
    case 'sm':
      return 'w-8 h-8 text-sm';
    case 'md':
      return 'w-10 h-10 text-base';
    case 'lg':
      return 'w-12 h-12 text-lg';
    case 'xl':
      return 'w-16 h-16 text-xl';
    default:
      return 'w-10 h-10 text-base';
  }
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = getSizeClasses(size);
  const baseClasses = 'inline-flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-medium';
  
  const avatarClasses = [baseClasses, sizeClasses, className].filter(Boolean).join(' ');

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={`${avatarClasses} object-cover`.trim()}
      />
    );
  }

  const displayInitials = name ? getInitials(name) : '?';

  return (
    <div className={avatarClasses}>
      {displayInitials}
    </div>
  );
};