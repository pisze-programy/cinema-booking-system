import { SeatStatus } from "@/types/cinema"

interface Props {
  seats: SeatStatus[]
}

export const Grid = ({}: Props) => {
  // const seatMap = new Map(seats.map((s) => [s.seat_id, s]))
  // const rows = new Array(movie.rows)

  const onSeatClick = (seatId: string) => {
    console.log("Seat", seatId)
  }

  return (
    <div className="seat-grid">
      {/*{rows.map((_, rowIndex) => {*/}
      {/*  const rowLetter = _rows[rowIndex]*/}

      {/*  return (*/}
      {/*    <div key={rowLetter} className="seat-row">*/}
      {/*      {seats.map((_, seatNumber) => {*/}
      {/*        const seatId = `${rowLetter}${seatNumber + 1}`*/}

      {/*        const seat = seatMap.get(seatId) ?? {*/}
      {/*          seat_id: seatId,*/}
      {/*          booked: false,*/}
      {/*          confirmed: false,*/}
      {/*        }*/}

      {/*        return <Seat key={seatId} seat={seat} onClick={() => onSeatClick(seatId)} />*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*})}*/}
    </div>
  )
}
