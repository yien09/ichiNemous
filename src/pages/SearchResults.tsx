import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '/Users/yien/Joy/Project/web_apps/ichinemous/src/services/tmdb';
import { NoResults } from '/Users/yien/Joy/Project/web_apps/ichinemous/src/components/NoResults';
import { MovieCard } from '/Users/yien/Joy/Project/web_apps/ichinemous/src/components/MovieCard';
import { motion } from 'framer-motion';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search-results', query],
    queryFn: () => tmdbService.searchMulti(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!query) {
    return <NoResults query="" />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-muted rounded w-64 skeleton" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[2/3] bg-muted rounded-xl skeleton" />
                <div className="h-4 bg-muted rounded skeleton" />
                <div className="h-3 bg-muted rounded w-3/4 skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!searchResults || searchResults.results.length === 0) {
    return <NoResults query={query} />;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Search Results
          </h1>
          <p className="text-muted-foreground">
            Found {searchResults.total_results.toLocaleString()} results for "{query}"
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {searchResults.results.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MovieCard item={item} variant="compact" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}