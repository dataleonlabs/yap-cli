import Yap from "@youngapp/yap";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context as AWSContext } from "aws-lambda";
import { readFileSync } from 'fs';
import { join } from 'path';
import DataConnector from "./connectors/dataConnector";
import ConsoleLogRequest from './policies/consoleLogRequest';

/**
 * Your api class
 */
export default class Api {

    /**
     * Yap instance
     */
    private yap: Yap;

    constructor() {

        //todo: init Yap with your logic

        //type definitions
        const typeDefs = readFileSync(join(__dirname, './definitions.graphql')).toString();

        const dataConnector = new DataConnector();

        //Resolvers
        const resolvers = {
            Query: {
                fields: dataConnector.execute,
            },
        };

        //Custom policies
        const consoleLogRequest = new ConsoleLogRequest();
        const customPolicies = [consoleLogRequest];

        //Policy definitions
        const policies = readFileSync(join(__dirname, './policies.xml')).toString();
        this.yap = new Yap({ typeDefs, resolvers, policies, customPolicies });
    }

    /**
     * Handler for AWS function
     * @param event AWS event
     * @param context AWS context
     */
    public async handler(event: APIGatewayProxyEvent,
        context: AWSContext): Promise<APIGatewayProxyResult> {
        //todo: put your custom logic here
        const result = await this.yap.handler(event, context);
        return result;
    }
}