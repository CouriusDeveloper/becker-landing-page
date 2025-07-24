import { useState, useEffect } from 'react';
import { Button } from '../../../ui/src/components/button';

export function StickyNav() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY >= 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      id="sticky-nav" 
      className={`sticky-nav glass ${isCompact ? 'compact' : ''} fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <div className="logo flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            B
          </div>
          <span className="ml-2 font-semibold text-gray-900">Becker Solutions</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#hero" 
            className="text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Zur Startseite"
          >
            Start
          </a>
          <a 
            href="#values" 
            className="text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Zu den Vorteilen"
          >
            Vorteile
          </a>
          <a 
            href="#workflow" 
            className="text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Zum Ablauf"
          >
            Ablauf
          </a>
          <a 
            href="#testimonials" 
            className="text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Zu den Referenzen"
          >
            Referenzen
          </a>
        </nav>

        {/* Login Button */}
        <Button 
          variant="secondary"
          size="sm"
          className="hidden sm:flex"
          onClick={() => window.location.href = '/onboarding'}
        >
          Anmelden
        </Button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-700 hover:text-blue-600"
          aria-label="Menü öffnen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}