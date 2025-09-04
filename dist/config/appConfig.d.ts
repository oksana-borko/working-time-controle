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
    timeWindowMs: number;
    requestLimit: number;
}
export declare const configuration: AppConfig;
