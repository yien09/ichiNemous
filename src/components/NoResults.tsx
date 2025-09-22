import { motion } from 'framer-motion';
import { Search, ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '@/services/tmdb';
import { MovieCard } from './MovieCard';

interface NoResultsProps {
  query: string;
  onBack?: () => void;
}

export function NoResults({ query, onBack }: NoResultsProps) {
  const navigate = useNavigate();

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['trending-suggestions'],
    queryFn: () => tmdbService.getTrendingMovies('week'),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* No Results Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 rounded-full card-gradient border border-border/50 flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            No Results Found
          </h1>
          
          <p className="text-lg text-muted-foreground mb-2">
            We couldn't find any movies or shows matching
          </p>
          <p className="text-xl font-medium text-foreground mb-8">
            "{query}"
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBack || (() => navigate('/'))}
              variant="outline"
              className="backdrop-glass border-border/50 glow-hover"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
            
            <Button
              onClick={() => navigate('/')}
              className="hero-gradient glow-primary"
            >
              Browse All Movies
            </Button>
          </div>
        </motion.div>

        {/* Search Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-gradient rounded-xl border border-border/50 p-6 mb-12"
        >
          <h2 className="text-xl font-semibold mb-4">Search Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Try different keywords or phrases</li>
            <li>• Check your spelling</li>
            <li>• Try searching for actors, directors, or genres</li>
            <li>• Use fewer words for broader results</li>
            <li>• Try the movie's original title if it's a foreign film</li>
          </ul>
        </motion.div>

        {/* Trending Suggestions */}
        {suggestions && suggestions.results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-accent mr-3" />
              <h2 className="text-2xl font-bold">Trending This Week</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {suggestions.results.slice(0, 6).map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <MovieCard item={movie} variant="compact" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[2/3] bg-muted rounded-xl skeleton" />
                <div className="h-4 bg-muted rounded skeleton" />
                <div className="h-3 bg-muted rounded w-3/4 skeleton" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}