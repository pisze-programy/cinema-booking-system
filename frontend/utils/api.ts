import { Movie, SeatStatus } from '@/types/cinema.ts';

const request = async <T>(method: string, path: string, body?: unknown): Promise<T> => {
  const response = await fetch(path, {
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
  getMovies: () => request<Movie[]>('GET', '/movies'),

  getSeats: (movieId: string) => request<SeatStatus[]>('GET', `/movies/${movieId}/seats`),

  holdSeat: (movieId: string, seatId: string, userId: string) =>
    request('POST', `/movies/${movieId}/seats/${seatId}/hold`, { user_id: userId }),

  confirmSeat: (sessionId: string, userId: string) =>
    request('PUT', `/sessions/${sessionId}/confirm`, { user_id: userId }),

  releaseSeat: (sessionId: string, userId: string) => request('DELETE', `/sessions/${sessionId}`, { user_id: userId }),
};
