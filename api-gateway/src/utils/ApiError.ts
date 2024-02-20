class ApiError extends Error {
    statusCode: number;
    message: string;
    success: boolean;
    errors: any
    constructor(statusCode: number, message: string, errors = [], stack = ""){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.errors = errors

        if(stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }