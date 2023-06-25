export declare class BackendError extends Error {
    source?: string;
    fatal: boolean;
    suberror?: any;
    /**
     * @param message Error message to display.
     * @param source A user-friendly name for the source.
     * @param fatal Whether this error should mark the system as fatal.
     * @param suberror The original error, if present, to be printed in the logs.
     */
    constructor(message: string, source?: string, fatal?: boolean, suberror?: any);
    nonFatal(): this;
}
