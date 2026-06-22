import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from "aws-lambda";
import {randomUUID} from "crypto";
import {dbService} from "@/database/client";
import {ReservationRequest} from "@/types/reservation";

export const handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
    const pool = await dbService.getPool();
    const client = await pool.connect();

    try {
        const showtimeId = event.pathParameters?.id;

        if (!showtimeId) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Missing showtimeId"}),
            };
        }

        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Missing request body"}),
            };
        }

        const body: ReservationRequest = JSON.parse(event.body);

        if (!showtimeId || !body.rowId || !body.seatNum) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Missing required fields"}),
            };
        }

        const rowId = body.rowId;
        const seatNum = body.seatNum;

        await client.query("BEGIN");

        const {rows} = await client.query(
            `
                SELECT id
                FROM reservations
                WHERE showtime_id = $1
                  AND row_id = $2
                  AND seat_num = $3
                  AND (
                    status = 'CONFIRMED'
                        OR (status = 'CREATED' AND expires_at > NOW())
                    )
                    FOR UPDATE
            `,
            [showtimeId, rowId, seatNum]
        );

        if (rows.length > 0) {
            await client.query("ROLLBACK");
            return {
                statusCode: 409,
                body: JSON.stringify({message: "Seat already reserved"}),
            };
        }

        const reservationId = randomUUID();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

        await client.query(
            `
                INSERT INTO reservations (id, showtime_id, row_id, seat_num, status, expires_at, created_at)
                VALUES ($1, $2, $3, $4, 'CREATED', $5, NOW())
            `,
            [reservationId, showtimeId, rowId, seatNum, expiresAt]
        );

        await client.query("COMMIT");

        return {
            statusCode: 201,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                reservationId,
                expiresAt: expiresAt.toISOString(),
            }),
        };
    } catch (error) {
        await client.query("ROLLBACK");
        return {
            statusCode: 500,
            body: JSON.stringify({message: "Internal Server Error"}),
        };
    } finally {
        client.release();
    }
};
