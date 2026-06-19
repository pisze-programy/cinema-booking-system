import { Movie, SeatStatus } from '@/types/cinema.ts';

const request = async <T>(method: string, path: string, body?: unknown): Promise<T> => {
  // TODO: Fix API URL override
  const response = await fetch(`http://localhost:3000/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

export const cinemaApi = {
  getMovies: () => request<Movie[]>('GET', `movies`),
  getSeats: (movieId: string) => request<SeatStatus[]>('GET', `movies/${movieId}/seats`),
};
