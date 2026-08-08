import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    title: 'Minimalist Autumn',
    subtitle: 'Elevated essentials designed for everyday comfort.',
    tag: 'NEW SEASON 2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop',
    title: 'Urban Simplicity',
    subtitle: 'Classic tailoring meets modern casual wear.',
    tag: 'COLLECTIONS',
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    title: 'Luxe Loungewear',
    subtitle: 'Indulge in pure organic fabrics and soft silhouettes.',
    tag: 'VÉLOURE SIGNATURE',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[650px] overflow-hidden bg-neutral-100">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35 z-10" />
          
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-[6000ms]"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-8 sm:px-16 lg:px-24 text-white max-w-4xl">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-200 mb-4 animate-fade-in">
              {slide.tag}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide font-serif mb-6 leading-tight drop-shadow-sm">
              {slide.title}
            </h1>
            <p className="text-sm sm:text-lg text-neutral-200 font-light mb-8 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            <button className="flex items-center space-x-3 bg-white text-neutral-950 px-8 py-3.5 rounded-full hover:bg-neutral-100 transition-all duration-300 font-medium text-xs tracking-wider shadow-lg transform hover:-translate-y-0.5">
              <span>EXPLORE NOW</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
