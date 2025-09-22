import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { tmdbService, Movie } from '@/services/tmdb';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const { data: trendingMovies } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => tmdbService.getTrendingMovies('week'),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const heroMovies = trendingMovies?.results?.slice(0, 5) || [];

  useEffect(() => {
    if (heroMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroMovies.length]);

  if (!heroMovies.length) {
    return (
      <section className="relative h-[70vh] bg-muted animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-48 h-8 bg-muted-foreground/20 rounded mb-4 mx-auto" />
            <div className="w-96 h-4 bg-muted-foreground/20 rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  const currentMovie = heroMovies[currentIndex];

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={tmdbService.getBackdropURL(currentMovie.backdrop_path, 'original')}
              alt={currentMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Category Badge */}
                  <Badge variant="secondary" className="hero-gradient text-white border-0 px-4 py-2">
                    🔥 Trending Now
                  </Badge>

                  {/* Title */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    {currentMovie.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 fill-current text-accent" />
                      <span className="font-semibold text-accent">
                        {currentMovie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(currentMovie.release_date).getFullYear()}</span>
                    </div>
                  </div>

                  {/* Overview */}
                  <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3">
                    {currentMovie.overview}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => navigate(`/movie/${currentMovie.id}`)}
                      className="hero-gradient text-white border-0 px-8 py-3 text-lg font-semibold glow-primary hover:glow-hover transition-smooth"
                    >
                      <Play className="w-5 h-5 mr-2 fill-current" />
                      Watch Now
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/movie/${currentMovie.id}`)}
                      className="backdrop-glass border-border/50 px-8 py-3 text-lg font-semibold hover:bg-secondary/80 transition-smooth"
                    >
                      <Info className="w-5 h-5 mr-2" />
                      More Info
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentIndex
                ? 'bg-primary glow-primary'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 right-8 hidden lg:block"
      >
        <div className="flex flex-col items-center text-muted-foreground">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}