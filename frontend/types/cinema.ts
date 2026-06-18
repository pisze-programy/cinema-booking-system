export interface Movie {
  id: string;
  title: string;
  rows: number;
  seats_per_row: number;
}

export interface SeatStatus {
  seat_id: string;
  booked: boolean;
  confirmed: boolean;
}

export interface HoldSession {
  sessionID: string;
  movieID: string;
  seatID: string;
  expiresAt: string;
}
