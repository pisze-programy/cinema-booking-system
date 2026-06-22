import { useEffect, useRef, useState } from "react"
import { cinemaApi } from "@/utils/api.ts"
import { ShowTimeSeatsReservationBodyRequest, ShowtimeSeatsReservationResponse } from "@/types/apiResponse.ts"

const POOLING_TIME_INTERVAL = 10 * 1000

export const useReservations = (selectedShowtimeId: string | null) => {
  const [reservations, setReservations] = useState<ShowtimeSeatsReservationResponse[]>([])
  const [loading, setLoading] = useState(true)

  const activeShowtimeIdRef = useRef(selectedShowtimeId)

  useEffect(() => {
    activeShowtimeIdRef.current = selectedShowtimeId
    let isMounted = true
    let timeoutId: number | null = null

    if (!selectedShowtimeId) {
      setReservations([])
      setLoading(false)
      return
    }

    async function poll() {
      if (!selectedShowtimeId) return

      try {
        const data = await cinemaApi.getSeatsReservations(selectedShowtimeId)

        if (isMounted && activeShowtimeIdRef.current === selectedShowtimeId) {
          setReservations(data)
        }
      } catch (e) {
        console.error("Error getReservations", e)
      } finally {
        if (isMounted) {
          setLoading(false)
          timeoutId = setTimeout(poll, POOLING_TIME_INTERVAL)
        }
      }
    }

    setLoading(true)
    poll()

    return () => {
      isMounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [selectedShowtimeId])

  const onReserveSeat = async (rowId: string, seatNum: number) => {
    if (!selectedShowtimeId) return

    const newReservation: ShowTimeSeatsReservationBodyRequest = {
      rowId: rowId,
      seatNum: seatNum,
    }

    try {
      await cinemaApi.createSeatsReservations(selectedShowtimeId, newReservation)

      setReservations((prev) => [...prev, newReservation])
    } catch (e) {
      console.error("CreateReservation failed", e)
    }
  }

  return {
    loading,
    reservations,
    onReserveSeat,
  }
}
