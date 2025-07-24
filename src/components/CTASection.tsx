import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../ui/src/components/button';

interface DemoRequestData {
  email: string;
  company: string;
  name: string;
  phone?: string;
  message?: string;
}

export function CTASection() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<DemoRequestData>({
    email: '',
    company: '',
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const openModal = () => {
    setIsModalVisible(true);
    // Track event
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('openDemoModal', {
        source: 'cta-section'
      });
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSubmitStatus('idle');
    setFormData({
      email: '',
      company: '',
      name: '',
      phone: '',
      message: ''
    });
  };

  const handleInputChange = (field: keyof DemoRequestData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkedInSSO = async () => {
    try {
      setIsSubmitting(true);
      
      // In a real implementation, this would redirect to LinkedIn OAuth
      // For now, we'll simulate the flow
      if (typeof window !== 'undefined') {
        // Track event
        if ((window as any).posthog) {
          (window as any).posthog.capture('linkedinSSOAttempt');
        }
        
        // Simulate LinkedIn OAuth redirect
        window.location.href = '/auth/linkedin?redirect=/onboarding&source=demo-request';
      }
    } catch (error) {
      console.error('LinkedIn SSO error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.email || !formData.company || !formData.name) {
        throw new Error('Bitte füllen Sie alle Pflichtfelder aus');
      }

      // Submit to API
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Demo-Anfrage konnte nicht gesendet werden');
      }

      setSubmitStatus('success');
      
      // Track success event
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture('demoRequestSubmitted', {
          company: formData.company,
          hasPhone: Boolean(formData.phone),
          hasMessage: Boolean(formData.message)
        });
      }

      // Auto-close modal after success
      setTimeout(() => {
        closeModal();
      }, 2000);

    } catch (error) {
      console.error('Demo request error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
    },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(16px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.4
      }
    }
  };

  return (
    <>
      <section id="dark-cta" className="py-20 relative overflow-hidden">
        {/* Background with glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Bereit für die Zukunft der{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Energie-Beschaffung?
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Starten Sie noch heute und sehen Sie in einer persönlichen Live-Demo, 
              wie Sie bis zu 34% Ihrer Prozesskosten einsparen können.
            </p>

            <motion.div 
              className="glass-lg rounded-3xl p-8 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">15 Min</div>
                  <div className="text-gray-300">Demo-Dauer</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">€2.1M</div>
                  <div className="text-gray-300">Ø Einsparung</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">24h</div>
                  <div className="text-gray-300">Erste Ergebnisse</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                onClick={openModal}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                🎯 Kostenlose Live-Demo buchen
              </Button>
              
              <Button
                size="lg"
                variant="secondary"
                onClick={handleLinkedInSSO}
                disabled={isSubmitting}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Mit LinkedIn anmelden
              </Button>
            </motion.div>

            <p className="text-sm text-gray-400 mt-6">
              ✅ Kostenlos & unverbindlich • ✅ Keine Setup-Gebühren • ✅ DSGVO-konform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalVisible && (
          <motion.div
            className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
          >
            <motion.div
              className="modal-content glass-lg rounded-2xl p-6 w-full max-w-md mx-auto"
              variants={contentVariants}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-modal-title"
            >
              <div className="text-center mb-6">
                <h3 id="demo-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
                  Live-Demo anfragen
                </h3>
                <p className="text-gray-600">
                  Wir melden uns innerhalb von 24 Stunden bei Ihnen
                </p>
              </div>

              {submitStatus === 'success' ? (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Anfrage gesendet!</h4>
                  <p className="text-gray-600">Wir melden uns in Kürze bei Ihnen.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleDemoRequest} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Vollständiger Name *"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="E-Mail-Adresse *"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Unternehmen *"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      placeholder="Telefonnummer (optional)"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Nachricht (optional)"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      Fehler beim Senden. Bitte versuchen Sie es erneut.
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={closeModal}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Abbrechen
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Demo anfragen'}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}