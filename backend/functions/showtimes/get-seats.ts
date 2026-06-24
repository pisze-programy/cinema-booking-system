import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda'
import {dbService} from "@/database/client"

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const showtimeId = event.pathParameters?.id
        if (!showtimeId) {
            return {
                statusCode: 400,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: 'Missing required showtimeId'}),
            }
        }

        const pool = await dbService.getPool()

        const {rows} = await pool.query(
            `SELECT st.id    AS "showtimeId",
                    r.name   AS "roomName",
                    r.layout as "rows"
             FROM showtimes st
                      JOIN movies m ON st.movie_id = m.id
                      JOIN rooms r ON st.room_id = r.id
             WHERE st.id = $1`,
            [showtimeId]
        )

        if (rows.length === 0) {
            return {statusCode: 404, body: JSON.stringify({error: "Layout for showtime not found"})}
        }

        return {
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rows[0]),
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal Server Error'}),
        }
    }
}
