import { GlassmorphicNav } from './components/GlassmorphicNav';
import SearchBar from './components/SearchBar';
import ScrollJourney from './components/ScrollJourney';
import './styles/index.css';
import './styles/glassmorphic-nav.css';
import './styles/search-bar.css';
import './styles/scroll-journey.css';

function App() {

  return (
    <div className="App">
        {/* Glassmorphic Navigation */}
        <GlassmorphicNav />

      {/* Sticky Search Bar */}
      <SearchBar />

      {/* Demo Content */}
      <main className="min-h-screen">
        <div className="content-section hero-section">
          {/* Hero Text Content - Above Spline */}
          <div className="hero-text-content">
            <h1>Becker Solutions</h1>
            <p>Industrie-führende Energie-Ausschreibungsplattform</p>
          </div>
          
          {/* Floating Particles Effect */}
          <div className="floating-particles"></div>
          
          {/* Additional Left Side Particles */}
          <div className="particle particle-left-1"></div>
          <div className="particle particle-left-2"></div>
          <div className="particle particle-left-3"></div>
          <div className="particle particle-left-4"></div>
          <div className="particle particle-left-5"></div>
          
          {/* Additional Right Side Particles */}
          <div className="particle particle-right-1"></div>
          <div className="particle particle-right-2"></div>
          <div className="particle particle-right-3"></div>
          <div className="particle particle-right-4"></div>
          <div className="particle particle-right-5"></div>
          
          {/* Top and Bottom Particles */}
          <div className="particle particle-top-1"></div>
          <div className="particle particle-top-2"></div>
          <div className="particle particle-top-3"></div>
          <div className="particle particle-bottom-1"></div>
          <div className="particle particle-bottom-2"></div>
          <div className="particle particle-bottom-3"></div>
        </div>

        {/* ScrollJourney Section */}
        <ScrollJourney />
      </main>
      </div>
  );
}

export default App;