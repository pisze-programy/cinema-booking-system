import {SQSBatchResponse, SQSEvent} from "aws-lambda";
import {PaymentDetailType} from "@/types/events";

export const handler = async (event: SQSEvent): Promise<SQSBatchResponse> => {
    const batchItemFailures: { itemIdentifier: string }[] = [];

    for (const record of event.Records) {
        try {
            const eventBridgeEnvelope = JSON.parse(record.body);

            const source = eventBridgeEnvelope["source"];
            const detailType = eventBridgeEnvelope["detail-type"];
            const detail = eventBridgeEnvelope["detail"];

            console.log(`Processing event from ${source} [${detailType}] for reservation: ${detail.reservationId}`);

            switch (detailType) {

                case PaymentDetailType.SUCCEEDED:
                    console.log(`Confirming reservation ${detail.reservationId} in DB.`);
                    break;
                case "ReservationExpired":
                    console.log(`Expiring reservation ${detail.reservationId} in DB.`);
                    break;
                case PaymentDetailType.FAILED:
                    console.log(`Cancelling reservation ${detail.reservationId} in DB.`);
                    break;
                default:
                    console.warn(`Unknown detail-type: ${detailType}. Skipping.`);
            }

        } catch (error) {
            console.error(`Failed to process message ID: ${record.messageId}`, error);
            batchItemFailures.push({itemIdentifier: record.messageId});
        }
    }

    return {batchItemFailures};
};
