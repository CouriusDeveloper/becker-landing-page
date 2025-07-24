import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  {
    href: '#hero',
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9,22 9,12 15,12 15,22"></polyline>
      </svg>
    ),
    text: 'Start'
  },
  {
    href: '#values',
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    text: 'Vorteile'
  },
  {
    href: '#workflow',
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
    text: 'Ablauf'
  },
  {
    href: '#metrics',
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 4m-2.5 2.5L19 4m-7 17l-2.5-2.5M7 7l2.5 2.5"></path>
      </svg>
    ),
    text: 'Leistung'
  },
  {
    href: '#contact',
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    text: 'Kontakt'
  }
];

export function GlassmorphicNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLoginClick = () => {
    window.location.href = '/onboarding-new';
  };

  return (
    <motion.nav
      id="glassmorphic-nav"
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-scrolled={isScrolled}
    >
      <motion.div
        className="navbar-container"
        layout
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="logo"
          layout
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="logo-icon">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
          </div>
          <span className="logo-text">Becker Solutions</span>
        </motion.div>

        {navItems.map((item, index) => (
          <motion.a
            key={item.href}
            href={item.href}
            className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.href);
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
          >
            <div className="nav-icon-wrapper">
              {item.icon}
            </div>
            <motion.span
              className="nav-text"
              layout
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {item.text}
            </motion.span>
          </motion.a>
        ))}

        {/* Login Button */}
        <motion.div
          className="nav-item"
          onClick={handleLoginClick}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: navItems.length * 0.1,
            ease: "easeOut" 
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="nav-icon-wrapper">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
            </svg>
          </div>
          <motion.span
            className="nav-text"
            layout
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Login
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
