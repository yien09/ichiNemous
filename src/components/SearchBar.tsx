import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { tmdbService, Movie, TVShow } from '@/services/tmdb';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onClose?: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => tmdbService.searchMulti(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setIsOpen(query.length > 2);
  }, [query]);

  const handleItemClick = (item: Movie | TVShow) => {
    const type = 'title' in item ? 'movie' : 'tv';
    navigate(`/${type}/${item.id}`);
    setQuery('');
    setIsOpen(false);
    onClose?.();
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setIsOpen(false);
      onClose?.();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search movies and TV shows..."
          className="pl-10 pr-12 h-12 text-lg backdrop-glass border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 card-gradient border border-border rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50"
          >
            {isLoading ? (
              <div className="p-4">
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-12 h-16 rounded bg-muted skeleton" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded skeleton" />
                        <div className="h-3 bg-muted rounded w-2/3 skeleton" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : searchResults?.results?.length ? (
              <div className="p-2">
                {searchResults.results.slice(0, 8).map((item) => {
                  const title = 'title' in item ? item.title : item.name;
                  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
                  const type = 'title' in item ? 'Movie' : 'TV Show';
                  
                  return (
                    <motion.button
                      key={`${item.id}-${'title' in item ? 'movie' : 'tv'}`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleItemClick(item)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth text-left group"
                    >
                      <div className="w-12 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={tmdbService.getImageURL(item.poster_path, 'w154')}
                          alt={title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-smooth truncate">
                          {title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {type} • {releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-medium text-accent">
                            ★ {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : query.length > 2 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-1">Try a different search term</p>
                <button
                  onClick={() => {
                    navigate(`/search?q=${encodeURIComponent(query)}`);
                    setQuery('');
                    setIsOpen(false);
                    onClose?.();
                  }}
                  className="mt-2 text-xs text-primary hover:underline"
                >
                  See all results
                </button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}