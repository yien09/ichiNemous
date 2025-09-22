import { motion } from 'framer-motion';
import { Star, Heart, Play, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { tmdbService, Movie, TVShow } from '@/services/tmdb';
import { useWatchlist } from '@/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  item: Movie | TVShow;
  variant?: 'default' | 'large' | 'compact';
  showGenres?: boolean;
}

export function MovieCard({ item, variant = 'default', showGenres = false }: MovieCardProps) {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  const title = 'title' in item ? item.title : item.name;
  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
  const type = 'title' in item ? 'movie' : 'tv';
  const inWatchlist = isInWatchlist(item.id, type);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(item.id, type);
    } else {
      addToWatchlist({
        id: item.id,
        type,
        title,
        poster_path: item.poster_path,
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/${type}/${item.id}`);
  };

  const cardVariants = {
    default: 'w-full max-w-sm',
    large: 'w-full max-w-md',
    compact: 'w-full max-w-xs',
  };

  const imageHeights = {
    default: 'h-64 sm:h-72',
    large: 'h-72 sm:h-80',
    compact: 'h-48 sm:h-56',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`${cardVariants[variant]} cursor-pointer group`}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-xl card-gradient border border-border/50 shadow-lg glow-hover transition-smooth">
        {/* Poster Image */}
        <div className={`relative ${imageHeights[variant]} overflow-hidden`}>
          <img
            src={tmdbService.getImageURL(item.poster_path, 'w500')}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleWatchlistToggle}
              className={`backdrop-glass border-0 ${
                inWatchlist 
                  ? 'bg-primary/20 text-primary glow-primary' 
                  : 'bg-background/20 text-foreground hover:bg-primary/20 hover:text-primary'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWatchlist ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center shadow-lg glow-primary"
            >
              <Play className="w-6 h-6 text-white ml-1 fill-current" />
            </motion.div>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="backdrop-glass border-0 bg-background/20 text-foreground">
              <Star className="w-3 h-3 mr-1 fill-current text-accent" />
              {item.vote_average.toFixed(1)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
              {title}
            </h3>
            {releaseDate && (
              <div className="flex items-center space-x-1 mt-1 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{new Date(releaseDate).getFullYear()}</span>
              </div>
            )}
          </div>

          {showGenres && item.genre_ids && (
            <div className="flex flex-wrap gap-1">
              {item.genre_ids.slice(0, 2).map((genreId) => (
                <Badge key={genreId} variant="outline" className="text-xs">
                  Genre {genreId}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-sm text-muted-foreground line-clamp-3">
            {item.overview || 'No overview available.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}