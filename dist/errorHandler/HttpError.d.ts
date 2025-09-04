export declare class HttpError extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string);
}
