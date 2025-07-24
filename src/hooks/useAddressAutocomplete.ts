import { useState, useRef, useCallback } from 'react';

interface PlacesPrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface GooglePlacesResponse {
  predictions: PlacesPrediction[];
  status: string;
}

export function useAddressAutocomplete() {
  const [suggestions, setSuggestions] = useState<PlacesPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number>();

  const fetchSuggestions = useCallback(async (input: string) => {
    if (!input.trim() || input.length < 3) {
      setSuggestions([]);
      return;
    }

    const placesKey = import.meta.env.VITE_PLACES_KEY;
    if (!placesKey) {
      console.warn('Google Places API key not configured');
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      
      const url = new URL('https://maps.googleapis.com/maps/api/place/autocomplete/json');
      url.searchParams.set('input', input);
      url.searchParams.set('key', placesKey);
      url.searchParams.set('types', 'establishment');
      url.searchParams.set('components', 'country:de');
      url.searchParams.set('language', 'de');

      // Use a proxy endpoint to avoid CORS issues
      const proxyUrl = `/api/places-proxy?${url.searchParams.toString()}`;
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GooglePlacesResponse = await response.json();
      
      if (data.status === 'OK') {
        setSuggestions(data.predictions);
      } else {
        console.warn('Places API error:', data.status);
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // Fallback to mock data for development
      setSuggestions([
        {
          place_id: 'mock_1',
          description: 'Becker Solutions GmbH, Musterstraße 123, München',
          structured_formatting: {
            main_text: 'Becker Solutions GmbH',
            secondary_text: 'Musterstraße 123, München'
          }
        },
        {
          place_id: 'mock_2', 
          description: 'Beispiel AG, Industriestraße 456, Hamburg',
          structured_formatting: {
            main_text: 'Beispiel AG',
            secondary_text: 'Industriestraße 456, Hamburg'
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = useCallback((value: string) => {
    // Debounce API calls
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  }, [fetchSuggestions]);

  const handleSelectSuggestion = useCallback((address: string, placeId: string) => {
    if (inputRef.current) {
      inputRef.current.value = address;
    }
    setSuggestions([]);
    
    // Track selection event
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('selectAddress', {
        address,
        place_id: placeId
      });
    }
  }, []);

  return {
    suggestions,
    loading,
    handleInputChange,
    handleSelectSuggestion,
    inputRef
  };
}