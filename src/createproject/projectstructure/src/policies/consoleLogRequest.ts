import { ExecutionContext, Policy, PolicyCategory, Scope, YapPolicy } from "@youngapp/yap";

/**
 * console-log policy
 * This is example policy to log all incomig requests to console
 */
@YapPolicy({
    id: 'console-log-request',
    name: 'Logs request body',
    category: PolicyCategory.advanced,
    description: "This is an example policy to log incoming request",
    scopes: [Scope.inbound],
  })
export default class SetBody extends Policy {

    /**
     * Applies set body policy
     * @param executionContext execution context
     */
    public async apply(executionContext: ExecutionContext) {
        const { context } = executionContext;
        // tslint:disable-next-line: no-console
        console.log("Got request: ", context.request.body);
        return executionContext;
    }

    /**
     * Validates set body policy
     * @param policyElement policy element
     */
    public validate(policyElement: any) {
        return [];
    }
}