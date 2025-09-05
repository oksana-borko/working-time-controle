import { Role } from "../utils/types.js";
import { HttpError } from "../errorHandler/HttpError.js";
import { configuration } from "../config/appConfig.js";
export const authorize = (pathRoute) => (req, res, next) => {
    const route = req.method + req.path;
    const userRoles = req.roles;
    if (!pathRoute[route]) {
        next();
        return;
    }
    if (!userRoles) {
        throw new HttpError(403, "Access denied - no roles assigned");
    }
    const hasRequiredRole = userRoles.some(role => pathRoute[route].includes(role));
    if (hasRequiredRole) {
        console.log(`Authorization: User with roles [${userRoles.join(', ')}] authorized for ${route}`);
        next();
    }
    else {
        console.log(`Authorization failed: User roles [${userRoles.join(', ')}] not sufficient for ${route}`);
        throw new HttpError(403, `Insufficient permissions. Required roles: ${pathRoute[route].join(', ')}`);
    }
};
export const checkAccountById = (checkPathId) => {
    return (req, res, next) => {
        const route = req.method + req.path;
        const userRoles = req.roles;
        const userId = req.userId;
        const targetId = req.params.id;
        if (!checkPathId.includes(route)) {
            next();
            return;
        }
        if (!userRoles || !userId) {
            throw new HttpError(401, "Authentication required");
        }
        if (userRoles.includes(Role.SUP) || userRoles.includes(Role.HR)) {
            console.log(`Account access: ${userRoles.includes(Role.SUP) ? 'Supervisor' : 'HR'} can access any account`);
            next();
            return;
        }
        if (userId === targetId) {
            console.log(`Account access: User ${userId} accessing own account`);
            next();
        }
        else {
            console.log(`Account access denied: User ${userId} trying to access account ${targetId}`);
            throw new HttpError(403, "You can only modify your own account");
        }
    };
};
export const checkRequestLimit = (reqList) => {
    return (req, res, next) => {
        const userRoles = req.roles;
        const userId = req.userId;
        const shouldLimitUser = userRoles?.some(role => configuration.rateLimiting.enabledForRoles.includes(role));
        if (!shouldLimitUser || !userId) {
            next();
            return;
        }
        const currTime = new Date().getTime();
        const userRequests = reqList.get(userId);
        if (!userRequests) {
            reqList.set(userId, [currTime]);
            console.log(`Rate limit: First request for user ${userId}`);
        }
        else {
            const timeWindow = configuration.rateLimiting.windowMs;
            const maxRequests = configuration.rateLimiting.maxRequests;
            if (currTime - userRequests[0] > timeWindow) {
                // Окно истекло - сбрасываем счетчик
                reqList.set(userId, [currTime]);
                console.log(`Rate limit: Time window expired for user ${userId}, resetting counter`);
            }
            else if (userRequests.length < maxRequests) {
                userRequests.push(currTime);
                console.log(`Rate limit: Request ${userRequests.length}/${maxRequests} for user ${userId}`);
            }
            else {
                console.log(`Rate limit exceeded: User ${userId} made ${userRequests.length} requests in ${timeWindow / 1000}s`);
                throw new HttpError(429, `Rate limit exceeded! Maximum ${maxRequests} requests per ${timeWindow / 1000} seconds. Please wait.`);
            }
        }
        next();
    };
};
//# sourceMappingURL=authorization.js.map