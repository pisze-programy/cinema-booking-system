import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda';
import {dbService} from "@/database/client";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const showtimeId = event.queryStringParameters?.showtimeId;
        if (!showtimeId) {
            return {
                statusCode: 400,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: 'Missing required showtimeId'}),
            };
        }

        const pool = await dbService.getPool();

        const {rows} = await pool.query<any>(
            `SELECT st.id  AS "showtimeId",
                    r.name AS "roomName",
                    r.layout
             FROM showtimes st
                      JOIN movies m ON st.movie_id = m.id
                      JOIN rooms r ON st.room_id = r.id
             WHERE st.id = $1`,
            [showtimeId]
        );

        return {
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rows),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal Server Error'}),
        };
    }
};
