import { useState } from 'react';
import type { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';

interface NewReleaseSectionProps {
  movies: Movie[];
}

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 5;

export default function NewReleaseSection({ movies }: NewReleaseSectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, movies.length));
  };

  return (
    <section className="px-4 pb-10 md:px-[140px] md:pb-20 flex flex-col gap-6 md:gap-10">
      <h2 className="text-[#FDFDFD] font-bold text-[24px] leading-[36px] md:text-[36px] md:leading-[48px] md:tracking-[-0.02em]">
        New Release
      </h2>

      <div className="relative">
        {/* Grid kartu */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Gradient + tombol Load More */}
        {hasMore && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-[220px] bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
              <Button
                variant="ghost"
                onClick={handleLoadMore}
                className="text-[#FDFDFD] font-semibold text-base md:text-lg hover:bg-transparent hover:text-[#FDFDFD]/80"
              >
                Load More
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}