import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, Clock, Play, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { tmdbService, MovieDetails, Video, Cast } from '@/services/tmdb';
import { useWatchlist } from '@/hooks/useLocalStorage';
import { useState } from 'react';

export function MovieDetail() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const movieId = parseInt(id || '0');
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [showTrailer, setShowTrailer] = useState(false);

  const { data: movie, isLoading, error } = useQuery<MovieDetails>({
    queryKey: ['movie', movieId],
    queryFn: () => tmdbService.getMovieDetails(movieId),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const { data: videos } = useQuery<{ results: Video[] }>({
    queryKey: ['movie-videos', movieId],
    queryFn: () => tmdbService.getMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30,
  });

  const { data: credits } = useQuery<{ cast: Cast[] }>({
    queryKey: ['movie-credits', movieId],
    queryFn: () => tmdbService.getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="aspect-[2/3] bg-muted rounded-xl" />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-10 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full hero-gradient flex items-center justify-center mx-auto mb-8 glow-primary">
            <span className="text-4xl">🎬</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Movie Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The movie you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/')} className="hero-gradient glow-primary">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const trailer = videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  ) || videos?.results?.[0];

  const inWatchlist = isInWatchlist(movie.id, 'movie');

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id, 'movie');
    } else {
      addToWatchlist({
        id: movie.id,
        type: 'movie',
        title: movie.title,
        poster_path: movie.poster_path,
      });
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Backdrop with overlay */}
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src={tmdbService.getBackdropURL(movie.backdrop_path, 'w1280')}
            alt={movie.title}
            className="w-full h-[60vh] lg:h-[70vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                className="backdrop-glass border-0 glow-hover"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </motion.div>

            {/* Movie Info Grid */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-1"
              >
                <div className="relative group">
                  <img
                    src={tmdbService.getImageURL(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-xl border border-border/20 group-hover:border-primary/50 transition-smooth" />
                </div>
              </motion.div>

              {/* Movie Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Title and Rating */}
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-2">
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <p className="text-lg text-muted-foreground italic mb-4">
                      "{movie.tagline}"
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                      <span className="text-muted-foreground">
                        ({movie.vote_count.toLocaleString()} votes)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id} variant="secondary" className="backdrop-glass">
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                {/* Overview */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {movie.overview}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {trailer && (
                    <Button
                      onClick={() => setShowTrailer(!showTrailer)}
                      className="hero-gradient glow-primary px-6"
                    >
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      {showTrailer ? 'Hide' : 'Watch'} Trailer
                    </Button>
                  )}
                  
                  <Button
                    variant="secondary"
                    onClick={handleWatchlistToggle}
                    className={`backdrop-glass border-0 ${
                      inWatchlist ? 'glow-primary' : 'glow-hover'
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${inWatchlist ? 'fill-current' : ''}`} />
                    {inWatchlist ? 'Remove from' : 'Add to'} Watchlist
                  </Button>
                  
                  <Button variant="outline" className="backdrop-glass border-border/50">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Movie Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  <div className="card-gradient p-4 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="text-lg font-semibold">
                      {movie.budget > 0 ? formatCurrency(movie.budget) : 'N/A'}
                    </p>
                  </div>
                  <div className="card-gradient p-4 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-lg font-semibold">
                      {movie.revenue > 0 ? formatCurrency(movie.revenue) : 'N/A'}
                    </p>
                  </div>
                  <div className="card-gradient p-4 rounded-lg border border-border/50 col-span-2 md:col-span-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-lg font-semibold">{movie.status}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {showTrailer && trailer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="py-8 border-t border-border/50"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Official Trailer</h2>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                title={trailer.name}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Cast Section */}
      {credits?.cast && credits.cast.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                {credits.cast.slice(0, 10).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex-shrink-0 w-32 text-center group"
                  >
                    <div className="relative">
                      <img
                        src={
                          actor.profile_path
                            ? tmdbService.getImageURL(actor.profile_path, 'w154')
                            : '/placeholder.svg'
                        }
                        alt={actor.name}
                        className="w-32 h-32 rounded-full object-cover border-2 border-border/50 group-hover:border-primary/50 transition-smooth"
                      />
                    </div>
                    <p className="mt-2 font-medium text-sm">{actor.name}</p>
                    <p className="text-xs text-muted-foreground">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}