import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {EventBridgeClient, PutEventsCommand, PutEventsRequestEntry} from "@aws-sdk/client-eventbridge"
import {EventSource, PaymentDetailType} from "@/types/events"

const eventBridge = new EventBridgeClient({})

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const queryParams = event.queryStringParameters || {}
    const {reservationId, status} = queryParams

    if (!reservationId || !status) {
        return {statusCode: 400, body: JSON.stringify({error: "Missing paramaters"})}
    }

    const isSuccess = status === "SUCCESS"

    const detailType = isSuccess ? PaymentDetailType.SUCCEEDED : PaymentDetailType.FAILED

    const detailPayload = {
        reservationId,
        status
    }

    try {
        const entry: PutEventsRequestEntry = {
            Source: EventSource.PAYMENTS,
            DetailType: detailType,
            EventBusName: "reservation",
            Detail: JSON.stringify(detailPayload),
        }

        await eventBridge.send(new PutEventsCommand({Entries: [entry]}))
    } catch (error) {
        console.error("EventBridge export failed:", error)
        return {statusCode: 500, body: JSON.stringify({error: "Internal Server Error"})}
    }

    if (!isSuccess) {
        return {statusCode: 400, body: JSON.stringify({error: "Payment failed"})}
    }

    return {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({reservationId}),
    }
}
