import { useEffect, useRef, useState } from "react"
import { cinemaApi } from "@/utils/api.ts"
import { ShowTimeSeatsReservationBodyRequest, ShowtimeSeatsReservationResponse } from "@/types/apiResponse.ts"

const POOLING_TIME_INTERVAL = 50 * 1000

export const useReservations = (selectedShowtimeId: string | null) => {
  const [reservations, setReservations] = useState<ShowtimeSeatsReservationResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

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
      const { reservationId } = await cinemaApi.createSeatsReservations(selectedShowtimeId, newReservation)
      const { paymentUrl } = await cinemaApi.createPayment(selectedShowtimeId, { reservationId })

      setReservations((prev) => [...prev, newReservation])
      setPaymentUrl(`http://localhost:3000/${paymentUrl}`)
    } catch (e) {
      console.error("Reservation failed", e)
      setReservations((prev) => [...prev.filter((i) => i !== newReservation)])
      setPaymentUrl(null)
    }
  }

  return {
    loading,
    reservations,
    onReserveSeat,
    paymentUrl,
  }
}
