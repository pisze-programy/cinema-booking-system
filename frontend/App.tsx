import { useMoviesList } from './hooks/useMoviesList.ts';
import { Grid } from '@/components/Seats/Grid.tsx';
import { MovieList } from '@/components/Movie/List.tsx';
import { useSeatsForMovie } from '@/hooks/useSeatsForMovie.ts';
import { useState } from 'react';
import { Movie } from '@/types/cinema.ts';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { movies, loading: loadingMoviesData } = useMoviesList();
  const { seats, loading: loadingSeatsData } = useSeatsForMovie(selectedMovie);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Event Booking</h1>
      </header>

      <div className="cinema-page">
        {loadingMoviesData ? (
          <p>Loading movies data...</p>
        ) : (
          <MovieList movies={movies} selectedMovieId={selectedMovie?.id} onSelect={setSelectedMovie} />
        )}

        {selectedMovie?.id && loadingSeatsData && <p>Loading seats data...</p>}

        {selectedMovie?.id && seats.length && <Grid movie={selectedMovie} seats={seats} />}
      </div>
    </div>
  );
}
