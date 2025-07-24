import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface KPIData {
  totalVolumeTWh: number;
  activeTenders: number;
  matchedSuppliers: number;
  avgSavingsPercent: number;
}

const mockKPIData: KPIData = {
  totalVolumeTWh: 1247.8,
  activeTenders: 156,
  matchedSuppliers: 892,
  avgSavingsPercent: 23.4
};

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

function Counter({ end, duration = 800, decimals = 0, suffix = '', prefix = '', className = '' }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Use cubic-out easing
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOut * end;
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [end, duration]);

  const formattedCount = prefix + count.toFixed(decimals) + suffix;

  return (
    <motion.span 
      className={`counter ${className}`}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {formattedCount}
    </motion.span>
  );
}

export function LiveMetrics() {
  const [kpiData, setKpiData] = useState<KPIData>(mockKPIData);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView) return;

    const fetchKPIData = async () => {
      setIsLoading(true);
      try {
        // Try to fetch real data, fallback to mock
        const response = await fetch('/api/kpi', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setKpiData(data);
        } else {
          // Use mock data
          setKpiData(mockKPIData);
        }
      } catch (error) {
        console.warn('Failed to fetch KPI data, using mock:', error);
        setKpiData(mockKPIData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKPIData();

    // Set up interval for live updates
    const interval = setInterval(fetchKPIData, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="metrics" className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Live Platform Metriken
          </h2>
          <p className="text-xl text-gray-600">
            Echtzeitdaten unserer Energie-Ausschreibungsplattform
          </p>
        </div>

        <motion.div 
          ref={ref}
          className="glass rounded-3xl p-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Total Volume */}
            <motion.div variants={itemVariants}>
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {isLoading ? (
                    <div className="skeleton h-10 w-20 mx-auto"></div>
                  ) : (
                    <Counter 
                      end={kpiData.totalVolumeTWh} 
                      duration={800}
                      decimals={1}
                      suffix=" TWh"
                    />
                  )}
                </div>
                <div className="label-twh text-gray-600 font-medium">
                  Vermitteltes Volumen
                </div>
                <div className="text-sm text-gray-500">
                  Gesamt seit Start
                </div>
              </div>
            </motion.div>

            {/* Active Tenders */}
            <motion.div variants={itemVariants}>
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-green-600">
                  {isLoading ? (
                    <div className="skeleton h-10 w-16 mx-auto"></div>
                  ) : (
                    <Counter 
                      end={kpiData.activeTenders} 
                      duration={800}
                    />
                  )}
                </div>
                <div className="text-gray-600 font-medium">
                  Aktive Ausschreibungen
                </div>
                <div className="text-sm text-gray-500">
                  In diesem Monat
                </div>
              </div>
            </motion.div>

            {/* Matched Suppliers */}
            <motion.div variants={itemVariants}>
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600">
                  {isLoading ? (
                    <div className="skeleton h-10 w-16 mx-auto"></div>
                  ) : (
                    <Counter 
                      end={kpiData.matchedSuppliers} 
                      duration={800}
                    />
                  )}
                </div>
                <div className="text-gray-600 font-medium">
                  Anbieter-Matches
                </div>
                <div className="text-sm text-gray-500">
                  Erfolgreich vermittelt
                </div>
              </div>
            </motion.div>

            {/* Average Savings */}
            <motion.div variants={itemVariants}>
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-orange-600">
                  {isLoading ? (
                    <div className="skeleton h-10 w-16 mx-auto"></div>
                  ) : (
                    <Counter 
                      end={kpiData.avgSavingsPercent} 
                      duration={800}
                      decimals={1}
                      suffix="%"
                    />
                  )}
                </div>
                <div className="text-gray-600 font-medium">
                  Durchschnittliche Ersparnis
                </div>
                <div className="text-sm text-gray-500">
                  Vs. Marktpreise
                </div>
              </div>
            </motion.div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center justify-center mt-8 space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live Daten - Aktualisiert alle 60 Sekunden</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}