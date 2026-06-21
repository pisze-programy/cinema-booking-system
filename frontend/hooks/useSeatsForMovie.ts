import { useEffect, useState } from "react"
import { cinemaApi } from "@/utils/api"
import { ShowtimeSeatsResponse } from "@/types/apiResponse.ts"

export const useSeatsForMovie = () => {
  const [seats, setSeats] = useState<ShowtimeSeatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(null)

  const onSelectSeat = () => {
    //
  }

  const onSelectShowtime = (id: string | null) => {
    setSelectedShowtimeId(id)
  }

  const onShowtimeSelected = async (showtimeId: string) => {
    setLoading(true)

    try {
      const seats = await cinemaApi.getSeats(showtimeId)
      setSeats(seats)
    } catch (e) {
      console.log("Error getSeats Response:", e)
      setSeats(null)
    } finally {
      setLoading(false)
    }

    // const reservations = await cinemaApi.getSeatsReservations(showtimeId)
  }

  useEffect(() => {
    if (!selectedShowtimeId) return
    onShowtimeSelected(selectedShowtimeId)
  }, [selectedShowtimeId])

  return {
    seats,
    loading,
    onSelectShowtime,
    selectedShowtimeId,
    onSelectSeat,
  }
}
