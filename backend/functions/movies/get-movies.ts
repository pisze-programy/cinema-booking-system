import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda'
import {dbService} from "@/database/client"
import {Movie} from "@/types/cinema"

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const date = event.queryStringParameters?.date
        if (!date) {
            return {
                statusCode: 400,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: 'Missing required date'}),
            }
        }

        const pool = await dbService.getPool()

        const {rows} = await pool.query<Movie>(
            `SELECT m.id,
                    m.title,
                    m.poster_url AS "posterUrl",
                    st.id        AS "showtimeId",
                    st.room_id   AS "roomId",
                    st.start_at  AS "startAt"
             FROM movies m
                      JOIN showtimes st ON m.id = st.movie_id
             WHERE st.start_at::date = $1:: date
             ORDER BY st.start_at`,
            [date]
        )

        if (rows.length === 0) {
            return {statusCode: 404, body: JSON.stringify({error: "Movies not found"})}
        }

        return {
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rows),
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal Server Error'}),
        }
    }
}
