declare namespace Express {
    export interface Response {
        sendSuccessful(data: any, message?: string, statusCode?: number | null): void
    }
}
