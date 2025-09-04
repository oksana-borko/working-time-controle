import { AuthRequest, Role } from "../utils/types.js";
import { NextFunction, Response } from "express";
export declare const authorize: (pathRoute: Record<string, Role[]>) => (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const checkAccountById: (checkPathId: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const checkRequestLimit: (reqList: Map<string, number[]>) => (req: AuthRequest, res: Response, next: NextFunction) => void;
