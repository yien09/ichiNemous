import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWatchlist } from '@/hooks/useLocalStorage';
import { tmdbService } from '@/services/tmdb';
import { useNavigate } from 'react-router-dom';

export function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const handleItemClick = (id: number, type: 'movie' | 'tv') => {
    navigate(`/${type}/${id}`);
  };

  const handleRemove = (id: number, type: 'movie' | 'tv', e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromWatchlist(id, type);
  };

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 rounded-full hero-gradient flex items-center justify-center mx-auto mb-8 glow-primary">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Watchlist is Empty</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start building your collection by adding movies and TV shows you want to watch later.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="hero-gradient text-white border-0 px-8 py-3 text-lg font-semibold glow-primary hover:glow-hover transition-smooth"
            >
              Discover Movies
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center glow-primary">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Watchlist</h1>
              <p className="text-muted-foreground">
                {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </motion.div>

        {/* Watchlist Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
        >
          {watchlist.map((item, index) => (
            <motion.div
              key={`${item.id}-${item.type}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer group"
              onClick={() => handleItemClick(item.id, item.type)}
            >
              <div className="relative overflow-hidden rounded-xl card-gradient border border-border/50 shadow-lg glow-hover transition-smooth">
                {/* Poster Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={tmdbService.getImageURL(item.poster_path, 'w500')}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Remove Button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => handleRemove(item.id, item.type, e)}
                      className="backdrop-glass border-0 bg-destructive/20 text-destructive hover:bg-destructive/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="backdrop-glass border-0 bg-background/20 text-foreground">
                      {item.type === 'movie' ? '🎬 Movie' : '📺 TV Show'}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Added to watchlist
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}