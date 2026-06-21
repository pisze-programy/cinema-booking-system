import { useEffect, useState } from "react"
import { SeatStatus } from "@/types/cinema"
import { cinemaApi } from "@/utils/api"

export const useSeatsForMovie = () => {
  const [seats, setSeats] = useState<SeatStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(null)

  const onSelectShowtime = (id: string | null) => {
    setSelectedShowtimeId(id)
  }

  const onMovieSelect = async (showtimeId: string) => {
    setLoading(true)

    try {
      const seats = await cinemaApi.getSeats(showtimeId)
      setSeats(seats)
    } catch (e) {
      console.log("Error getSeats Response:", e)
      setSeats([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!selectedShowtimeId) return
    onMovieSelect(selectedShowtimeId)
  }, [selectedShowtimeId])

  return {
    seats,
    loading,
    onSelectShowtime,
    selectedShowtimeId,
  }
}
