import { SeatStatus } from '@/types/cinema';

interface Props {
  seat: SeatStatus;
  onClick: () => void;
}

export const Seat = ({ seat, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={seat.confirmed}
      className={`
    seat
    ${seat.confirmed ? 'seat--confirmed' : ''}
    ${seat.booked ? 'seat--held-other' : ''}
  `}
    >
      {seat.seat_id.slice(1)}
    </button>
  );
};
