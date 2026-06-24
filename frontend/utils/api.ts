import {
  MovieListResponse,
  ReservationPaymentBodyRequest,
  ReservationPaymentBodyResponse,
  ShowTimeSeatsReservationBodyRequest,
  ShowTimeSeatsReservationBodyResponse,
  ShowtimeSeatsReservationResponse,
  ShowtimeSeatsResponse,
} from "@/types/apiResponse"

const request = async <T>(method: string, path: string, body?: unknown): Promise<T> => {
  // TODO: Fix API URL override
  const response = await fetch(`http://localhost:3000/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Request failed")
  }

  return data
}

export const cinemaApi = {
  getMovies: (date: string) => request<MovieListResponse[]>("GET", `movies?date=${date}`),
  getSeats: (showtimeId: string) => request<ShowtimeSeatsResponse>("GET", `showtimes/${showtimeId}/seats`),
  getSeatsReservations: (showtimeId: string) =>
    request<ShowtimeSeatsReservationResponse[]>("GET", `showtimes/${showtimeId}/reservations`),
  createSeatsReservations: (showtimeId: string, body: ShowTimeSeatsReservationBodyRequest) =>
    request<ShowTimeSeatsReservationBodyResponse>("POST", `showtimes/${showtimeId}/reservations`, body),
  createPayment: (showtimeId: string, body: ReservationPaymentBodyRequest) =>
    request<ReservationPaymentBodyResponse>("POST", `showtimes/${showtimeId}/payment`, body),
}
