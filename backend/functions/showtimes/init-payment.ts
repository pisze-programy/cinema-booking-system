import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {PaymentRequest} from "@/types/reservation";
import {dbService} from "@/database/client";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const pool = await dbService.getPool();
    const client = await pool.connect();

    try {

        const showtimeId = event.pathParameters?.id;

        if (!showtimeId) {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "Missing showtimeId"}),
            };
        }

        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Missing request body"}),
            };
        }

        const {reservationId}: PaymentRequest = JSON.parse(event.body);

        if (!reservationId) {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "Missing reservationId"}),
            };
        }

        const {rows} = await client.query(
            `
                SELECT row_id, seat_num
                FROM reservations
                WHERE id = $1
                  AND showtime_id = $2
                  AND status = 'CREATED'
                  AND expires_at > NOW();
            `,
            [reservationId, showtimeId]
        );

        if (rows.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Seat not reserved"}),
            };
        }

        const paymentUrl = `showtimes/${reservationId}/payment/confirm?reservationId=${reservationId}&status=SUCCESS`;

        return {
            statusCode: 200,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                reservationId,
                paymentUrl,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: (error as Error).message}),
        };
    }
};
