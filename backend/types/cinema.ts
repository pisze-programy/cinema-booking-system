export interface Movie {
    id: string
    title: string
    posterUrl: string
}

export interface Row {
    id: string
    name: string
    seats: number[]
}

export interface ShowtimeSeats {
    showtimeId: string
    movieTitle: string
    roomName: string
    rows: Row[]
}
