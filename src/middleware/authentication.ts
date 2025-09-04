import { AccountingService } from "../services/accountingService.js";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { HttpError } from "../errorHandler/HttpError.js";
import { AuthRequest, Role } from "../utils/types.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configuration } from "../config/appConfig.js";

const BASIC = "Basic ";
const BEARER = "Bearer ";

async function getBasicAuth(authHeader: string, service: AccountingService, req: AuthRequest) {
    const auth = Buffer.from(authHeader.substring(BASIC.length), "base64").toString("ascii");
    const [id, password] = auth.split(":");

    if (id === process.env.OWNER && password === process.env.OWNER_PASS) {
        req.userId = "10000000";
        req.roles = [Role.SUP];
    } else {
        try {
            const employee = await service.getEmployeeById(id);
            if (bcrypt.compareSync(password, employee.passHash)) {
                req.userId = employee._id;
                req.userName = `${employee.firstName} ${employee.lastName}`;
                req.roles = employee.roles;
            }
        } catch (e) {
            console.log("Authentication failed");
        }
    }
}

function jwtAuth(authHeader: string, req: AuthRequest) {
    const token = authHeader.substring(BEARER.length);
    try {
        const payload = jwt.verify(token, configuration.jwt.secret) as JwtPayload;
        req.userId = payload.sub!;
        req.roles = JSON.parse(payload.roles) as Role[];
        req.userName = "Anonymous";
    } catch (e) {
        console.log("JWT authentication failed");
    }
}

export const authenticate = (service: AccountingService) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith(BASIC))
            await getBasicAuth(authHeader, service, req);
        else if (authHeader && authHeader.startsWith(BEARER))
            jwtAuth(authHeader, req);
        next();
    };
};

export const skipRoutes = (skipRoutes: string[]) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {
        const route = req.method + req.path;
        if (!skipRoutes.includes(route) && !req.userId)
            throw new HttpError(401, "Authentication required");
        next();
    };