import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const workflowSteps = [
  {
    id: 1,
    title: 'Adresseingabe & Firmenerkennung',
    description: 'Automatische Identifizierung Ihres Unternehmens über unsere Datenbank',
    icon: '🏢',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 2,
    title: 'Bonitätscheck & Validierung',
    description: 'Sofortige Prüfung der Kreditwürdigkeit und Geschäftsberechtigung',
    icon: '✅',
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 3,
    title: 'Anbieter-Matching',
    description: 'KI-basierte Auswahl der optimalen Energieanbieter für Ihre Anforderungen',
    icon: '🤖',
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 4,
    title: 'Angebotserstellung',
    description: 'Automatisierte Generierung von maßgeschneiderten Energieangeboten',
    icon: '📊',
    color: 'from-orange-500 to-red-400'
  }
];

export function WorkflowSteps() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const iconsY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-120%']);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <section 
      id="workflow" 
      ref={containerRef}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            So einfach funktioniert's
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In nur 4 Schritten von der Anfrage zum optimalen Energievertrag
          </p>
        </div>

        <motion.div 
          ref={ref}
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              variants={stepVariants}
            >
              {/* Icon Section */}
              <motion.div 
                className="flex-shrink-0"
                style={{ y: iconsY }}
              >
                <div className={`relative w-32 h-32 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-2xl`}>
                  <div className="text-4xl">{step.icon}</div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-gray-900">{step.id}</span>
                  </div>

                  {/* Connecting Line (not for last step) */}
                  {index < workflowSteps.length - 1 && (
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b ${step.color} hidden lg:block`}></div>
                  )}
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div 
                className="flex-1 text-center lg:text-left"
                style={{ y: textY }}
              >
                <h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  id={`workflow-step-${step.id}-title`}
                >
                  {step.title}
                  {index === 1 && (
                    <span className="sr-only">Bonitätscheck</span>
                  )}
                </h3>
                <p 
                  className="text-lg text-gray-600 leading-relaxed max-w-2xl"
                  aria-describedby={`workflow-step-${step.id}-title`}
                >
                  {step.description}
                </p>

                {/* Additional details for specific steps */}
                {step.id === 2 && (
                  <div className="mt-4 p-4 glass rounded-lg">
                    <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        SCHUFA-Integration
                      </span>
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Handelsregister-Check
                      </span>
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Automatisiert
                      </span>
                    </div>
                  </div>
                )}

                {step.id === 3 && (
                  <div className="mt-4 p-4 glass rounded-lg">
                    <div className="text-sm text-gray-600">
                      <strong>KI-Algorithmus berücksichtigt:</strong> Verbrauchsprofil, Standort, Vertragslaufzeit, Nachhaltigkeit & individuelle Präferenzen
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Durchschnittliche Bearbeitungszeit: <strong className="text-blue-600">unter 24 Stunden</strong>
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Jetzt kostenlos starten
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}