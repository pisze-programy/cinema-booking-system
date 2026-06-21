export interface Movie {
    id: string
    title: string
    posterUrl: string
}

export interface Room {
    id: string
    name: string
    rows: {
        id: string
        name: string
        seats: number[]
    }[]
}

export interface Showtime {
    id: string
    movieId: string
    roomId: string
    startAt: string
}
