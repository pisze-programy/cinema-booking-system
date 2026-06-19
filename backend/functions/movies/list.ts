import {APIGatewayProxyResultV2} from 'aws-lambda';
import {Movie} from "@/types/cinema";
import {dbService} from "@/database/client";

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
    try {
        const pool = await dbService.getPool();

        const {rows} = await pool.query<Movie>(
            "SELECT id, title, rows, seats_per_row FROM movies"
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
