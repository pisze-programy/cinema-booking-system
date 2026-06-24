import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const queryParams = event.queryStringParameters || {};
    const {reservationId, status} = queryParams;

    // TODO: Add eventBridge Integration

    console.log(`Confirm Payment: Received ${reservationId}, status: ${status}`);

    if (!reservationId || status !== "SUCCESS") {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Something went wrong"}),
        };
    }

    return {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            reservationId,
        }),
    };
};
