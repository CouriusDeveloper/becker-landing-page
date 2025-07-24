import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from 'react-use-gesture';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  role: string;
  savings: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Mit der Becker Platform konnten wir unsere Energie-Ausschreibungen um 78% beschleunigen und dabei 2.3 Millionen Euro jährlich einsparen. Die automatisierte Anbieterauswahl ist revolutionär.",
    author: "Dr. Stefan Mueller",
    company: "ThyssenKrupp Steel Europe",
    role: "Head of Energy Procurement",
    savings: "€2.3M jährlich",
    avatar: "SM"
  },
  {
    id: 2,
    quote: "Früher brauchten wir 6 Wochen für eine Energie-Ausschreibung. Heute sind es 3 Tage. Die Transparenz und Rechtssicherheit sind dabei sogar noch besser geworden.",
    author: "Maria Hoffmann",
    company: "BASF SE",
    role: "Energy Manager",
    savings: "89% Zeitersparnis",
    avatar: "MH"
  },
  {
    id: 3,
    quote: "Die KI-basierte Anbieterauswahl hat uns zu Partnern gebracht, die wir nie selbst gefunden hätten. Unsere Energiekosten sanken um 18% bei besserer Nachhaltigkeit.",
    author: "Thomas Weber",
    company: "BMW Group",
    role: "Sustainability Director",
    savings: "18% Kostensenkung",
    avatar: "TW"
  },
  {
    id: 4,
    quote: "Als Mittelständler hatten wir nie die Ressourcen für komplexe Energie-Ausschreibungen. Becker macht es so einfach wie Online-Shopping - nur mit Millionen-Einsparungen.",
    author: "Sarah Richter",
    company: "Miele & Cie. KG",
    role: "CFO",
    savings: "€890K gespart",
    avatar: "SR"
  }
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<number>();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = window.setInterval(nextSlide, 6000);
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Gesture handling for drag
  const bind = useGesture({
    onDrag: ({ movement: [mx], velocity, direction: [xDir], cancel }) => {
      if (Math.abs(mx) > 50 || Math.abs(velocity) > 0.5) {
        if (xDir > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
        cancel();
      }
    },
    onDragStart: () => {
      setIsAutoPlaying(false);
    },
    onDragEnd: () => {
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  });

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Über 150 Industrieunternehmen vertrauen bereits auf unsere Energie-Ausschreibungsplattform
          </p>
        </div>

        <div className="relative">
          {/* Main Slider */}
          <div className="overflow-hidden">
            <div 
              className="testimonial-slider relative h-96 flex items-center justify-center"
              {...bind()}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <AnimatePresence mode="wait" custom={currentIndex}>
                <motion.div
                  key={currentIndex}
                  custom={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                    duration: 0.5
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      nextSlide();
                    } else if (swipe > swipeConfidenceThreshold) {
                      prevSlide();
                    }
                  }}
                  className="testimonial-slide absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <div className="glass rounded-3xl p-8 max-w-4xl mx-auto h-full flex flex-col justify-center">
                    <blockquote className="text-center">
                      <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 italic">
                        "{testimonials[currentIndex].quote}"
                      </p>
                      
                      <footer className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {testimonials[currentIndex].avatar}
                          </div>
                        </div>
                        
                        {/* Author Info */}
                        <div className="text-center sm:text-left">
                          <div className="font-semibold text-gray-900 text-lg">
                            {testimonials[currentIndex].author}
                          </div>
                          <div className="text-gray-600">
                            {testimonials[currentIndex].role}
                          </div>
                          <div className="text-sm text-gray-500">
                            {testimonials[currentIndex].company}
                          </div>
                        </div>
                        
                        {/* Savings Badge */}
                        <div className="flex-shrink-0">
                          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                            {testimonials[currentIndex].savings}
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors z-10"
            aria-label="Vorheriges Testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors z-10"
            aria-label="Nächstes Testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Zu Testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span>{isAutoPlaying ? 'Auto-Play aktiv' : 'Auto-Play pausiert'}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="glass rounded-2xl p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
            <div className="text-gray-600">Zufriedene Kunden</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">€847M</div>
            <div className="text-gray-600">Eingespart insgesamt</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Kundenbewertung</div>
          </div>
        </div>
      </div>
    </section>
  );
}