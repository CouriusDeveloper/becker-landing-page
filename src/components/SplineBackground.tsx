import { useEffect, useRef } from 'react';

// URL zur Spline-Szene
const SPLINE_SCENE_URL = 'https://prod.spline.design/N-ImvZBgAvd7ifKi/scene.splinecode';

interface SplineBackgroundProps {
  className?: string;
}

// Typdefinition für die Spline-Viewer Web-Komponente
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string;
      };
    }
  }
}

export default function SplineBackground({ className = '' }: SplineBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Spline-Viewer-Script dynamisch laden
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.2/build/spline-viewer.js';
    script.async = true;
    document.head.appendChild(script);
    
    console.log('⏳ SplineBackground mounted, loading viewer script');
    
    // Script entfernen beim Unmounting der Komponente
    return () => {
      try {
        document.head.removeChild(script);
      } catch (e) {
        // Script könnte bereits entfernt sein
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`spline-container ${className}`}>
      {/* Spline-Viewer Web-Komponente */}
      <spline-viewer 
        url={SPLINE_SCENE_URL} 
        style={{ width: '100%', height: '100%', outline: 'none' }}
      />
    </div>
  );
}
