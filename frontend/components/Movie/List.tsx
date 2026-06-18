import type { Movie } from '@/types/cinema';
import { Card } from './Card';

interface MovieListProps {
  movies: Movie[];
  selectedMovieId?: string;
  onSelect: (movie: Movie) => void;
}

export const MovieList = ({ movies, selectedMovieId, onSelect }: MovieListProps) => {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} selected={selectedMovieId === movie.id} onSelect={onSelect} />
      ))}
    </div>
  );
};
