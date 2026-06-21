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
