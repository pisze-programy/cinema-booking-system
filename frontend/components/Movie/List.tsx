import type { Movie } from "@/types/cinema"
import { Card } from "./Card"
import { CSSProperties } from "react"

interface MovieListProps {
  movies: Movie[]
  onSelectShowtime: (id: string) => void
}

export const MovieList = ({ movies, onSelectShowtime }: MovieListProps) => {
  return (
    <div style={styles.movies}>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} onSelectShowtime={onSelectShowtime} />
      ))}
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  movies: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}
