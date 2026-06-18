import { useEffect, useState } from 'react';
import { Movie } from '@/types/cinema';
import { cinemaApi } from '@/utils/api';

export const useMoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const movies = await cinemaApi.getMovies();
        setMovies(movies);
      } catch (e) {
        console.log('Error getMovies', e);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);

  return {
    movies,
    loading,
  };
};
