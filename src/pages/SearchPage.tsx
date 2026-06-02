import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Search, X, Star } from 'lucide-react';
import { useSearchMovies } from '@/hooks/useMovies';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Movie } from '@/types/movie';
import play_button from '@/assets/play_button.svg';
import heart from '@/assets/heart.svg';
import heart_filled from '@/assets/heart_filled.svg';

// ── Zod schema ──────────────────────────────────────────────
const searchSchema = z.object({
  query: z.string().min(1, 'Masukkan kata kunci pencarian'),
});
type SearchFormData = z.infer<typeof searchSchema>;

// ── SearchResultItem (local component) ──────────────────────
function SearchResultItem({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore();
  const favorited = isFavorite(movie.id);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

      {/* Poster + Info */}
      <div className="flex flex-row gap-4 md:gap-6 flex-1">
        <img
          src={getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          className="w-[104px] h-[156px] md:w-[182px] md:h-[270px] object-cover rounded-[8px] md:rounded-[12px] shrink-0 cursor-pointer"
          onClick={() => navigate(`/movie/${movie.id}`)}
        />

        <div className="flex flex-col gap-1 md:gap-6 flex-1">
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
          onClick={handleToggleFavorite}
          size="icon"
          className="w-11 h-11 bg-[rgba(10,13,18,0.6)] border border-[#181D27] backdrop-blur-[20px] rounded-full hover:bg-[rgba(10,13,18,0.8)]"
        >
          <img
            src={favorited ? heart_filled : heart}
            alt="Favorite"
            className="w-[18px] h-[18px]"
          />
        </Button>
      </div>

      {/* Heart button — desktop only */}
      <Button
        onClick={handleToggleFavorite}
        size="icon"
        className="hidden md:flex w-[56px] h-[56px] bg-[rgba(10,13,18,0.6)] border border-[#181D27] backdrop-blur-[20px] rounded-full hover:bg-[rgba(10,13,18,0.8)] shrink-0 self-start"
      >
        <img
          src={favorited ? heart_filled : heart}
          alt="Favorite"
          className="w-6 h-6"
        />
      </Button>
    </div>
  );
}

// ── SearchPage ───────────────────────────────────────────────
export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') ?? '';

  // React Hook Form + Zod
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query },
  });

  const inputValue = watch('query');

  // Data fetching
  const { data, isLoading } = useSearchMovies(query);
  const results = data?.results ?? [];

  // Handlers
  const onSubmit = (data: SearchFormData) => {
    setSearchParams({ q: data.query.trim() });
  };

  const handleClear = () => {
    setValue('query', '');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-black">

      {/* ── Mobile custom header (overlays Navbar) ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 z-[60] bg-black flex items-center px-4 gap-4">

        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-[#FDFDFD] hover:bg-transparent hover:text-[#FDFDFD] w-6 h-6 shrink-0 p-0"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        {/* Search form dengan RHF + Zod */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex items-center gap-1 h-11 px-4 bg-[rgba(10,13,18,0.6)] border border-[#252B37] backdrop-blur-[20px] rounded-[12px]"
        >
          <Search className="w-5 h-5 text-[#717680] shrink-0" />
          <Input
            {...register('query')}
            placeholder="Search Movie"
            autoFocus
            className="flex-1 bg-transparent border-0 h-auto p-0 text-sm text-[#FDFDFD] placeholder:text-[#717680] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {inputValue && (
            <button type="button" onClick={handleClear} className="shrink-0">
              <X className="w-4 h-4 text-[#717680]" />
            </button>
          )}
        </form>
      </div>

      {/* ── Page content ── */}
      <div className="pt-[80px] md:pt-[154px] px-4 md:px-[140px] pb-10 md:pb-20">

        {/* Validation error (mobile) */}
        {errors.query && (
          <p className="text-red-400 text-sm mb-4 md:hidden">
            {errors.query.message}
          </p>
        )}

        {/* Loading */}
        {isLoading && (
          <p className="text-[#A4A7AE] text-sm">Mencari film...</p>
        )}

        {/* Results */}
        {!isLoading && results.length > 0 && (
          <div className="flex flex-col">
            {results.map((movie, index) => (
              <div key={movie.id}>
                <SearchResultItem movie={movie} />
                {index < results.length - 1 && (
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