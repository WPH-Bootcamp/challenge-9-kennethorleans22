import { useNowPlayingMovies } from '@/hooks/useMovies';
import { getImageUrl } from '@/lib/utils';
import play_button from '../assets/play_button.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { data, isLoading } = useNowPlayingMovies();
  const navigate = useNavigate();

  const featuredMovie = data?.results[0];

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-[#0A0D12] animate-pulse" />
    );
  }

  if (!featuredMovie) return null;

  return (
    <section className="relative w-full h-screen md:h-[810px]">
      {/* Background image */}
      <img
        src={getImageUrl(featuredMovie.backdrop_path, 'original')}
        alt={featuredMovie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.85) 90%, #000000 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute left-4 md:left-[140px] bottom-[80px] md:bottom-auto md:top-[298px] w-[calc(100%-32px)] md:w-[635px]">

        {/* Judul + Deskripsi */}
        <div className="flex flex-col gap-4 md:gap-4 mb-6 md:mb-12">
          <h1 className="font-bold text-[24px] leading-[36px] md:text-[48px] md:leading-[60px] md:tracking-[-0.02em] text-[#FDFDFD]">
            {featuredMovie.title}
          </h1>
          <p className="text-[14px] leading-[28px] md:text-[16px] md:leading-[30px] text-[#A4A7AE] line-clamp-3">
            {featuredMovie.overview}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-4">
          {/* Watch Trailer */}
          <Button
            onClick={() => navigate(`/movie/${featuredMovie.id}`)}
            className="h-11 md:h-[52px] md:w-[230px] bg-[#961200] hover:bg-[#961200]/90 rounded-full text-[#FDFDFD] font-semibold text-sm md:text-base px-8"
          >
            Watch Trailer
            <img
              src={play_button}
              alt="Play Button"
              className="w-[18px] h-[18px] md:w-6 md:h-6 object-contain"
            />
          </Button>

          {/* See Detail */}
          <Button
            onClick={() => navigate(`/movie/${featuredMovie.id}`)}
            className="h-11 md:h-[52px] md:w-[230px] bg-[rgba(10,13,18,0.6)] border border-[#181D27] backdrop-blur-[20px] rounded-full text-[#FDFDFD] font-semibold text-sm md:text-base px-8 hover:bg-[rgba(10,13,18,0.8)] hover:text-[#FDFDFD]"
          >
            See Detail
          </Button>
        </div>
      </div>
    </section>
  );
}