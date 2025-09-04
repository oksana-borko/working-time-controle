import { Request, Response, NextFunction } from "express";
import { HttpError } from "./HttpError.js";
import * as fs from "fs";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${err.message}\nStack: ${err.stack}\n\n`;

    // Log to console
    console.error(logMessage);

    // Log to file
    fs.appendFileSync('error.log', logMessage);

    if (err instanceof HttpError) {
        res.status(err.status).send(err.message);
    } else {
        res.status(500).send('Unknown server error! ' + err.message);
    }
};