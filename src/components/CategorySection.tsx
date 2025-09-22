import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieCard } from './MovieCard';
import { Movie, TVShow } from '@/services/tmdb';

interface CategorySectionProps {
  title: string;
  items: (Movie | TVShow)[];
  isLoading?: boolean;
}

export function CategorySection({ title, items, isLoading }: CategorySectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 280; // Card width + gap

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalWidth = items.length * itemWidth;
        setMaxScroll(Math.max(0, totalWidth - containerWidth));
      }
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, [items.length, itemWidth]);

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - itemWidth * 3);
    setScrollPosition(newPosition);
  };

  const scrollRight = () => {
    const newPosition = Math.min(maxScroll, scrollPosition + itemWidth * 3);
    setScrollPosition(newPosition);
  };

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="h-8 w-48 bg-muted rounded skeleton" />
          </div>
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-64">
                <div className="card-gradient rounded-xl border border-border/50 overflow-hidden">
                  <div className="h-72 bg-muted skeleton" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded skeleton" />
                    <div className="h-3 bg-muted rounded w-3/4 skeleton" />
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded skeleton" />
                      <div className="h-3 bg-muted rounded w-5/6 skeleton" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-foreground"
          >
            {title}
          </motion.h2>

          {/* Navigation Buttons */}
          <div className="hidden sm:flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={scrollLeft}
              disabled={scrollPosition === 0}
              className="glow-hover transition-smooth"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={scrollRight}
              disabled={scrollPosition >= maxScroll}
              className="glow-hover transition-smooth"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="relative">
          {/* Desktop Navigation */}
          <div ref={containerRef} className="hidden sm:block overflow-hidden">
            <motion.div
              className="flex space-x-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-64"
                >
                  <MovieCard item={item} variant="default" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="sm:hidden overflow-x-auto scrollbar-hide scroll-smooth">
            <div className="flex space-x-4 px-4 py-2" style={{ width: 'max-content' }}>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-64 snap-start"
                >
                  <MovieCard item={item} variant="default" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Gradient Overlays */}
          <div className="hidden sm:block">
            {scrollPosition > 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            )}
            {scrollPosition < maxScroll && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            )}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="sm:hidden mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Swipe to see more →
          </p>
        </div>
      </div>
    </section>
  );
}