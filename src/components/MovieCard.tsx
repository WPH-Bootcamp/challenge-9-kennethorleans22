import { useNavigate } from 'react-router-dom';
import type { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/utils';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

export default function MovieCard({ movie, rank }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="flex flex-col gap-2 md:gap-3 cursor-pointer shrink-0 border-0 bg-transparent shadow-none p-0 rounded-none"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* Poster */}
      <div className="relative w-[173px] h-[266px] md:w-[216px] md:h-[321px]">
        <img
          src={getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          className="w-full h-full object-cover rounded-[12px]"
        />

        {/* Badge nomor */}
        {rank !== undefined && (
          <Badge
            className="absolute left-2 top-2 md:left-3 md:top-3 w-8 h-8 md:w-12 md:h-12 p-0 flex items-center justify-center bg-almost-black/60 backdrop-blur-[17px] rounded-full border-0 text-[#FDFDFD] font-semibold text-sm md:text-lg"
          >
            {rank}
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 w-[173px] md:w-[216px]">
        <h3 className="text-[#FDFDFD] font-semibold text-base md:text-lg leading-[30px] md:leading-[32px] truncate">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1">
          <Star className="w-[18px] h-[18px] md:w-5 md:h-5 fill-[#E4A802] text-[#E4A802] shrink-0" />
          <span className="text-[#A4A7AE] text-sm md:text-base">
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
      </div>
    </Card>
  );
}