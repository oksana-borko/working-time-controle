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
    }
    else {
        try {
            const employee = await service.getEmployeeById(id);
            if (bcrypt.compareSync(password, employee.passHash)) {
                req.userId = employee._id;
                req.userName = `${employee.firstName} ${employee.lastName}`;
                req.roles = employee.roles;
            }
        }
        catch (e) {
            console.log("Authentication failed");
        }
    }
}
function jwtAuth(authHeader, req) {
    const token = authHeader.substring(BEARER.length);
    try {
        const payload = jwt.verify(token, configuration.jwt.secret);
        req.userId = payload.sub;
        req.roles = JSON.parse(payload.roles);
        req.userName = "Anonymous";
    }
    catch (e) {
        console.log("JWT authentication failed");
    }
}
export const authenticate = (service) => {
    return async (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith(BASIC))
            await getBasicAuth(authHeader, service, req);
        else if (authHeader && authHeader.startsWith(BEARER))
            jwtAuth(authHeader, req);
        next();
    };
};
export const skipRoutes = (skipRoutes) => (req, res, next) => {
    const route = req.method + req.path;
    if (!skipRoutes.includes(route) && !req.userId)
        throw new HttpError(401, "Authentication required");
    next();
};
//# sourceMappingURL=authentication.js.map