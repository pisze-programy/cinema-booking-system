import type { MovieShowtime } from "@/types/cinema"
import type { CSSProperties } from "react"

interface ShowtimesProps {
  showtimes: MovieShowtime[]
  onSelectShowtime: (id: string) => void
}

export const Showtimes = ({ showtimes, onSelectShowtime }: ShowtimesProps) => {
  if (!showtimes.length) return null

  return (
    <div style={styles.container}>
      <p style={styles.label}>Available Showtimes:</p>
      <div style={styles.list}>
        {showtimes.map((showtime) => (
          <button key={showtime.showtimeId} style={styles.button} onClick={() => onSelectShowtime(showtime.showtimeId)}>
            <span style={styles.time}>{showtime.time}</span>
            <span style={styles.room}>{showtime.roomName}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    marginTop: "12px",
  },
  label: {
    fontSize: "11px",
    color: "#aaa",
    margin: "0 0 6px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  list: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    border: "1px solid #444",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    minWidth: "54px",
    transition: "all 0.2s ease",
  },
  time: {
    fontSize: "13px",
    fontWeight: 700,
  },
  room: {
    fontSize: "8px",
    color: "#aaa",
    marginTop: "1px",
    textTransform: "uppercase",
    transition: "color 0.2s ease",
  },
}
