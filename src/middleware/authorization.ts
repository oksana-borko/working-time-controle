import { AuthRequest, Role } from "../utils/types.js";
import { NextFunction, Response } from "express";
import { HttpError } from "../errorHandler/HttpError.js";

export const authorize = (pathRoute: Record<string, Role[]>) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {
        const route = req.method + req.path;
        const roles = req.roles;

        if (!roles || !pathRoute[route] || roles.some(r => pathRoute[route].includes(r))) {
            next();
        } else {
            throw new HttpError(403, "Insufficient permissions");
        }
    };

export const checkAccountById = (checkPathId: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        next();
    };
};

export const checkRequestLimit = (reqList: Map<string, number[]>) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        next();
    };
};