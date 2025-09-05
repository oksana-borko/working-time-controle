import dotenv from 'dotenv';

export interface AppConfig {
    port: number;
    skipRoutes: string[];
    pathRoles: Record<string, string[]>;
    checkIdRoutes: string[];
    mongoUri: string;
    jwt: {
        secret: string;
        exp: string | number;
    };

    rateLimiting: {
        windowMs: number;
        maxRequests: number;
        enabledForRoles: string[];
    };
}

dotenv.config();

export const configuration: AppConfig = {
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