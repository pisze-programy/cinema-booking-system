import { useEffect, useState } from 'react';
import { Movie, SeatStatus } from '@/types/cinema';
import { cinemaApi } from '@/utils/api';

export const useSeatsForMovie = (selectedMovie: Movie | null) => {
  const [seats, setSeats] = useState<SeatStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const onMovieSelect = async (movie: Movie) => {
    setLoading(true);

    try {
      const seats = await cinemaApi.getSeats(movie.id);
      setSeats(seats);
    } catch (e) {
      console.log('Error getSeats', e);
      setSeats([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedMovie) return;
    onMovieSelect(selectedMovie);
  }, [selectedMovie]);

  return {
    seats,
    loading,
  };
};
