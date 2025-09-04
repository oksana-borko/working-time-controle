import { ObjectSchema } from 'joi';
import { Response, Request, NextFunction } from "express";
export declare const bodyValidation: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => void;
