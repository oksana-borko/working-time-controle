import { AccountingService } from "../services/accountingService.js";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../utils/types.js";
export declare const authenticate: (service: AccountingService) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const skipRoutes: (skipRoutes: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
