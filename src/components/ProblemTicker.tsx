import { useEffect, useRef } from 'react';

const painPoints = [
  'Langsame RFQs kosten bis zu 6 Wochen pro Ausschreibung',
  'Manuelle Prozesse führen zu 40% höheren Beschaffungskosten',
  'Unübersichtliche Anbietervergleiche verzögern Entscheidungen um Monate',
  'Rechtsunsichere Dokumentation gefährdet Compliance',
  'Fehlende Markttransparenz verhindert optimale Preisverhandlungen'
];

export function ProblemTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickerRef.current) return;
      
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      tickerRef.current.style.transform = `translateX(${rate}px)`;
    };

    // Throttle scroll events for performance
    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollThrottled);
  }, []);

  return (
    <div id="pain-ticker" className="pain-ticker bg-red-50 border-y border-red-100 py-4 overflow-hidden">
      <div 
        ref={tickerRef}
        className="pain-ticker-content gpu-accelerated whitespace-nowrap"
        aria-label="Probleme bei herkömmlichen Energie-Ausschreibungen"
      >
        {painPoints.map((point, index) => (
          <span 
            key={index}
            className="inline-block mx-8 text-red-700 font-medium"
          >
            <span className="mr-4 text-red-500">⚠️</span>
            {point}
            {index === 0 && (
              <span 
                id="pain-ticker-first"
                className="sr-only"
              >
                Langsame RFQs
              </span>
            )}
          </span>
        ))}
        
        {/* Repeat for continuous scroll effect */}
        {painPoints.map((point, index) => (
          <span 
            key={`repeat-${index}`}
            className="inline-block mx-8 text-red-700 font-medium"
          >
            <span className="mr-4 text-red-500">⚠️</span>
            {point}
          </span>
        ))}
      </div>
    </div>
  );
}