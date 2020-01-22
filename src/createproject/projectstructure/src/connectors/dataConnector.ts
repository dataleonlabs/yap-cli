import { Connector, ConnectorCategory, Context, YapConnector } from "@youngapp/yap";

const dataToReturn = [
    {
        id: "1",
        data: "first",
    },
    {
        id: "2",
        data: "second",
    },
];

/**
 * Data fetch connector
 * This connector fetches mock data from constant variable and returns to a client
 */
@YapConnector({
    id: "testErrorConnector",
    name: "testErrorConnector",
    category: ConnectorCategory.dataprocessing,
    description: "testDescription",
})
export default class DataConnector extends Connector {
    /**
     * Executest request
     * @param parent request parent
     * @param args request args
     * @param context request context
     * @param info  request info
     */
    public async execute(parent: any, args: any, context: Context, info: any) {
        //Simulating fetch with promise
        return new Promise((res)=>res(dataToReturn));
    }
}