import type { CSSProperties } from "react"
import { RoomRow } from "@/types/apiResponse.ts"

interface RoomLayoutProps {
  roomName: string
  rows: RoomRow[]
  onSelectSeat: (rowId: string, seatNumber: number) => void
}

export const RoomLayout = ({ roomName, rows, onSelectSeat }: RoomLayoutProps) => {
  const roomMaxSeatNum = Math.max(...rows.flatMap((row) => row.seats.map((s) => s)), 0)

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.roomName}>{roomName}</h2>
      </div>

      <div style={styles.screenContainer}>
        <div style={styles.screenShadow} />
        <div style={styles.screen} />
      </div>

      <div style={styles.grid}>
        {rows.map((row) => {
          const allPossibleSeats = Array.from({ length: roomMaxSeatNum }, (_, i) => i + 1)

          return (
            <div key={row.id} style={styles.row}>
              <div style={styles.rowLabel}>{row.name}</div>

              <div style={styles.seatsContainer}>
                {allPossibleSeats.map((seat) => {
                  const actualSeat = row.seats.find((s) => s === seat)
                  // const isReserved = seat.status === "reserved"
                  // const isDisabled = seat.status === "disabled"

                  let seatStyle = { ...styles.seat }
                  // if (isReserved) seatStyle = { ...seatStyle, ...styles.seatReserved }
                  // if (isDisabled) seatStyle = { ...seatStyle, ...styles.seatDisabled }

                  if (!actualSeat) {
                    return (
                      <button
                        key={`${row.id}-${seat}`}
                        style={{ ...seatStyle, ...styles.seatDisabled }}
                        disabled={true}
                      >
                        {actualSeat}
                      </button>
                    )
                  }

                  return (
                    <button
                      key={`${row.id}-${actualSeat}`}
                      style={seatStyle}
                      onClick={() => onSelectSeat(row.id, seat)}
                    >
                      {actualSeat}
                    </button>
                  )
                })}
              </div>

              <div style={styles.rowLabelRight}>{row.name}</div>
            </div>
          )
        })}
      </div>

      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.seat }} />
          <span>Available</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.seat, ...styles.seatSelected }} />
          <span>Selected</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.seat, ...styles.seatReserved }} />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#0f0f0f",
    padding: "40px",
    borderRadius: "12px",
    color: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  roomName: {
    fontSize: "24px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    margin: "0 0 4px 0",
  },
  screenContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "60px",
  },
  screen: {
    width: "100%",
    height: "8px",
    background: "#fff",
    borderRadius: "50%",
    boxShadow: "0px 0px 20px 4px rgba(255, 255, 255, 0.7)",
  },
  screenShadow: {
    position: "absolute",
    top: "8px",
    width: "90%",
    height: "40px",
    background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)",
    pointerEvents: "none",
  },
  screenLabel: {
    marginTop: "16px",
    fontSize: "11px",
    color: "#555",
    letterSpacing: "4px",
    fontWeight: 600,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "40px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  rowLabel: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
    width: "16px",
    textAlign: "left",
  },
  rowLabelRight: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
    width: "16px",
    textAlign: "right",
  },
  seatsContainer: {
    display: "flex",
    gap: "8px",
  },
  seat: {
    width: "32px",
    height: "32px",
    backgroundColor: "transparent",
    border: "2px solid #555",
    borderRadius: "6px 6px 12px 12px",
    color: "#aaa",
    fontSize: "11px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s ease",
    outline: "none",
  },
  seatSelected: {
    backgroundColor: "rgba(0,157,255,0.8)",
    borderColor: "rgb(94,192,255)",
    color: "#fff",
  },
  seatReserved: {
    backgroundColor: "#2a2a2a",
    borderColor: "#2a2a2a",
    color: "#555",
  },
  seatDisabled: {
    visibility: "hidden",
  },
  legend: {
    display: "flex",
    gap: "24px",
    borderTop: "1px solid #222",
    paddingTop: "24px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: "#aaa",
  },
}
