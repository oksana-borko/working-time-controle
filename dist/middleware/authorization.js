import { HttpError } from "../errorHandler/HttpError.js";
export const authorize = (pathRoute) => (req, res, next) => {
    const route = req.method + req.path;
    const roles = req.roles;
    if (!roles || !pathRoute[route] || roles.some(r => pathRoute[route].includes(r))) {
        next();
    }
    else {
        throw new HttpError(403, "Insufficient permissions");
    }
};
export const checkAccountById = (checkPathId) => {
    return (req, res, next) => {
        next();
    };
};
export const checkRequestLimit = (reqList) => {
    return (req, res, next) => {
        next();
    };
};
//# sourceMappingURL=authorization.js.map