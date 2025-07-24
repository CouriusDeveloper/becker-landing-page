import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_PLACES_KEY: 'test-key',
    VITE_POSTHOG_KEY: 'test-posthog',
    VITE_SENTRY_DSN: 'test-sentry',
    VITE_APP_TITLE: 'Test App',
    VITE_APP_DESCRIPTION: 'Test Description',
    VITE_BUILD_TIME: '2024-01-01T00:00:00Z',
    MODE: 'test'
  }
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  useScroll: () => ({ scrollYProgress: 0 }),
  useTransform: () => 0,
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn(), inView: true }),
}));

// Mock react-use-gesture
vi.mock('react-use-gesture', () => ({
  useGesture: () => () => ({}),
}));

// Mock web-vitals
vi.mock('web-vitals', () => ({
  getCLS: vi.fn(),
  getFID: vi.fn(),
  getFCP: vi.fn(),
  getLCP: vi.fn(),
  getTTFB: vi.fn(),
}));

describe('Glassmorphic Landing Page', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.querySelector('.App')).toBeInTheDocument();
  });

  it('contains the hero headline as specified in requirements', () => {
    render(<App />);
    const headline = screen.getByText(/Energie-Ausschreibungen/);
    expect(headline).toBeInTheDocument();
    expect(headline.id).toBe('hero-headline');
  });

  it('contains the hero sub-headline as specified in requirements', () => {
    render(<App />);
    const subHeadline = screen.getByText(/34% Prozesskosten/);
    expect(subHeadline).toBeInTheDocument();
    expect(subHeadline.classList.contains('hero-sub')).toBe(true);
  });

  it('contains the sticky navigation header', () => {
    render(<App />);
    const nav = document.querySelector('#sticky-nav');
    expect(nav).toBeInTheDocument();
  });

  it('contains the hero section', () => {
    render(<App />);
    const hero = document.querySelector('#hero');
    expect(hero).toBeInTheDocument();
  });

  it('contains the values section', () => {
    render(<App />);
    const values = document.querySelector('#values');
    expect(values).toBeInTheDocument();
  });

  it('contains the metrics section', () => {
    render(<App />);
    const metrics = document.querySelector('#metrics');
    expect(metrics).toBeInTheDocument();
  });

  it('contains the workflow section', () => {
    render(<App />);
    const workflow = document.querySelector('#workflow');
    expect(workflow).toBeInTheDocument();
  });

  it('contains the pain ticker section', () => {
    render(<App />);
    const ticker = document.querySelector('#pain-ticker');
    expect(ticker).toBeInTheDocument();
  });

  it('contains the first pain point text as specified in SEO requirements', () => {
    render(<App />);
    const firstPainPoint = screen.getByText(/Langsame RFQs/);
    expect(firstPainPoint).toBeInTheDocument();
  });

  it('contains the first value card title as specified in SEO requirements', () => {
    render(<App />);
    const firstValueCard = screen.getByText(/95% schnellere/, { selector: 'h3' });
    expect(firstValueCard).toBeInTheDocument();
  });

  it('contains TWh label in metrics as specified in SEO requirements', () => {
    render(<App />);
    const twhLabel = document.querySelector('.label-twh');
    expect(twhLabel).toBeInTheDocument();
    expect(twhLabel?.textContent).toContain('TWh');
  });

  it('contains Bonitätscheck in workflow as specified in SEO requirements', () => {
    render(<App />);
    const bonitaetscheck = screen.getByText(/Bonitätscheck/, { selector: 'h3' });
    expect(bonitaetscheck).toBeInTheDocument();
  });

  it('has proper ARIA roles for accessibility', () => {
    render(<App />);
    const main = document.querySelector('main[role="main"]');
    expect(main).toBeInTheDocument();
    
    const nav = document.querySelector('header');
    expect(nav).toBeInTheDocument();
  });

  it('has address input with proper ARIA attributes', () => {
    render(<App />);
    const addressInput = screen.getByLabelText(/Firmenadresse/);
    expect(addressInput).toBeInTheDocument();
    expect(addressInput).toHaveAttribute('aria-expanded');
    expect(addressInput).toHaveAttribute('aria-describedby');
  });

  it('applies glass morphism classes correctly', () => {
    render(<App />);
    const glassElements = document.querySelectorAll('.glass');
    expect(glassElements.length).toBeGreaterThan(0);
  });

  it('contains the testimonials section', () => {
    render(<App />);
    const testimonials = document.querySelector('#testimonials');
    expect(testimonials).toBeInTheDocument();
  });

  it('contains the CTA section', () => {
    render(<App />);
    const cta = document.querySelector('#dark-cta');
    expect(cta).toBeInTheDocument();
  });

  it('contains the footer section', () => {
    render(<App />);
    const footer = document.querySelector('#site-footer');
    expect(footer).toBeInTheDocument();
  });

  it('contains Live-Demo text in CTA as specified in SEO requirements', () => {
    render(<App />);
    const liveDemoText = screen.getAllByText(/Live-Demo/)[0];
    expect(liveDemoText).toBeInTheDocument();
  });

  it('contains testimonial content with minimum length as specified', () => {
    render(<App />);
    const testimonialQuotes = document.querySelectorAll('#testimonials blockquote p');
    expect(testimonialQuotes.length).toBeGreaterThan(0);
    // Check first testimonial is at least 60 characters
    expect(testimonialQuotes[0]?.textContent?.length || 0).toBeGreaterThanOrEqual(60);
  });

  it('contains main keyword in footer small text as specified in SEO requirements', () => {
    render(<App />);
    const footerSmall = document.querySelector('#site-footer small');
    expect(footerSmall).toBeInTheDocument();
    expect(footerSmall?.textContent).toMatch(/Energie/);
  });
});