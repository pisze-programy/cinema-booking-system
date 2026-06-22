import { useMoviesList } from "./hooks/useMoviesList.ts"
import { MovieList } from "@/components/Movie/List.tsx"
import { useSeatsForMovie } from "@/hooks/useSeatsForMovie.ts"
import { useEffect } from "react"
import { RoomLayout } from "@/components/Movie/RoomLayout.tsx"
import { RoomLayoutSkeleton } from "@/components/Movie/RoomLayoutSkeleton.tsx"
import { MovieListSkeleton } from "@/components/Movie/MovieListSkeleton.tsx"
import { useReservations } from "@/hooks/useReservations.ts"
import { CheckoutPanel } from "@/components/Checkout/CheckoutPanel.tsx"

export default function App() {
  const { movies, loading: loadingMoviesData } = useMoviesList()
  const {
    seats,
    loading: loadingSeatsData,
    onSelectShowtime,
    selectedShowtimeId,
    onSelectSeat,
    selectedSeat,
    selectedRow,
  } = useSeatsForMovie()
  const { reservations, loading: loadingSeatsReservations, onReserveSeat } = useReservations(selectedShowtimeId)

  useEffect(() => {
    if (loadingMoviesData) {
      onSelectShowtime(null)
    }
  }, [loadingMoviesData])

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <p>Date: 20.06.2026</p>
      </header>

      <div>
        {loadingMoviesData ? (
          <MovieListSkeleton cardsNum={3} />
        ) : (
          <MovieList movies={movies} onSelectShowtime={onSelectShowtime} />
        )}

        {selectedShowtimeId && (loadingSeatsData || loadingSeatsReservations) && <RoomLayoutSkeleton />}

        {selectedShowtimeId && !loadingSeatsData && !loadingSeatsReservations && seats && (
          <>
            <RoomLayout
              roomName={seats.roomName}
              rows={seats.rows}
              onSelectSeat={onSelectSeat}
              reservations={reservations}
              selectedRow={selectedRow}
              selectedSeat={selectedSeat}
            />

            <CheckoutPanel
              onCancel={onSelectSeat}
              fee={2.99}
              price={39}
              rows={seats.rows}
              selectedSeatNum={selectedSeat}
              selectedRowId={selectedRow}
              onConfirm={onReserveSeat}
            />
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: 960, margin: "0 auto", padding: "2rem" },
  header: { marginBottom: "2rem" },
}
