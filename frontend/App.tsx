import { useMoviesList } from "./hooks/useMoviesList.ts"
import { MovieList } from "@/components/Movie/List.tsx"
import { useSeatsForMovie } from "@/hooks/useSeatsForMovie.ts"
import { Grid } from "@/components/Seats/Grid.tsx"
import { useEffect } from "react"

export default function App() {
  const { movies, loading: loadingMoviesData } = useMoviesList()
  const { seats, loading: loadingSeatsData, onSelectShowtime, selectedShowtimeId } = useSeatsForMovie()

  useEffect(() => {
    if (loadingMoviesData) {
      onSelectShowtime(null)
    }
  }, [loadingMoviesData])

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Event Booking</h1>
        <p>Date: 20.06.2026</p>
      </header>

      <div className="cinema-page">
        {loadingMoviesData ? (
          <p>Loading movies data...</p>
        ) : (
          <MovieList movies={movies} onSelectShowtime={onSelectShowtime} />
        )}

        {selectedShowtimeId && loadingSeatsData && <p>Loading seats data...</p>}

        {selectedShowtimeId && seats.length && <Grid seats={seats} />}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: 960, margin: "0 auto", padding: "2rem" },
  header: { marginBottom: "2rem" },
}
