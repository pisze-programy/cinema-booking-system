export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'EXPIRED'

export interface Reservation {
    id: string
    showtimeId: string
    rowId: number
    seatNum: number
    userId: string
    status: ReservationStatus
    expiresAt: string
    createdAt: string
}
