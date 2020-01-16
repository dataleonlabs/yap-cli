import { APIGatewayProxyEvent, Context as AWSContext } from "aws-lambda";
import Api from "./api";

const api = new Api();

export const handler = (event: APIGatewayProxyEvent,
    context: AWSContext) => api.handler(event, context);