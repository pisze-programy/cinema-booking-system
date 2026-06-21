import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda';
import {dbService} from "@/database/client";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const showtimeId = event.pathParameters?.id;
        if (!showtimeId) {
            return {
                statusCode: 400,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: 'Missing required showtimeId'}),
            };
        }

        const pool = await dbService.getPool();

        const {rows} = await pool.query(
            `SELECT row_id, seat_num
             FROM reservations
             WHERE showtime_id = $1
               AND (status = 'CONFIRMED' OR (status = 'PENDING' AND expires_at > NOW()));`,
            [showtimeId]
        );

        return {
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rows[0]),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal Server Error'}),
        };
    }
};
