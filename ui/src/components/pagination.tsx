import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEdges?: boolean;
  siblingCount?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showEdges = true,
  siblingCount = 1,
  className = '',
}) => {
  const generatePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      if (showEdges) pages.push(1);
      
      // Calculate start and end of sibling pages
      const start = Math.max(2, currentPage - siblingCount);
      const end = Math.min(totalPages - 1, currentPage + siblingCount);
      
      // Add ellipsis if needed
      if (start > 2) pages.push('...');
      
      // Add sibling pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) pages.push('...');
      
      // Always show last page
      if (showEdges) pages.push(totalPages);
    }
    
    return pages;
  };

  const pages = generatePages();

  const buttonClasses = (isActive: boolean, isDisabled: boolean = false) => [
    'inline-flex items-center px-3 py-2 text-sm font-medium border',
    'transition-colors duration-base',
    isDisabled
      ? 'text-gray-300 cursor-not-allowed'
      : isActive
      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
    'focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500'
  ].filter(Boolean).join(' ');

  return (
    <nav className={`flex items-center justify-between ${className}`.trim()}>
      <div className="flex-1 flex justify-between sm:hidden">
        {/* Mobile view */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonClasses(false, currentPage === 1)}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={buttonClasses(false, currentPage === totalPages)}
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {/* Previous button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${buttonClasses(false, currentPage === 1)} rounded-l-md`}
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {pages.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                );
              }
              
              const pageNumber = page as number;
              const isActive = pageNumber === currentPage;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={buttonClasses(isActive)}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            {/* Next button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${buttonClasses(false, currentPage === totalPages)} rounded-r-md`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
};