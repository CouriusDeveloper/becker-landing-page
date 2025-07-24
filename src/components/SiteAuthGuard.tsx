import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteAuthGuardProps {
  children: React.ReactNode;
}

const SiteAuthGuard: React.FC<SiteAuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user already has valid site access token
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('site_access_token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch('/api/site-auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (data.success && data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('site_access_token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error verifying site access token:', error);
        localStorage.removeItem('site_access_token');
        setIsAuthenticated(false);
      }
    };

    checkExistingAuth();
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/site-auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('site_access_token', data.token);
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Falsches Passwort');
      }
    } catch (error) {
      console.error('Error validating password:', error);
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('site_access_token');
    setIsAuthenticated(false);
    setPassword('');
    setError('');
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float${(i % 2) + 1} ${15 + i * 2}s ease-in-out infinite`,
                animationDelay: `-${i * 2}s`,
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
              }}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="w-16 h-16 border-4 border-transparent rounded-full animate-spin"
               style={{
                 borderTopColor: '#66abee',
                 borderRightColor: '#66abee',
                 filter: 'drop-shadow(0 0 12px rgba(102, 171, 238, 0.5))',
               }}
          />
        </motion.div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        {/* Background Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse at center,
              rgba(255, 255, 255, 0.02) 0%,
              rgba(0, 0, 0, 0.4) 50%,
              rgba(0, 0, 0, 0.7) 100%
            )`,
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full opacity-0"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float${(i % 2) + 1} ${12 + i * 2}s ease-in-out infinite`,
                animationDelay: `-${i * 1.5}s`,
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="w-full max-w-md relative z-10"
        >
          {/* Main glassmorphic container */}
          <div 
            className="relative rounded-3xl p-8 border"
            style={{
              background: 'rgba(15, 52, 96, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: 'rgba(102, 171, 238, 0.6)',
              borderWidth: '2px',
              boxShadow: `
                0 8px 25px rgba(0, 20, 40, 0.7),
                0 4px 15px rgba(15, 52, 96, 0.5),
                inset 0 1px 0 rgba(102, 171, 238, 0.3)
              `,
            }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3, 
                  type: "spring", 
                  stiffness: 200,
                  damping: 15 
                }}
                className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full relative"
                style={{
                  background: 'linear-gradient(135deg, #66abee 0%, #0045ff 100%)',
                  boxShadow: '0 8px 20px rgba(102, 171, 238, 0.4)',
                }}
              >
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-3xl font-bold mb-3"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6))',
                }}
              >
                Site-Zugang erforderlich
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-lg"
                style={{ color: 'rgba(204, 231, 255, 0.8)' }}
              >
                Bitte geben Sie das Site-Passwort ein, um fortzufahren
              </motion.p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Site-Passwort eingeben"
                  className="w-full px-6 py-4 rounded-xl text-white placeholder-white/60 focus:outline-none transition-all duration-300 font-medium"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(102, 171, 238, 0.3)',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(102, 171, 238, 0.8)';
                    e.target.style.boxShadow = `
                      inset 0 2px 4px rgba(0, 0, 0, 0.2),
                      0 0 20px rgba(102, 171, 238, 0.3)
                    `;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(102, 171, 238, 0.3)';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
                  }}
                  required
                  autoFocus
                />
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="rounded-xl p-4 text-sm font-medium"
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#fecaca',
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                style={{
                  background: isLoading 
                    ? 'rgba(102, 171, 238, 0.6)' 
                    : 'linear-gradient(135deg, #66abee 0%, #0045ff 100%)',
                  boxShadow: isLoading 
                    ? 'none' 
                    : `
                      0 6px 20px rgba(102, 171, 238, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.boxShadow = `
                      0 8px 25px rgba(102, 171, 238, 0.6),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3)
                    `;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.boxShadow = `
                      0 6px 20px rgba(102, 171, 238, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `;
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div 
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))' }}
                    />
                    Überprüfe...
                  </div>
                ) : (
                  'Zugang gewähren'
                )}
              </motion.button>
            </form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <p 
                className="text-sm"
                style={{ color: 'rgba(204, 231, 255, 0.6)' }}
              >
                Kontaktieren Sie den Administrator, wenn Sie das Passwort nicht haben
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
            50% { transform: translateY(-10px) translateX(-5px); opacity: 0.8; }
            75% { transform: translateY(-30px) translateX(15px); opacity: 1; }
          }

          @keyframes float2 {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
            33% { transform: translateY(-15px) translateX(-10px); opacity: 0.8; }
            66% { transform: translateY(-25px) translateX(8px); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // Show children if authenticated, with logout option in development
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <motion.button
          onClick={handleLogout}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all duration-300 z-50 backdrop-blur-xl border"
          style={{
            background: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgba(239, 68, 68, 0.6)',
            boxShadow: `
              0 8px 25px rgba(239, 68, 68, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
          }}
        >
          🚪 Site Logout (Dev)
        </motion.button>
      )}
    </>
  );
};

export default SiteAuthGuard;
