export type ReservationEventType = 'CREATED' | 'CONFIRMED' | 'EXPIRED'

export interface Reservation {
    id: string
    showtimeId: string
    rowId: number
    seatNum: number
    userId: string
    eventType: ReservationEventType
    expiresAt?: string
    createdAt: string
}

export interface ReservationRequest {
    showtimeId: string;
    rowId: number;
    seatNum: number;
}
