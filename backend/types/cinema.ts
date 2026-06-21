import {ReservationStatus} from "@/types/reservation";

export interface Movie {
    id: string
    title: string
    posterUrl: string
}

export interface Seat {
    id: string
    number: number
    status: ReservationStatus
}

export interface Row {
    id: string
    name: string
    seats: Seat[]
}

export interface ShowtimeSeats {
    showtimeId: string
    movieTitle: string
    roomName: string
    rows: Row[]
}
