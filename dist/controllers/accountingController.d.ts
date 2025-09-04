import { Request, Response } from "express";
export declare const hireEmployee: (req: Request, res: Response) => Promise<void>;
export declare const fireEmployee: (req: Request, res: Response) => Promise<void>;
export declare const updateEmployee: (req: Request, res: Response) => Promise<void>;
export declare const changePassword: (req: Request, res: Response) => Promise<void>;
export declare const getEmployeeById: (req: Request, res: Response) => Promise<void>;
export declare const getAllEmployees: (req: Request, res: Response) => Promise<void>;
export declare const setRole: (req: Request, res: Response) => Promise<void>;
export declare const login: (req: Request, res: Response) => Promise<void>;
