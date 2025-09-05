import bcrypt from "bcryptjs";
import { HttpError } from "../errorHandler/HttpError.js";
import { Role } from "../utils/types.js";
import jwt from "jsonwebtoken";
import { configuration } from "../config/appConfig.js";
const BASIC = "Basic ";
const BEARER = "Bearer ";
async function getBasicAuth(authHeader, service, req) {
    const auth = Buffer.from(authHeader.substring(BASIC.length), "base64").toString("ascii");
    const [id, password] = auth.split(":");
    if (id === process.env.OWNER && password === process.env.OWNER_PASS) {
        req.userId = "10000000";
        req.roles = [Role.SUP];
        console.log("SUPER ADMIN authenticated");
    }
    else {
        try {
            const employee = await service.getEmployeeById(id);
            if (bcrypt.compareSync(password, employee.passHash)) {
                req.userId = employee._id;
                req.userName = `${employee.firstName} ${employee.lastName}`;
                req.roles = employee.roles;
                console.log(`Employee ${req.userName} authenticated via Basic Auth`);
            }
            else {
                console.log("Basic Auth failed: Wrong password");
            }
        }
        catch (e) {
            console.log("Basic Auth failed: Employee not found");
        }
    }
}
function jwtAuth(authHeader, req) {
    const token = authHeader.substring(BEARER.length);
    try {
        const payload = jwt.verify(token, configuration.jwt.secret);
        req.userId = payload.sub;
        req.roles = JSON.parse(payload.roles);
        req.userName = "JWT User";
        console.log(`User ${req.userId} authenticated via JWT`);
    }
    catch (e) {
        console.log("JWT authentication failed: Invalid or expired token");
    }
}
export const authenticate = (service) => {
    return async (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith(BASIC)) {
            await getBasicAuth(authHeader, service, req);
        }
        else if (authHeader && authHeader.startsWith(BEARER)) {
            jwtAuth(authHeader, req);
        }
        next();
    };
};
// ИСПРАВЛЕНИЕ: Правильная логика для пропуска роутов
export const skipRoutes = (skipRoutes) => (req, res, next) => {
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
//# sourceMappingURL=authentication.js.map