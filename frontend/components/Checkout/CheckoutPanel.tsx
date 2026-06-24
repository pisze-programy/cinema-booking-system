import type { CSSProperties } from "react"
import { RoomRow } from "@/types/apiResponse.ts"

interface ReservationSummaryProps {
  paymentUrl: string | null
  selectedRowId: string | null
  selectedSeatNum: number | null
  price: number
  fee: number
  rows: RoomRow[]
  onConfirm: (rowId: string, seatNum: number) => void
  onCancel: (rowId: null, seatNum: null) => void
}

export const CheckoutPanel = ({
  selectedRowId,
  selectedSeatNum,
  price,
  fee,
  onConfirm,
  onCancel,
  rows,
  paymentUrl,
}: ReservationSummaryProps) => {
  if (!selectedRowId || !selectedSeatNum) return null

  const total = price + fee

  const handleCancel = () => {
    onCancel(null, null)
  }

  const handleConfirm = () => {
    onConfirm(selectedRowId, selectedSeatNum)
  }

  const getRowName = rows.find((row) => row.id === selectedRowId)?.name

  return (
    <div style={styles.container}>
      <div style={styles.details}>
        <div style={styles.title}>Selected Seat:</div>
        <div style={styles.seatInfo}>
          Row: <span style={styles.highlight}>{getRowName}</span>, Seat:{" "}
          <span style={styles.highlight}>{selectedSeatNum}</span>
        </div>
      </div>

      <div style={styles.pricing}>
        <div style={styles.priceRow}>
          <span>Ticket:</span>
          <span>{price.toFixed(2)} PLN</span>
        </div>
        <div style={styles.priceRow}>
          <span>Transaction Fee:</span>
          <span>{fee.toFixed(2)} PLN</span>
        </div>
        <div style={{ ...styles.priceRow, ...styles.totalRow }}>
          <span>Total:</span>
          <span>{total.toFixed(2)} PLN</span>
        </div>
      </div>

      {paymentUrl ? (
        <a target="_blank" href={paymentUrl}>
          Confirm Payment {total} PLN
        </a>
      ) : (
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button style={styles.confirmBtn} onClick={handleConfirm}>
            Confirm and Pay
          </button>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    width: "100%",
    borderRadius: "12px",
    padding: "24px",
    color: "#fff",
    marginTop: "24px",
  },
  details: {
    marginBottom: "20px",
    borderBottom: "1px solid #222",
    paddingBottom: "16px",
  },
  title: {
    fontSize: "14px",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
  },
  seatInfo: {
    fontSize: "18px",
    fontWeight: 600,
  },
  highlight: {
    color: "#009dff",
  },
  pricing: {
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#aaa",
  },
  totalRow: {
    borderTop: "1px solid #222",
    paddingTop: "12px",
    marginTop: "4px",
    fontSize: "18px",
    fontWeight: 700,
    color: "#fff",
  },
  actions: {
    display: "flex",
    gap: "12px",
  },
  cancelBtn: {
    flex: 1,
    padding: "12px",
    background: "transparent",
    border: "1px solid #444",
    borderRadius: "6px",
    color: "#aaa",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  confirmBtn: {
    flex: 2,
    padding: "12px",
    background: "#009dff",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.15s ease",
  },
}
