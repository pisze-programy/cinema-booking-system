import React, { useEffect, useRef } from "react"

export const RoomLayoutSkeleton: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = 450
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ".split("")
    const fontSize = 21
    const columns = Math.floor(canvas.width / fontSize)

    const rainDrops: number[] = Array(columns)
      .fill(1)
      .map(() => Math.floor(Math.random() * -50))

    const draw = () => {
      ctx.fillStyle = "rgba(15, 15, 15, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0F0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < rainDrops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]

        const x = i * fontSize
        const y = rainDrops[i] * fontSize

        if (Math.random() > 0.98) {
          ctx.fillStyle = "#fff"
        } else {
          ctx.fillStyle = "#00ff41"
        }

        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }

        rainDrops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlayText}>LOADING...</div>
      <canvas ref={canvasRef} style={styles.canvas} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    margin: "25px auto",
    position: "relative",
    width: "100%",
    height: "450px",
    background: "#0f0f0f",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #1f1f1f",
  },
  canvas: {
    display: "block",
    width: "100%",
    height: "100%",
  },
  overlayText: {
    position: "absolute",
    zIndex: 10,
    color: "#00ff41",
    fontFamily: "monospace",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "4px",
    backgroundColor: "rgba(15, 15, 15, 0.85)",
    padding: "12px 24px",
    borderRadius: "4px",
    border: "1px solid #00ff41",
    boxShadow: "0 0 15px rgba(0, 255, 65, 0.4)",
    pointerEvents: "none",
  },
}
