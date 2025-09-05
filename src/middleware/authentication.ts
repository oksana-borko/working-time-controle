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
        console.log("SUPER ADMIN authenticated");
    } else {
        try {
            const employee = await service.getEmployeeById(id);
            if (bcrypt.compareSync(password, employee.passHash)) {
                req.userId = employee._id;
                req.userName = `${employee.firstName} ${employee.lastName}`;
                req.roles = employee.roles;
                console.log(`Employee ${req.userName} authenticated via Basic Auth`);
            } else {
                console.log("Basic Auth failed: Wrong password");
            }
        } catch (e) {
            console.log("Basic Auth failed: Employee not found");
        }
    }
}

function jwtAuth(authHeader: string, req: AuthRequest) {
    const token = authHeader.substring(BEARER.length);
    try {
        const payload = jwt.verify(token, configuration.jwt.secret) as JwtPayload;
        req.userId = payload.sub!;
        req.roles = JSON.parse(payload.roles) as Role[];
        req.userName = "JWT User";
        console.log(`User ${req.userId} authenticated via JWT`);
    } catch (e) {
        console.log("JWT authentication failed: Invalid or expired token");
    }
}

export const authenticate = (service: AccountingService) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.header('Authorization');

        if (authHeader && authHeader.startsWith(BASIC)) {
            await getBasicAuth(authHeader, service, req);
        } else if (authHeader && authHeader.startsWith(BEARER)) {
            jwtAuth(authHeader, req);
        }


        next();
    };
};

// ИСПРАВЛЕНИЕ: Правильная логика для пропуска роутов
export const skipRoutes = (skipRoutes: string[]) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {
        const route = req.method + req.path;

        console.log(`=== ROUTE CHECK ===`);
        console.log(`Route: ${route}`);
        console.log(`Skip routes: ${skipRoutes.join(', ')}`);
        console.log(`User authenticated: ${!!req.userId}`);

        // ЛОГИКА: Если роут в списке пропуска - разрешаем без аутентификации
        if (skipRoutes.includes(route)) {
            console.log(`✅ Route ${route} is in skipRoutes - allowing without authentication`);
            next();
            return;
        }

        // ЛОГИКА: Если роут НЕ в списке пропуска - требуем аутентификацию
        if (!req.userId) {
            console.log(`❌ Route ${route} requires authentication but user not authenticated`);
            throw new HttpError(401, "Authentication required");
        }

        console.log(`✅ Route ${route} - user authenticated, proceeding`);
        next();
    };