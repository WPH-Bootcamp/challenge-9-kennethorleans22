import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types/movie';
import play_button from '@/assets/play_button.svg';
import heart_filled from '@/assets/heart_filled.svg';
import empty_favorites from '@/assets/empty_favorites.svg';

function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 py-16 md:py-24">
      {/* Icon + Text */}
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <div className="w-[200px] h-[200px] flex items-center justify-center">
          <img
            src={empty_favorites}
            alt="No Favorites"
            className="w-[200px] h-[200px] object-contain opacity-50"
          />

          <div className="w-[200px] h-[200px] rounded-full bg-[#456188] opacity-50 mix-blend-luminosity" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold text-base leading-[30px] text-center text-white">
            Data Empty
          </p>
          <p className="text-[14px] leading-[28px] text-center text-[#A4A7AE]">
            You don't have a favorite movie yet
          </p>
        </div>
      </div>

      {/* Button */}
      <Button
        onClick={() => navigate('/')}
        className="w-[200px] h-11 md:w-[300px] md:h-[52px] bg-[#961200] hover:bg-[#961200]/90 rounded-full text-[#FDFDFD] font-semibold text-sm md:text-base"
      >
        Explore Movie
      </Button>
    </div>
  );
}

function FavoriteItem({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  const { removeFromFavorites } = useMovieStore();

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
      {/* Poster + Info */}
      <div className="flex flex-row gap-4 md:gap-6 flex-1">
        {/* Poster */}
        <img
          src={getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          className="w-[104px] h-[156px] md:w-[182px] md:h-[270px] object-cover rounded-[8px] md:rounded-[12px] shrink-0 cursor-pointer"
          onClick={() => navigate(`/movie/${movie.id}`)}
        />

        {/* Info column */}
        <div className="flex flex-col gap-1 md:gap-6 flex-1">
          {/* Text group */}
          <div className="flex flex-col gap-1 md:gap-3">
            <h3
              className="font-bold text-[16px] md:text-[24px] leading-[30px] md:leading-[36px] text-[#FDFDFD] line-clamp-2 md:line-clamp-1 cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {movie.title}
            </h3>

            <div className="flex items-center gap-1">
              <Star className="w-[18px] h-[18px] md:w-6 md:h-6 fill-[#E4A802] text-[#E4A802] shrink-0" />
              <span className="font-medium text-[14px] md:text-[18px] leading-[28px] md:leading-[32px] text-[#FDFDFD]">
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>

            <p className="text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE] line-clamp-2">
              {movie.overview}
            </p>
          </div>

          {/* Watch Trailer — desktop only */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="w-[200px] h-[52px] bg-[#961200] hover:bg-[#961200]/90 rounded-full text-[#FDFDFD] font-semibold text-base"
            >
              Watch Trailer
              <img src={play_button} alt="Play" className="w-6 h-6 object-contain" />
            </Button>
          </div>
        </div>
      </div>
      {/* END Poster + Info */}

      {/* Buttons row — mobile only */}
      <div className="flex md:hidden flex-row gap-4">
        <Button
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="flex-1 h-11 bg-[#961200] hover:bg-[#961200]/90 rounded-full text-[#FDFDFD] font-semibold text-sm"
        >
          Watch Trailer
          <img src={play_button} alt="Play" className="w-[18px] h-[18px] object-contain" />
        </Button>
        <Button
          onClick={() => removeFromFavorites(movie.id)}
          size="icon"
          className="w-11 h-11 bg-[rgba(10,13,18,0.6)] border border-[#181D27] backdrop-blur-[20px] rounded-full hover:bg-[rgba(10,13,18,0.8)]"
        >
          <img src={heart_filled} alt="Remove from Favorites" className="w-[18px] h-[18px]" />
        </Button>
      </div>

      {/* Heart button — desktop only */}
      <Button
        onClick={() => removeFromFavorites(movie.id)}
        size="icon"
        className="hidden md:flex w-[56px] h-[56px] bg-[rgba(10,13,18,0.6)] border border-[#181D27] backdrop-blur-[20px] rounded-full hover:bg-[rgba(10,13,18,0.8)] shrink-0 self-start"
      >
        <img src={heart_filled} alt="Remove from Favorites" className="w-6 h-6" />
      </Button>
    </div>
  );
}

export default function FavoritesPage() {
  const { favorites } = useMovieStore();

  return (
    <div className="min-h-screen bg-black pt-[88px] md:pt-[154px] px-4 md:px-[140px] pb-10 md:pb-20">
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Heading */}
        <h1 className="font-bold text-[24px] md:text-[36px] leading-[36px] md:leading-[48px] md:tracking-[-0.02em] text-[#FDFDFD]">
          Favorites
        </h1>

        {/* Conditional: empty state atau list */}
        {favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col">
            {favorites.map((movie, index) => (
              <div key={movie.id}>
                <FavoriteItem movie={movie} />
                {index < favorites.length - 1 && (
                  <div className="py-8 md:py-12">
                    <div className="border-t border-[#252B37]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
