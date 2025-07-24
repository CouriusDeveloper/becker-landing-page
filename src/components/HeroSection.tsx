import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../ui/src/components/button';
import { useAddressAutocomplete } from '../hooks/useAddressAutocomplete';
import SplineBackground from './SplineBackground'; // Import SplineBackground

export function HeroSection() {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const { 
    suggestions, 
    loading, 
    handleInputChange, 
    handleSelectSuggestion,
    inputRef 
  } = useAddressAutocomplete();

  const handleAddressSelect = (address: string, placeId: string) => {
    setSelectedPlace(address);
    handleSelectSuggestion(address, placeId);
  };

  const isCTAEnabled = Boolean(selectedPlace);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, delay: 0.15 }
    }
  };

  return (
    <section id="hero" className="hero-section pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <SplineBackground /> {/* Add SplineBackground here */}
      {/* hero-text-content class was previously on a div wrapping only the text part, 
          now we need to ensure the actual content is on top of Spline.
          The .hero-section itself has z-index: 0 for stacking context.
          SplineBackground's .spline-container has z-index: 2.
          The text and interactive elements need a higher z-index.
          Let's wrap the content part in a div with appropriate z-index or rely on existing .hero-text-content styling.
          The existing .hero-text-content class in index.css has z-index: 10.
          We should apply this class to the direct container of the hero's textual and interactive content.
      */}
      <div className="max-w-7xl mx-auto hero-text-content"> {/* This div will now correctly use hero-text-content for z-indexing */}
        <motion.div 
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Column */}
          <div className="space-y-8"> {/* This was implicitly part of hero-text-content before */}
            <motion.h1 
              id="hero-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              variants={itemVariants}
            >
              Energie-Ausschreibungen{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                neu gedacht
              </span>
            </motion.h1>

            <motion.h2 
              id="hero-sub"
              className="hero-sub text-xl sm:text-2xl text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              Sparen Sie 34% Prozesskosten mit automatisierten Energie-Ausschreibungen 
              für Industrieunternehmen. Schnell, transparent, rechtssicher.
            </motion.h2>

            {/* Address Input */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Firmenadresse eingeben..."
                  className="w-full text-lg py-4 pl-6 pr-12 glass border-0 focus:ring-2 focus:ring-blue-500 rounded-md"
                  onChange={(e) => handleInputChange(e.target.value)}
                  aria-label="Firmenadresse für Angebotserstellung"
                  aria-expanded={suggestions.length > 0}
                  aria-describedby="address-help"
                />
                
                {loading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  </div>
                )}

                {/* Dropdown */}
                {suggestions.length > 0 && (
                  <motion.div 
                    className="absolute top-full left-0 right-0 mt-2 glass rounded-lg border shadow-lg z-10" // z-10 for dropdown itself
                    role="listbox"
                    aria-label="Adressvorschläge"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={suggestion.place_id}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                        onClick={() => handleAddressSelect(suggestion.description, suggestion.place_id)}
                        role="option"
                        aria-selected={false}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="font-medium text-gray-900">
                          {suggestion.structured_formatting.main_text}
                        </div>
                        <div className="text-sm text-gray-600">
                          {suggestion.structured_formatting.secondary_text}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              <p id="address-help" className="text-sm text-gray-500">
                Geben Sie Ihre Firmenadresse ein, um ein kostenloses Angebot zu erhalten
              </p>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div variants={ctaVariants}>
              <Button
                size="lg"
                className={`w-full sm:w-auto px-8 py-4 text-lg font-semibold ${
                  isCTAEnabled 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!isCTAEnabled}
                onClick={() => {
                  if (selectedPlace) {
                    if (typeof window !== 'undefined' && (window as any).posthog) {
                      (window as any).posthog.capture('selectAddress', {
                        address: selectedPlace
                      });
                    }
                    window.location.href = '/onboarding';
                  }
                }}
                aria-describedby="cta-help"
              >
                Kostenloses Angebot erhalten
              </Button>
              <p id="cta-help" className="mt-2 text-sm text-gray-500">
                {isCTAEnabled ? 'Jetzt Firma validieren und Angebot erstellen' : 'Bitte zuerst Adresse auswählen'}
              </p>
            </motion.div>
          </div>

          {/* Visual Column */}
          <motion.div 
            className="flex justify-center items-center"
            variants={itemVariants}
          >
            <div className="glass rounded-3xl p-8 max-w-md w-full">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Sofortiger Start
                  </h3>
                  <p className="text-gray-600">
                    Innerhalb von 3 Minuten erhalten Sie eine erste Kosteneinschätzung für Ihre Energie-Ausschreibung.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}