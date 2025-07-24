import React, { useEffect, useRef } from 'react';

interface JourneyContainer {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ScrollJourney: React.FC = () => {
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const container3Ref = useRef<HTMLDivElement>(null);

  const journeyContainers: JourneyContainer[] = [
    {
      id: 'search',
      title: 'Energie-Ausschreibung starten',
      description: 'Beginnen Sie Ihre Suche nach der optimalen Energielösung mit unserer intelligenten Suchfunktion und KI-gestützten Marktanalyse.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    {
      id: 'analyze',
      title: 'Marktanalyse & Optimierung',
      description: 'Unsere KI analysiert Marktdaten in Echtzeit und erstellt einen detaillierten Vergleich der verfügbaren Energieoptionen für maximale Effizienz.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
      id: 'implement',
      title: 'Umsetzung & Monitoring',
      description: 'Nahtlose Implementierung mit kontinuierlichem Monitoring und Support für optimale Ergebnisse und langfristige Energieeffizienz.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop'
    }
  ];

  useEffect(() => {
    const containerHeight = 400; // Updated height
    const containerGap = 50;

    function updatePositions() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const sectionHeight = window.innerHeight;
      
      // Start scroll journey calculations after hero section (100vh)
      const heroHeight = viewportHeight;
      const journeyScrollY = Math.max(0, scrollY - heroHeight);

      const container1 = container1Ref.current;
      const container2 = container2Ref.current;
      const container3 = container3Ref.current;

      if (!container1 || !container2 || !container3) return;

      // Start showing first container when user starts scrolling (at 80% of hero section)
      const showFirstContainerAt = heroHeight * 0.8;
      
      if (scrollY < showFirstContainerAt) {
        // Hide all containers when in early hero section
        container1.style.opacity = '0';
        container2.style.opacity = '0';
        container3.style.opacity = '0';
        return;
      }

      // Move grid patterns
      const gridOffset = (journeyScrollY * 0.5) % 50;
      const leftGrid = document.querySelector('.grid-pattern.left') as HTMLElement;
      const rightGrid = document.querySelector('.grid-pattern.right') as HTMLElement;
      
      if (leftGrid) {
        leftGrid.style.transform = `translateY(-${gridOffset}px)`;
      }
      if (rightGrid) {
        rightGrid.style.transform = `translateY(-${gridOffset}px)`;
      }

      const almostTouchingDistance = containerHeight + containerGap;

      // Early appearance: Container 1 fades in when user starts scrolling
      if (scrollY >= showFirstContainerAt && scrollY < heroHeight) {
        const fadeProgress = (scrollY - showFirstContainerAt) / (heroHeight - showFirstContainerAt);
        container1.style.top = '50%';
        container1.style.transform = 'translate(-50%, -50%)';
        container1.style.opacity = Math.min(fadeProgress * 2, 1).toString(); // Fade in faster
        
        container2.style.opacity = '0';
        container3.style.opacity = '0';
        return;
      }

      // Section 1: Container 1 fully visible in center
      if (journeyScrollY < sectionHeight * 0.7) {
        container1.style.top = '50%';
        container1.style.transform = 'translate(-50%, -50%)';
        container1.style.opacity = '1';
        
        container2.style.top = '150vh';
        container2.style.opacity = '0';
        
        container3.style.top = '150vh';
        container3.style.opacity = '0';
      }
      // Pre-transition: Container 2 comes up but container 1 stays in place
      else if (journeyScrollY >= sectionHeight * 0.7 && journeyScrollY < sectionHeight) {
        const preProgress = (journeyScrollY - sectionHeight * 0.7) / (sectionHeight * 0.3);
        
        container1.style.top = '50%';
        container1.style.transform = 'translate(-50%, -50%)';
        container1.style.opacity = '1';
        
        const container2StartTop = viewportHeight + containerHeight/2 + containerGap;
        const container2AlmostTouchTop = viewportCenter + almostTouchingDistance;
        const container2Top = container2StartTop + (container2AlmostTouchTop - container2StartTop) * preProgress;
        container2.style.top = `${container2Top}px`;
        container2.style.transform = 'translate(-50%, -50%)';
        container2.style.opacity = '1';
        
        container3.style.top = '150vh';
        container3.style.opacity = '0';
      }
      // Main transition: Both containers move
      else if (journeyScrollY >= sectionHeight && journeyScrollY < sectionHeight * 1.3) {
        const progress = (journeyScrollY - sectionHeight) / (sectionHeight * 0.3);
        
        const container1EndPosition = -(containerHeight/2 + containerGap);
        const container1StartPosition = viewportCenter;
        const container1Top = container1StartPosition + (container1EndPosition - container1StartPosition) * progress;
        container1.style.top = `${container1Top}px`;
        container1.style.transform = 'translate(-50%, -50%)';
        container1.style.opacity = container1Top > -containerHeight/2 ? '1' : '0';
        
        const container2StartTop = viewportCenter + almostTouchingDistance;
        const container2EndTop = viewportCenter;
        const container2Top = container2StartTop + (container2EndTop - container2StartTop) * progress;
        container2.style.top = `${container2Top}px`;
        container2.style.transform = 'translate(-50%, -50%)';
        container2.style.opacity = '1';
        
        container3.style.top = '150vh';
        container3.style.opacity = '0';
      }
      // Section 2: Container 2 centered
      else if (journeyScrollY >= sectionHeight * 1.3 && journeyScrollY < sectionHeight * 2) {
        container1.style.opacity = '0';
        container1.style.top = '-100vh';
        
        container2.style.top = '50%';
        container2.style.transform = 'translate(-50%, -50%)';
        container2.style.opacity = '1';
        
        container3.style.top = '150vh';
        container3.style.opacity = '0';
      }
      // Pre-transition 2: Container 3 comes up but container 2 stays in place
      else if (journeyScrollY >= sectionHeight * 2 && journeyScrollY < sectionHeight * 2.3) {
        const preProgress = (journeyScrollY - sectionHeight * 2) / (sectionHeight * 0.3);
        
        container1.style.opacity = '0';
        
        container2.style.top = '50%';
        container2.style.transform = 'translate(-50%, -50%)';
        container2.style.opacity = '1';
        
        const container3StartTop = viewportHeight + containerHeight/2 + containerGap;
        const container3AlmostTouchTop = viewportCenter + almostTouchingDistance;
        const container3Top = container3StartTop + (container3AlmostTouchTop - container3StartTop) * preProgress;
        container3.style.top = `${container3Top}px`;
        container3.style.transform = 'translate(-50%, -50%)';
        container3.style.opacity = '1';
      }
      // Main transition 2: Both containers move
      else if (journeyScrollY >= sectionHeight * 2.3 && journeyScrollY < sectionHeight * 2.6) {
        const progress = (journeyScrollY - sectionHeight * 2.3) / (sectionHeight * 0.3);
        
        container1.style.opacity = '0';
        
        const container2EndPosition = -(containerHeight/2 + containerGap);
        const container2StartPosition = viewportCenter;
        const container2Top = container2StartPosition + (container2EndPosition - container2StartPosition) * progress;
        container2.style.top = `${container2Top}px`;
        container2.style.transform = 'translate(-50%, -50%)';
        container2.style.opacity = container2Top > -containerHeight/2 ? '1' : '0';
        
        const container3StartTop = viewportCenter + almostTouchingDistance;
        const container3EndTop = viewportCenter;
        const container3Top = container3StartTop + (container3EndTop - container3StartTop) * progress;
        container3.style.top = `${container3Top}px`;
        container3.style.transform = 'translate(-50%, -50%)';
        container3.style.opacity = '1';
      }
      // Section 3: Container 3 centered
      else {
        container1.style.opacity = '0';
        container2.style.opacity = '0';
        container2.style.top = '-100vh';
        
        container3.style.top = '50%';
        container3.style.transform = 'translate(-50%, -50%)';
        container3.style.opacity = '1';
      }
    }

    // Initial setup
    updatePositions();

    // Optimized scroll handler
    let ticking = false;
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updatePositions();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', updatePositions);

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', updatePositions);
    };
  }, []);

  return (
    <div className="scroll-journey-section">
      {/* Background with grid patterns */}
      <div className="background-container">
        <div className="grid-pattern left"></div>
        <div className="grid-pattern right"></div>
      </div>

      <div className="scroll-container">
        {/* Container 1 */}
        <div 
          ref={container1Ref}
          className="glass-container"
          id="container-1"
        >
          <div className="image-section">
            <img src={journeyContainers[0].image} alt={journeyContainers[0].title} />
          </div>
          <div className="text-section">
            <h2>{journeyContainers[0].title}</h2>
            <p>{journeyContainers[0].description}</p>
          </div>
        </div>

        {/* Container 2 */}
        <div 
          ref={container2Ref}
          className="glass-container"
          id="container-2"
        >
          <div className="image-section">
            <img src={journeyContainers[1].image} alt={journeyContainers[1].title} />
          </div>
          <div className="text-section">
            <h2>{journeyContainers[1].title}</h2>
            <p>{journeyContainers[1].description}</p>
          </div>
        </div>

        {/* Container 3 */}
        <div 
          ref={container3Ref}
          className="glass-container"
          id="container-3"
        >
          <div className="image-section">
            <img src={journeyContainers[2].image} alt={journeyContainers[2].title} />
          </div>
          <div className="text-section">
            <h2>{journeyContainers[2].title}</h2>
            <p>{journeyContainers[2].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollJourney;
