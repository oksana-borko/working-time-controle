import { Employee, EmployeeDto } from "../models/Employee.js";
import { Role } from "./types.js";
export declare const convertEmployeeDtoToEmployee: (dto: EmployeeDto) => Employee;
export declare const getJWT: (userId: string, roles: Role[]) => string;
