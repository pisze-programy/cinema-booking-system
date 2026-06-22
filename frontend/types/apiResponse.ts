export interface MovieListResponse {
  id: string
  title: string
  posterUrl: string
  showtimeId: string
  roomId: string
  roomName: string
  startAt: string
}

export interface RoomRow {
  id: string
  name: string
  seats: number[]
}

export interface ShowtimeSeatsResponse {
  showtimeId: string
  roomName: string
  rows: RoomRow[]
}

export interface ShowtimeSeatsReservationResponse {
  rowId: string
  seatNum: number
}

export interface ShowTimeSeatsReservationBodyRequest {
  rowId: string
  seatNum: number
}

export interface ShowTimeSeatsReservationBodyResponse {
  expiresAt: string
  reservationId: string
}
