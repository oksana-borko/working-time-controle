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
export declare const configuration: AppConfig;
