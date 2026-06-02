import { useState } from 'react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Star, CircleCheck } from 'lucide-react';
import { useMovieDetails, useMovieCredits, useMovieVideos } from '@/hooks/useMovies';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { CastMember } from '@/types/movie';
import play_button from '@/assets/play_button.svg';
import video_roll from '../assets/video_roll.svg';
import heart from '../assets/heart.svg';
import emoji_happy from '../assets/emoji_happy.svg';
import heart_filled from '../assets/heart_filled.svg';

function StatCard({
  icon,
  label,
  value,
  desktop = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  desktop?: boolean;
}) {
  return (
    <Card
      className={`flex-1 flex flex-col items-center border border-[#252B37] bg-black rounded-[16px] shadow-none ${
        desktop ? 'gap-2 p-5' : 'gap-2 p-4'
      }`}
    >
      {icon}
      <div className="flex flex-col items-center">
        <span
          className={`text-center text-[#D5D7DA] ${
            desktop ? 'text-base leading-[30px]' : 'text-xs leading-[24px]'
          }`}
        >
          {label}
        </span>
        <span
          className={`font-semibold text-center text-[#FDFDFD] ${
            desktop ? 'text-[20px] leading-[34px]' : 'text-[18px] leading-[32px]'
          }`}
        >
          {value}
        </span>
      </div>
    </Card>
  );
}

