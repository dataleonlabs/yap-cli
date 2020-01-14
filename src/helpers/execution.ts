import { set } from 'lodash';
import vm from 'vm';

/**
 * Replaces all execution placeholder in string with execution result
 * @param field string, contains @(...) execution placehoders
 * @param executionContext execution context
 */
export const executeInString = (field: string, executionContext?: any) => {
    if (field && executionContext && typeof field === "string" && field.indexOf('@(') > -1) {
        const entries =
            field.split('@(')
                .map((entry) => entry.substring(0, entry.lastIndexOf(')')));
        for (const entry of entries) {
            if (entry) {
                const vmExecutionContext = vm.createContext(executionContext);
                const script = new vm.Script(entry);
                const newValue = script.runInContext(vmExecutionContext);
                field = field.replace(`@(${entry})`, newValue);
            }
        }
    }
    return field;
};

/**
 * Tries to execute all string props for object
 * @example for object { a:"@(val1)", b:"@(val2)"} a and b would be executed with executeInString in a given context
 * @param object Object with a string parameters to execute
 * @param context Execution context
 */
export const propertiesExecutor = (object: any, context: any): void => {
    for (const [key, value] of Object.entries(object)) {
        if (value && typeof value === 'string') {
            set(object, `${key}`, executeInString(value as string, context));
        }
    }
    return object;
};