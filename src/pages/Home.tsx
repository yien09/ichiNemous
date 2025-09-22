import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '@/services/tmdb';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';

export function Home() {
  const { data: popularMovies, isLoading: isLoadingPopular } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => tmdbService.getPopularMovies(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const { data: topRatedMovies, isLoading: isLoadingTopRated } = useQuery({
    queryKey: ['top-rated-movies'],
    queryFn: () => tmdbService.getTopRatedMovies(),
    staleTime: 1000 * 60 * 30,
  });

  const { data: nowPlayingMovies, isLoading: isLoadingNowPlaying } = useQuery({
    queryKey: ['now-playing-movies'],
    queryFn: () => tmdbService.getNowPlayingMovies(),
    staleTime: 1000 * 60 * 30,
  });

  const { data: upcomingMovies, isLoading: isLoadingUpcoming } = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: () => tmdbService.getUpcomingMovies(),
    staleTime: 1000 * 60 * 30,
  });

  const { data: popularTVShows, isLoading: isLoadingTVShows } = useQuery({
    queryKey: ['popular-tv-shows'],
    queryFn: () => tmdbService.getPopularTVShows(),
    staleTime: 1000 * 60 * 30,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Categories */}
      <div className="space-y-8 pb-16">
        <CategorySection
          title="🍿 Popular Movies"
          items={popularMovies?.results || []}
          isLoading={isLoadingPopular}
        />

        <CategorySection
          title="⭐ Top Rated"
          items={topRatedMovies?.results || []}
          isLoading={isLoadingTopRated}
        />

        <CategorySection
          title="🎬 Now Playing"
          items={nowPlayingMovies?.results || []}
          isLoading={isLoadingNowPlaying}
        />

        <CategorySection
          title="📺 Popular TV Shows"
          items={popularTVShows?.results || []}
          isLoading={isLoadingTVShows}
        />

        <CategorySection
          title="🚀 Coming Soon"
          items={upcomingMovies?.results || []}
          isLoading={isLoadingUpcoming}
        />
      </div>
    </motion.div>
  );
}