function CastCard({ member }: { member: CastMember }) {
  return (
    <div className="flex flex-row items-center gap-3 md:gap-4">
      <img
        src={getImageUrl(member.profile_path, 'w185')}
        alt={member.name}
        className="w-[55px] h-[84px] md:w-[69px] md:h-[104px] object-cover rounded-[8px] md:rounded-[10px] shrink-0"
      />
      <div className="flex flex-col">
        <span className="font-semibold text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#FDFDFD]">
          {member.name}
        </span>
        <span className="text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE]">
          {member.character}
        </span>
      </div>
    </div>
  );
}

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data: movie, isLoading } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videosData } = useMovieVideos(movieId);

  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore();

  const favorited = movie ? isFavorite(movie.id) : false;
  const [showToast, setShowToast] = useState(false);

  const trailer = videosData?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  const handleWatchTrailer = () => {
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
    }
  };

  const handleToggleFavorite = () => {
    if (!movie) return;
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black animate-pulse" />;
  }

  if (!movie) return null;

  const cast = credits?.cast.slice(0, 5) ?? [];
  const firstGenre = movie.genres?.[0]?.name ?? 'N/A';
  const ageLimit = movie.adult ? '18+' : '13+';

  return (
    <div className="relative min-h-screen bg-black">

      {/* Background image + gradient */}
      <div className="absolute top-0 left-0 w-full h-[345px] md:h-[810px]">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 103.21%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative pt-[222px] md:pt-[412px] px-4 md:px-[140px] pb-10 md:pb-20 flex flex-col gap-6 md:gap-12">

        {/* TOP SECTION
            Mobile : thumbnail kiri | title+date kanan
            Desktop: poster kiri   | title+date+buttons+stats kanan */}
        <div className="flex flex-row gap-4 md:gap-8 items-start">

          {/* Poster / Thumbnail */}
          <img
            src={getImageUrl(movie.poster_path, 'w342')}
            alt={movie.title}
            className="w-[116px] h-[171px] md:w-[260px] md:h-[384px] object-cover rounded-[12px] shrink-0"
          />

          {/* Info column */}
          <div className="flex flex-col gap-3 md:gap-6 flex-1">

            {/* Judul */}
            <h1 className="font-bold text-[20px] leading-[34px] md:text-[40px] md:leading-[56px] md:tracking-[-0.02em] text-[#FDFDFD] line-clamp-2">
              {movie.title}
            </h1>

            {/* Tanggal rilis */}
            <div className="flex items-center gap-1 md:gap-2">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#FDFDFD] shrink-0" />
              <span className="text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-white">
                {formatDate(movie.release_date)}
              </span>
            </div>

            {/* Buttons — desktop only */}
            <div className="hidden md:flex flex-row gap-4">
              {trailer && (
                <Button
                  onClick={handleWatchTrailer}
                  className="w-[220px] h-[52px] bg-[#961200] hover:bg-[#961200]/90 rounded-full text-[#FDFDFD] font-semibold text-base"
                >
                  Watch Trailer
                  <img src={play_button} alt="Play" className="w-6 h-6 object-contain" />
                </Button>
              )}
              <Button
                onClick={handleToggleFavorite}
                size="icon"
                className="w-[52px] h-[52px] bg-[rgba(10,13,18,0.6)] border border-[#181D27] backdrop-blur-[20px] rounded-full hover:bg-[rgba(10,13,18,0.8)]"
              >
                <img
                  src={favorited ? heart_filled : heart}
                  alt="Favourite Icon"
                  className="w-6 h-6"
                />
              </Button>
            </div>

            {/* Stat cards — desktop only */}
            <div className="hidden md:flex flex-row gap-5">
              <StatCard
                icon={<Star className="w-8 h-8 fill-[#E4A802] text-[#E4A802]" />}
                label="Rating"
                value={`${movie.vote_average.toFixed(1)}/10`}
                desktop
              />
              <StatCard
                icon={<img src={video_roll} alt="Genre Icon" className="w-8 h-8" />}
                label="Genre"
                value={firstGenre}
                desktop
              />
              <StatCard
                icon={<img src={emoji_happy} alt="Age Limit Icon" className="w-8 h-8" />}
                label="Age Limit"
                value={ageLimit}
                desktop
              />
            </div>

          </div>
          {/* END Info column */}

        </div>
        {/* END TOP SECTION */}

        {/* Buttons — mobile only */}
        <div className="flex md:hidden flex-row gap-4">
          {trailer && (
            <Button
              onClick={handleWatchTrailer}
              className="flex-1 h-11 bg-[#961200] hover:bg-[#961200]/90 rounded-full text-[#FDFDFD] font-semibold text-sm"
            >
              Watch Trailer
              <img src={play_button} alt="Play" className="w-[18px] h-[18px] object-contain" />
            </Button>
          )}
          <Button
            onClick={handleToggleFavorite}
            size="icon"
            className="w-11 h-11 bg-[rgba(10,13,18,0.6)] border border-[#181D27] backdrop-blur-[20px] rounded-full hover:bg-[rgba(10,13,18,0.8)]"
          >
            <img
              src={favorited ? heart_filled : heart}
              alt="Favourite Icon"
              className="w-[18px] h-[18px]"
            />
          </Button>
        </div>

        {/* Stat cards — mobile only */}
        <div className="flex md:hidden flex-row gap-3">
          <StatCard
            icon={<Star className="w-6 h-6 fill-[#E4A802] text-[#E4A802]" />}
            label="Rating"
            value={`${movie.vote_average.toFixed(1)}/10`}
          />
          <StatCard
            icon={<img src={video_roll} alt="Genre Icon" className="w-6 h-6" />}
            label="Genre"
            value={firstGenre}
          />
          <StatCard
            icon={<img src={emoji_happy} alt="Age Limit Icon" className="w-6 h-6" />}
            label="Age Limit"
            value={ageLimit}
          />
        </div>

        {/* Overview */}
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[20px] leading-[34px] md:text-[32px] md:leading-[46px] md:tracking-[-0.02em] text-[#FDFDFD]">
            Overview
          </h2>
          <p className="text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE]">
            {movie.overview}
          </p>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="font-bold text-[20px] leading-[34px] md:text-[32px] md:leading-[46px] md:tracking-[-0.02em] text-[#FDFDFD]">
              Cast & Crew
            </h2>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-10">
              {cast.map((member) => (
                <CastCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

      </div>
      {/* END Main content */}

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[114px] left-1/2 -translate-x-1/2 z-50 flex flex-row justify-center items-center px-6 gap-3 h-[52px] w-[90%] max-w-[531px] bg-[rgba(0,0,0,0.25)] backdrop-blur-[20px] rounded-[16px]"
          >
            <CircleCheck className="w-6 h-6 text-white shrink-0" />
            <span className="text-base font-medium text-white whitespace-nowrap">
              Success Add to Favorites
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}