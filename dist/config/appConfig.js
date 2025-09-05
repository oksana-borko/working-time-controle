import dotenv from 'dotenv';
dotenv.config();
export const configuration = {
    port: 3501,
    skipRoutes: [
        "POST/accounting/hire",
        "POST/accounting/login"
    ],
    pathRoles: {},
    checkIdRoutes: [],
    mongoUri: process.env.MONGO_URI || "mongodb+srv://ksenyaborko:ak8TPD5Wf7padKU0@cluster0.knvxom0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    jwt: {
        secret: process.env.JWT_SECRET || "super-secret-jwt-key-for-work-time-tracker",
        exp: process.env.JWT_EXP || "1h"
    },
    rateLimiting: {
        windowMs: 60 * 1000,
        maxRequests: 10,
        enabledForRoles: ["crew"]
    }
};
//# sourceMappingURL=appConfig.js.map