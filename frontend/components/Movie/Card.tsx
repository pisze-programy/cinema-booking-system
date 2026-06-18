import type { Movie } from '@/types/cinema';

interface MovieCardProps {
  movie: Movie;
  selected: boolean;
  onSelect: (movie: Movie) => void;
}

export const Card = ({ movie, selected, onSelect }: MovieCardProps) => {
  return (
    <div className={`movie-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(movie)}>
      <h3>{movie.title}</h3>
    </div>
  );
};
