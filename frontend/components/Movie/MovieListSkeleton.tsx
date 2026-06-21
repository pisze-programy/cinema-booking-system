import type { CSSProperties } from "react"

interface Props {
  cardsNum: number
}

export const MovieListSkeleton = ({ cardsNum }: Props) => {
  const skeletonCards = Array.from({ length: cardsNum }, (_, i) => i)

  return (
    <div style={styles.movies}>
      {skeletonCards.map((index) => (
        <div key={index} style={styles.card}>
          <div style={styles.posterSkeleton} />

          <div style={styles.info}>
            <div style={styles.titleSkeleton} />

            <div style={styles.showtimesSkeletonContainer}>
              <div style={styles.showtimeButtonSkeleton} />
              <div style={styles.showtimeButtonSkeleton} />
              <div style={styles.showtimeButtonSkeleton} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  movies: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "16px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    padding: "16px",
    width: "232px",
  },
  posterSkeleton: {
    width: "200px",
    height: "300px",
    backgroundColor: "#2a2a2a",
    borderRadius: "4px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    marginTop: "12px",
    gap: "12px",
  },
  titleSkeleton: {
    width: "70%",
    height: "18px",
    backgroundColor: "#2a2a2a",
    borderRadius: "4px",
  },
  showtimesSkeletonContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "4px",
  },
  showtimeButtonSkeleton: {
    width: "55px",
    height: "32px",
    backgroundColor: "#2a2a2a",
    borderRadius: "4px",
  },
}
