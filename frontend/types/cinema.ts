export interface MovieShowtime {
  showtimeId: string
  roomId: string
  roomName: string
  startAt: string
  time: string
}

export interface Movie {
  id: string
  title: string
  posterUrl: string
  showtimes: MovieShowtime[]
}

export interface RoomLayoutRow {
  id: string
  name: string
  seats: number[]
}

export interface SeatStatus {
  showtimeId: string
  roomName: string
  layout: RoomLayoutRow[]
}
