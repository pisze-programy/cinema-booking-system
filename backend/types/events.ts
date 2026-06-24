export const EventSource = {
    RESERVATIONS: "cinema.reservations",
    PAYMENTS: "cinema.payments",
} as const;

export const PaymentDetailType = {
    SUCCEEDED: "PaymentSucceeded",
    FAILED: "PaymentFailed",
} as const;
