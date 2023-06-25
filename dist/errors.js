"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendError = void 0;
class BackendError extends Error {
    /**
     * @param message Error message to display.
     * @param source A user-friendly name for the source.
     * @param fatal Whether this error should mark the system as fatal.
     * @param suberror The original error, if present, to be printed in the logs.
     */
    constructor(message, source, fatal = false, suberror) {
        super(message);
        this.source = source;
        this.fatal = fatal;
        this.suberror = suberror;
    }
    nonFatal() {
        this.fatal = false;
        return this;
    }
}
exports.BackendError = BackendError;
