import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Card } from '../../../ui/src/components/card';

const valueCards = [
  {
    id: 1,
    title: '95% schnellere Ausschreibungen',
    description: 'Automatisierte Prozesse reduzieren die Zeit von Wochen auf Stunden',
    icon: '⚡',
    metric: '95%',
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 2,
    title: '34% niedrigere Prozesskosten',
    description: 'Eliminierung manueller Arbeitsschritte und Optimierung der Workflows',
    icon: '💰',
    metric: '34%',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 3,
    title: '500+ geprüfte Energieanbieter',
    description: 'Direkter Zugang zu unserem verifizierten Anbieter-Netzwerk',
    icon: '🏢',
    metric: '500+',
    color: 'from-purple-500 to-pink-400'
  }
];

export function ValueGrid() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.4
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="values" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Warum Becker Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionäre Technologie trifft auf jahrzehntelange Energie-Expertise
          </p>
        </div>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {valueCards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <Card 
                className={`value-card ${inView ? 'animate' : ''} h-full glass hover:shadow-2xl transition-all duration-300 cursor-pointer`}
              >
                <motion.div 
                  className="p-6 text-center space-y-4"
                  variants={hoverVariants}
                >
                  {/* Icon and Metric */}
                  <div className="space-y-2">
                    <div className="text-4xl mb-2">{card.icon}</div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                      {card.metric}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="value-card-title text-lg font-semibold text-gray-900"
                    id={`value-card-${card.id}-title`}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-gray-600 leading-relaxed"
                    aria-describedby={`value-card-${card.id}-title`}
                  >
                    {card.description}
                  </p>

                  {/* Visual indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className={`h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${card.color}`}></div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional metrics */}
        <motion.div 
          className="mt-16 glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">&lt; 3s</div>
              <div className="text-gray-600">Angebots-Matching</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Verfügbarkeit</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}