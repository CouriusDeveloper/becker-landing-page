import { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [scrollMode, setScrollMode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Becker-specific suggestions
  const suggestions = [
    'Energie-Ausschreibungen',
    'Strompreise vergleichen',
    'Gasanbieter wechseln',
    'Energiekosten optimieren',
    'Beschaffungsstrategien',
    'Marktanalysen',
    'Risikomanagement',
    'Portfolio-Optimierung',
    'Preisvolatilität',
    'Nachhaltige Energie'
  ];

  useEffect(() => {
    // Handle scroll behavior for SearchBar positioning
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const heroHeight = viewportHeight;
      const showFirstContainerAt = heroHeight * 0.8;
      
      if (scrollY >= showFirstContainerAt) {
        setScrollMode(true);
      } else {
        setScrollMode(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (searchTerm.trim() || filteredSuggestions.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay blur to allow dropdown clicks
    setTimeout(() => {
      setIsFocused(false);
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setIsDropdownOpen(false);
    setIsFocused(false);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    setIsDropdownOpen(false);
    // Add your search logic here
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className={`search-bar-container ${scrollMode ? 'scroll-mode' : ''} ${scrollMode && (isFocused || isDropdownOpen) ? 'focused-in-scroll' : ''}`}>
      <div className="search-bar-wrapper" ref={dropdownRef}>
        {/* Search Input Container */}
        <div className="search-input-container">
          <div className="search-icon">
            <Search className="w-5 h-5" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder="Suchen Sie nach Energielösungen..."
            className="search-input"
          />
          
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="search-button"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="search-dropdown">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="search-suggestion"
                >
                  {suggestion}
                </button>
              ))
            ) : (
              <div className="search-no-results">
                Keine Vorschläge gefunden
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
