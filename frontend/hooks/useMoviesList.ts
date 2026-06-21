import { useEffect, useState } from "react"
import { cinemaApi } from "@/utils/api"
import { MovieListResponse } from "@/types/apiResponse.ts"
import { Movie } from "@/types/cinema.ts"

export const useMoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  const groupMoviesByShowtimes = (data: MovieListResponse[]): Movie[] => {
    const map = new Map<string, Movie>()

    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      let movie = map.get(item.id)
      if (!movie) {
        movie = {
          id: item.id,
          title: item.title,
          posterUrl: item.posterUrl,
          showtimes: [],
        }
        map.set(item.id, movie)
      }

      const time = item.startAt.substring(11, 16)

      movie.showtimes.push({
        showtimeId: item.showtimeId,
        roomId: item.roomId,
        roomName: item.roomName,
        startAt: item.startAt,
        time: time,
      })
    }

    return Array.from(map.values())
  }

  useEffect(() => {
    async function getMovies() {
      setLoading(true)
      try {
        const movies = await cinemaApi.getMovies("2026-06-20")
        setMovies(groupMoviesByShowtimes(movies))
      } catch (e) {
        console.log("Error getMovies", e)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    getMovies()
  }, [])

  return {
    movies,
    loading,
  }
}
