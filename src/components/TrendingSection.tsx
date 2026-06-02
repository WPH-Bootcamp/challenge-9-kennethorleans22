import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard';

interface TrendingSectionProps {
  movies: Movie[];
}

export default function TrendingSection({ movies }: TrendingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState);
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [movies]);

  const handleNext = () => {
    scrollRef.current?.scrollBy({ left: 236, behavior: 'smooth' });
  };

  const handlePrev = () => {
    scrollRef.current?.scrollBy({ left: -236, behavior: 'smooth' });
  };

  return (
    <section className="px-4 pt-10 pb-0 md:px-[140px] md:pt-0 md:pb-20 flex flex-col gap-6 md:gap-10">
      <h2 className="text-[#FDFDFD] font-bold text-[24px] leading-[36px] md:text-[36px] md:leading-[48px] md:tracking-[-0.02em]">
        Trending Now
      </h2>

      <div className="relative overflow-hidden">
        {/* Kartu-kartu film */}
        <div
          ref={scrollRef}
          className="flex flex-row gap-4 md:gap-5 overflow-x-auto scrollbar-none"
        >
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} rank={index + 1} />
          ))}
        </div>

        {/* Gradient kiri — muncul setelah scroll kanan */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 h-full w-24 md:w-[180px] bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        )}

        {/* Gradient kanan — selama masih ada konten */}
   {canScrollRight && (
  <div className="absolute right-0 top-0 h-full w-32 md:w-[260px] bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />
)}

        {/* Tombol kiri */}
        {canScrollLeft && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px] rounded-full"
          >
            <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-[#FDFDFD]" />
          </button>
        )}

        {/* Tombol kanan */}
        {canScrollRight && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px] rounded-full"
          >
            <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-[#FDFDFD]" />
          </button>
        )}
      </div>
    </section>
  );
}