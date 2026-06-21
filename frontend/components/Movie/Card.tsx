import type { Movie } from "@/types/cinema"
import { CSSProperties } from "react"
import { Showtimes } from "@/components/Movie/Showtimes.tsx"

interface MovieCardProps {
  movie: Movie
  onSelectShowtime: (id: string) => void
}

export const Card = ({ movie, onSelectShowtime }: MovieCardProps) => {
  return (
    <div>
      <img style={styles.poster} width={200} height={300} alt={`Poster: ${movie.title}`} src={movie.posterUrl} />
      <div style={styles.info}>
        <h3 style={styles.title}>{movie.title}</h3>
        <Showtimes showtimes={movie.showtimes} onSelectShowtime={onSelectShowtime} />
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    background: "#1e1e1e",
    borderRadius: "8px",
    padding: "16px",
    color: "#fff",
    border: "2px solid #fff",
  },
  poster: {
    borderRadius: "4px",
    objectFit: "cover",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    marginTop: "12px",
  },
  title: {
    fontSize: "18px",
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}
