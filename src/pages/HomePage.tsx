import { usePopularMovies, useNowPlayingMovies } from '@/hooks/useMovies';
import HeroSection from '@/components/HeroSection';
import TrendingSection from '@/components/TrendingSection';
import NewReleaseSection from '@/components/NewReleaseSection';

export default function HomePage() {
  const { data: popularData, isLoading: popularLoading } = usePopularMovies();
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useNowPlayingMovies();

  return (
    <main>
      {/* Hero — film pertama dari now playing */}
      <HeroSection />

      {/* Trending Now — data popular */}
      {popularLoading ? (
        <div className="px-4 md:px-[140px] py-10">
          <div className="h-8 w-48 bg-[#252B37] rounded animate-pulse mb-6" />
          <div className="flex gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-[216px] h-[321px] bg-[#252B37] rounded-[12px] animate-pulse shrink-0" />
            ))}
          </div>
        </div>
      ) : (
        <TrendingSection movies={popularData?.results ?? []} />
      )}

      {/* New Release — data now playing */}
      {nowPlayingLoading ? (
        <div className="px-4 md:px-[140px] py-10">
          <div className="h-8 w-48 bg-[#252B37] rounded animate-pulse mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-full h-[266px] md:h-[321px] bg-[#252B37] rounded-[12px] animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <NewReleaseSection movies={nowPlayingData?.results ?? []} />
      )}
    </main>
  );
}